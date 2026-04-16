'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDatabase } from '@/lib/db/client';
import { contact_submissions } from '@/lib/db/schema';
import { Resend } from 'resend';

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

  const db = getDatabase();
  await db.insert(contact_submissions).values({
    name,
    email,
    category,
    message,
    user_id: userId || null,
    status: 'pending',
    created_at: new Date().toISOString(),
  });

  // Resend通知（APIキー未設定の場合はスキップ）
  const { env } = getCloudflareContext();
  const resendApiKey = (env as Record<string, string>).RESEND_API_KEY;
  const notifyEmail = (env as Record<string, string>).CONTACT_NOTIFY_EMAIL;

  if (resendApiKey && notifyEmail) {
    const resend = new Resend(resendApiKey);
    const categoryLabels: Record<string, string> = {
      race_error: '大会情報の誤り報告',
      race_suggestion: '大会情報の追加・更新提案',
      site_bug: 'サイトの不具合報告',
      other: 'その他',
    };
    await resend.emails.send({
      from: 'HASHIRU <noreply@hashiru.run>',
      to: notifyEmail,
      subject: `[HASHIRU] お問い合わせ: ${categoryLabels[category] ?? category}`,
      text: `名前: ${name}\nメール: ${email}\n種別: ${categoryLabels[category] ?? category}\n\n${message}`,
    });
  }

  return { success: true };
}
