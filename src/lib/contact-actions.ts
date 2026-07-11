'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { headers } from 'next/headers';
import { and, gte, eq } from 'drizzle-orm';
import { getDatabase } from '@/lib/db/client';
import { contact_submissions } from '@/lib/db/schema';
import { Resend } from 'resend';

const MIN_ELAPSED_MS = 3000; // 3秒未満は bot とみなす
const RATE_LIMIT_COUNT = 3;  // 1時間に3件超は制限
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1時間

export type ContactActionState =
  | { success: true }
  | { error: string }
  | null;

const VALID_CATEGORIES = [
  'race_error',
  'race_suggestion',
  'site_bug',
  'other',
] as const;

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  // ── スパム対策 ──────────────────────────────────────────
  // honeypot: ボットが自動入力する隠しフィールド
  const honeypot = (formData.get('_website') as string) ?? '';
  if (honeypot) return { error: '送信できませんでした。' };

  // 時間チェック: ページ表示から3秒未満の送信は bot とみなす
  const formLoadedAt = Number(formData.get('form_loaded_at') ?? 0);
  if (formLoadedAt && Date.now() - formLoadedAt < MIN_ELAPSED_MS) {
    return { error: '送信が速すぎます。しばらく待ってから再送信してください。' };
  }

  // ── バリデーション ─────────────────────────────────────
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const category = (formData.get('category') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();
  const userId = (formData.get('user_id') as string) || null;

  if (!name) return { error: 'お名前を入力してください' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: '有効なメールアドレスを入力してください' };
  }
  if (!category || !VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
    return { error: 'お問い合わせ種別を選択してください' };
  }
  if (!message || message.length < 10) {
    return { error: 'お問い合わせ内容を10文字以上で入力してください' };
  }
  if (message.length > 5000) {
    return { error: 'お問い合わせ内容は5000文字以内で入力してください' };
  }

  // ── IP / UA 取得 ───────────────────────────────────────
  const reqHeaders = await headers();
  const ipAddress = reqHeaders.get('cf-connecting-ip') ?? reqHeaders.get('x-forwarded-for') ?? null;
  const userAgent = reqHeaders.get('user-agent') ?? null;

  const db = getDatabase();

  // ── レート制限: 同一IPから1時間に3件超は拒否 ─────────────
  if (ipAddress) {
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const recent = await db
      .select({ id: contact_submissions.id })
      .from(contact_submissions)
      .where(and(
        eq(contact_submissions.ip_address, ipAddress),
        gte(contact_submissions.created_at, windowStart),
      ))
      .all();
    if (recent.length >= RATE_LIMIT_COUNT) {
      return { error: '送信回数の上限に達しました。しばらく時間をおいてから再送信してください。' };
    }
  }
  await db.insert(contact_submissions).values({
    name,
    email,
    category,
    message,
    user_id: userId || null,
    status: 'pending',
    ip_address: ipAddress,
    user_agent: userAgent,
    created_at: new Date().toISOString(),
  });

  // Resend通知（APIキー未設定の場合はスキップ）
  // getCloudflareContext().env はCloudflareバインディング用。
  // ローカルdev では .env.local の process.env をフォールバックとして使用する。
  const { env } = getCloudflareContext();
  const cfEnv = env as unknown as Record<string, string>;
  const resendApiKey = cfEnv.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const notifyEmail = cfEnv.CONTACT_NOTIFY_EMAIL ?? process.env.CONTACT_NOTIFY_EMAIL;

  if (resendApiKey && notifyEmail) {
    const resend = new Resend(resendApiKey);
    const categoryLabels: Record<string, string> = {
      race_error: '大会情報の誤り報告',
      race_suggestion: '大会情報の追加・更新提案',
      site_bug: 'サイトの不具合報告',
      other: 'その他',
    };
    await resend.emails.send({
      from: 'HASHIRU <contact@hashiru.run>',
      to: notifyEmail,
      subject: `[HASHIRU] お問い合わせ: ${categoryLabels[category] ?? category}`,
      text: `名前: ${name}\nメール: ${email}\n種別: ${categoryLabels[category] ?? category}\n\n${message}`,
    });
  }

  return { success: true };
}
