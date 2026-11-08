'use strict';

/**
 * tools/crawl/report.js
 * クロール結果から PR 本文用の Markdown を組み立てる。
 *
 * 目的は2つ。
 * - レビュアーが「どの大会の何が変わったか」を一覧で追えるようにする
 * - 失敗（取得エラー・抽出エラー・検査による保留）を理由別に分類して残し、
 *   次の実行で同じ失敗を繰り返していないか比較できるようにする
 */

const MAX_VALUE_LENGTH = 60;

/** 表のセルに入れる値を読みやすく整える */
function formatValue(value) {
  if (value === null || value === undefined || value === '') return '未設定';
  if (Array.isArray(value)) return `${value.length}件`;
  if (typeof value === 'object') return 'オブジェクト';

  const text = String(value).replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|');
  if (text.length <= MAX_VALUE_LENGTH) return text;
  return `${text.slice(0, MAX_VALUE_LENGTH - 1)}…`;
}

/** エラーメッセージを原因別のラベルに分類する */
function classifyError(message) {
  const text = String(message ?? '');

  const httpMatch = text.match(/HTTP (\d{3})/);
  if (httpMatch) {
    const status = httpMatch[1];
    if (status === '404') return 'ページが見つからない (404)';
    if (status === '403') return 'アクセス拒否 (403)';
    if (status === '401') return '認証が必要 (401)';
    if (status.startsWith('5')) return `サーバーエラー (${status})`;
    return `HTTPエラー (${status})`;
  }

  // 中間証明書の欠落・期限切れ等。extra-ca.pem への追加で直る場合がある（#209）
  if (/CERT|UNABLE_TO_VERIFY|SELF_SIGNED/.test(text)) return '証明書エラー';
  if (/timeout|aborted/i.test(text)) return 'タイムアウト';
  if (/JSON/i.test(text)) return '抽出結果の解析失敗';
  if (/空または短すぎ/.test(text)) return 'ページ内容が取得できない';
  if (/PDF からテキストを抽出できない/.test(text)) return 'PDFにテキストなし（画像のみ）';
  if (/claude -p 失敗|ANTHROPIC/i.test(text)) return 'LLM呼び出し失敗';
  return 'その他';
}

function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

function renderChanges(summary, lines) {
  const races = summary.extracted ?? [];
  if (races.length === 0) return;

  const fieldCount = races.reduce((sum, r) => sum + r.diff.length, 0);
  lines.push(`## 変更内容（${races.length}大会 / ${fieldCount}項目）`, '');

  for (const race of races) {
    lines.push(`### ${race.race_name ?? race.race_id}`, '');
    lines.push(`\`${race.race_id}\``, '');
    lines.push('| 項目 | 変更前 | 変更後 |', '|---|---|---|');
    for (const d of race.diff) {
      lines.push(`| ${d.label} | ${formatValue(d.current)} | ${formatValue(d.extracted)} |`);
    }
    lines.push('');
  }
}

function renderAnnouncement(summary, lines) {
  const a = summary.announcement;
  if (!a) return;

  lines.push('## お知らせ（同梱）', '');
  lines.push(`\`src/data/announcements.json\` に \`${a.slug}\` を追加した。マージ・デプロイでデータと同時に公開される。`, '');
  lines.push(`**${a.title_ja}**`, '');
  lines.push('```text', a.body_ja, '```', '');
  lines.push('<details><summary>English</summary>', '');
  lines.push(`**${a.title_en}**`, '');
  lines.push('```text', a.body_en, '```', '');
  lines.push('</details>', '');
}

function renderXPost(summary, lines) {
  const post = summary.x_post;
  if (!post) return;

  const how = post.source === 'llm'
    ? 'LLM で要約'
    : `テンプレート文${post.error ? `（LLM の生成に失敗: ${post.error}）` : '（LLM の文が条件を満たさなかったため）'}`;
  lines.push('## X 投稿文', '');
  lines.push(`マージ・デプロイ後に手動で投稿する。${how}・${post.length} / 280（X の数え方）`, '');
  lines.push('```text', post.text, '```', '');
}

function renderNewEditions(summary, lines) {
  const editions = summary.new_editions ?? [];
  if (editions.length === 0) return;

  lines.push(`## 次年度ファイルの作成（${editions.length}件）`, '');
  for (const e of editions) {
    lines.push(`- \`${e.race_id}\` → \`${e.new_race_id}\``);
  }
  lines.push('');
}

function renderExpired(summary, lines) {
  const expired = summary.expired ?? [];
  if (expired.length === 0) return;

  // 全 URL が失効した大会（情報が全く取れていない）を先に出す
  const sorted = [...expired].sort((a, b) => Number(b.all_expired) - Number(a.all_expired));
  lines.push(`## URL失効（${expired.length}大会）`, '');
  lines.push('`info_urls` が 404 / 410、または 5xx が続いている。URL を登録し直すこと（自動置換はしない）。', '');
  for (const e of sorted) {
    const name = e.race_name ?? e.race_id;
    lines.push(e.all_expired ? `### **要対応** ${name}（全URL失効）` : `### ${name}`, '');
    lines.push(`\`${e.race_id}\``, '');
    for (const u of e.urls) {
      const streak = /HTTP 5\d\d/.test(u.error) ? `・${u.fail_count}回連続` : '';
      lines.push(`- ${u.url}（${u.error}${streak}）`);
    }
    if (e.suggestions?.length > 0) {
      lines.push('', `候補: ${e.suggestions.map((s) => `[${s.text || s.href}](${s.href})`).join(' / ')}`);
    } else if (e.suggestion_error) {
      lines.push('', `トップページを取得できず候補を探せなかった（${e.suggestion_error}）`);
    }
    lines.push('');
  }
}

function renderFailures(summary, lines) {
  const errors = summary.errors ?? [];
  const held = summary.held ?? [];
  const skippedPast = summary.skipped_past ?? [];

  if (errors.length === 0 && held.length === 0 && skippedPast.length === 0 && (summary.sparse_pdfs ?? []).length === 0) return;

  lines.push('## 失敗・保留の分析', '');

  if (errors.length > 0) {
    lines.push(`### 取得・抽出に失敗（${errors.length}件）`, '');
    lines.push('| 原因 | 件数 |', '|---|---|');
    const byReason = groupBy(errors, (e) => classifyError(e.error));
    const sorted = [...byReason.entries()].sort((a, b) => b[1].length - a[1].length);
    for (const [reason, items] of sorted) {
      lines.push(`| ${reason} | ${items.length} |`);
    }
    lines.push('');

    lines.push('<details><summary>失敗したURLの一覧</summary>', '');
    for (const [reason, items] of sorted) {
      lines.push(`**${reason}**`, '');
      for (const item of items) {
        lines.push(`- \`${item.race_id}\` ${item.url}`);
      }
      lines.push('');
    }
    lines.push('</details>', '');
  }

  if (held.length > 0) {
    lines.push(`### 検査で保留した更新（${held.length}件）`, '');
    lines.push('データ品質ルールに反するため、JSONへ適用していない。', '');
    lines.push('| 大会 | 項目 | ルール | 内容 |', '|---|---|---|---|');
    for (const h of held) {
      lines.push(`| ${h.race_name ?? h.race_id} | ${h.key} | \`${h.rule}\` | ${formatValue(h.message)} |`);
    }
    lines.push('');
  }

  const sparsePdfs = summary.sparse_pdfs ?? [];
  if (sparsePdfs.length > 0) {
    lines.push(`### テキストの少ないPDF（${sparsePdfs.length}件）`, '');
    lines.push('画像中心のパンフレット等で、抽出に使える情報がほとんどない。要項が HTML でも公開されていれば `info_urls` をそちらに替える。', '');
    for (const p of sparsePdfs) {
      lines.push(`- \`${p.race_id}\` ${p.url}（${p.chars}字）`);
    }
    lines.push('');
  }

  if (skippedPast.length > 0) {
    lines.push(`### 開催済みのためスキップ（${skippedPast.length}件）`, '');
    for (const s of skippedPast) {
      const labels = (s.diff ?? []).map((d) => d.label).join(', ');
      lines.push(`- ${s.race_name ?? s.race_id}: ${labels}`);
    }
    lines.push('');
  }
}

function renderTruncated(summary, lines) {
  const truncated = summary.truncated ?? [];
  if (truncated.length === 0) return;

  const n = (v) => v.toLocaleString('en-US');
  lines.push(`### テキストを切り詰めたページ（${truncated.length}大会）`, '');
  lines.push('1大会あたりの総量予算を超えたため、後半をプロンプトに入れていない。抽出漏れがあれば `info_urls` を絞る。', '');
  lines.push('<details><summary>一覧</summary>', '');
  for (const t of truncated) {
    for (const p of t.pages) {
      lines.push(`- \`${t.race_id}\` ${p.url}（${n(p.kept)} / ${n(p.total)}字）`);
    }
  }
  lines.push('', '</details>', '');
}

function renderChecks(summary, lines) {
  const checks = summary.checks ?? { errors: 0, warnings: 0, byRule: {} };
  lines.push('## チェック結果', '');

  if (checks.errors === 0) {
    lines.push(`\`validate:races\` エラーなし（警告 ${checks.warnings}件）`, '');
  } else {
    lines.push(`**エラー ${checks.errors}件** / 警告 ${checks.warnings}件 — 要対応`, '');
  }

  const rules = Object.entries(checks.byRule ?? {});
  if (rules.length > 0) {
    lines.push('| ルール | 件数 |', '|---|---|');
    for (const [rule, count] of rules.sort((a, b) => b[1] - a[1])) {
      lines.push(`| \`${rule}\` | ${count} |`);
    }
    lines.push('');
  }
}

function renderSummaryCounts(summary, lines) {
  lines.push('## 実行サマリ', '');
  lines.push('| 項目 | 件数 |', '|---|---|');
  lines.push(`| ページ変更あり | ${(summary.changed ?? []).length} |`);
  lines.push(`| 新規登録URL | ${(summary.new ?? []).length} |`);
  lines.push(`| 変更なし | ${summary.unchanged ?? 0} |`);
  lines.push(`| LLMで更新した大会 | ${(summary.extracted ?? []).length} |`);
  lines.push(`| 検査で保留 | ${(summary.held ?? []).length} |`);
  lines.push(`| 失敗 | ${(summary.errors ?? []).length} |`);
  const geo = summary.geocoded ?? { processed: 0, skipped: 0, failed: 0 };
  lines.push(`| 座標補完 | ${geo.processed}（失敗${geo.failed}） |`);

  const llm = summary.llm;
  if (llm && llm.calls > 0) {
    const n = (v) => v.toLocaleString('en-US');
    lines.push(`| 使用モデル | ${llm.models.join(', ')} |`);
    lines.push(`| LLM呼び出し | ${llm.calls} |`);
    lines.push(`| 入力トークン | ${n(llm.inputTokens)}（キャッシュ作成 ${n(llm.cacheCreationTokens)} / 読込 ${n(llm.cacheReadTokens)}） |`);
    lines.push(`| 出力トークン | ${n(llm.outputTokens)} |`);
    // claude -p の total_cost_usd は API 料金換算。サブスク利用時は実費ではない
    lines.push(`| API換算コスト | $${llm.costUsd.toFixed(2)} |`);
  }
  lines.push('');
}

/**
 * クロール結果の Markdown レポートを組み立てる
 * @param {object} summary - index.js の run() が返すサマリ
 * @returns {string}
 */
function buildReport(summary) {
  const lines = [];
  const hasChanges = (summary.extracted ?? []).length > 0 || (summary.new_editions ?? []).length > 0;

  if (!hasChanges) {
    lines.push('## 変更内容', '', 'レースデータへの変更はありません。', '');
  }

  renderChanges(summary, lines);
  renderNewEditions(summary, lines);
  renderAnnouncement(summary, lines);
  renderXPost(summary, lines);
  renderExpired(summary, lines);
  renderFailures(summary, lines);
  renderTruncated(summary, lines);
  renderChecks(summary, lines);
  renderSummaryCounts(summary, lines);

  return lines.join('\n');
}

module.exports = { buildReport, classifyError, formatValue };
