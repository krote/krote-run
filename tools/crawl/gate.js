'use strict';

/**
 * tools/crawl/gate.js
 * クロールの抽出結果を race JSON に適用する前の検査ゲート。
 *
 * レビューで指摘された種類の問題は `scripts/validate-races.js` にルールとして足す。
 * ここではそのルールを適用前に走らせ、**新たな違反を生むフィールドだけ**を取り除く。
 * こうしておくと、同じ指摘がもう一度 JSON に入ることがなくなる。
 *
 * 既存データが既に違反している場合は、それを理由に無関係な更新を止めない
 * （古いデータの違反はクロールの責任範囲外で、別途データ補完で直す）。
 */

const { validateRace } = require('../../scripts/validate-races');

/** 検査結果を「ルール名 + メッセージ」の集合にする（既存違反との差分を取るため） */
function toIssueKeys(issues) {
  return new Set(issues.map((i) => `${i.rule}\u0000${i.message}`));
}

function issuesFor(race, patch) {
  return validateRace({ ...race, ...patch });
}

/**
 * 抽出結果を検査し、適用してよい分と保留する分に分ける。
 * @param {object} race - 既存の race JSON
 * @param {object} extracted - LLM の抽出結果（フィールド名 → 値）
 * @returns {{ applied: object, held: { key: string, rule: string, message: string }[] }}
 */
function screenExtraction(race, extracted) {
  const keys = Object.keys(extracted ?? {});
  if (keys.length === 0) return { applied: {}, held: [] };

  const baselineKeys = toIssueKeys(validateRace(race));
  const newIssuesOf = (subset) => {
    const patch = Object.fromEntries(subset.map((k) => [k, extracted[k]]));
    return issuesFor(race, patch).filter((i) => !baselineKeys.has(`${i.rule}\u0000${i.message}`));
  };

  let remaining = [...keys];
  const held = [];

  // まず全部まとめて検査する。複数フィールドが噛み合って初めて整合するもの
  // （entry_start_date と entry_periods など）を、順番の都合で落とさないため。
  // 違反が出た場合だけ、取り除くと違反が最も減るフィールドを1つずつ保留していく。
  let issues = newIssuesOf(remaining);
  while (issues.length > 0 && remaining.length > 0) {
    let bestKey = null;
    let bestIssues = null;

    for (const key of remaining) {
      const candidate = remaining.filter((k) => k !== key);
      const candidateIssues = newIssuesOf(candidate);
      if (bestIssues === null || candidateIssues.length < bestIssues.length) {
        bestKey = key;
        bestIssues = candidateIssues;
      }
    }

    // どれを外しても減らない場合は、最初の違反に関係するフィールドを落とす（無限ループ回避）
    if (bestIssues.length >= issues.length) {
      bestKey = remaining[0];
      bestIssues = newIssuesOf(remaining.filter((k) => k !== bestKey));
    }

    held.push({ key: bestKey, rule: issues[0].rule, message: issues[0].message });
    remaining = remaining.filter((k) => k !== bestKey);
    issues = bestIssues;
  }

  const applied = Object.fromEntries(remaining.map((k) => [k, extracted[k]]));
  return { applied, held };
}

module.exports = { screenExtraction };
