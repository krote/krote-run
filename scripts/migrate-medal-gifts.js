/**
 * メダルデータ移行スクリプト
 * participation_gifts に medal が含まれる場合、completion_gifts に移動する。
 *
 * 実行: node scripts/migrate-medal-gifts.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

const files = fs.readdirSync(RACES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

let migratedCount = 0;
let skippedCount = 0;

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const race = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const participationGifts = race.participation_gifts ?? [];
  const completionGifts = race.completion_gifts ?? [];

  let changed = false;
  const newParticipationGifts = [];

  for (const gift of participationGifts) {
    const categories = gift.gift_categories ?? [];
    if (categories.includes('medal')) {
      // medal を除いた参加賞カテゴリ
      const remainingCategories = categories.filter(c => c !== 'medal');

      // medal のみのエントリー → completion_gifts に移動
      const medalGift = {
        gift_categories: ['medal'],
        description_ja: gift.description_ja ?? '',
        description_en: gift.description_en ?? '',
        image: gift.image ?? null,
      };
      completionGifts.push(medalGift);

      // medal 以外のカテゴリが残る場合は参加賞として残す
      if (remainingCategories.length > 0) {
        newParticipationGifts.push({
          ...gift,
          gift_categories: remainingCategories,
        });
      }
      changed = true;
    } else {
      newParticipationGifts.push(gift);
    }
  }

  if (changed) {
    race.participation_gifts = newParticipationGifts;
    race.completion_gifts = completionGifts;
    fs.writeFileSync(filePath, JSON.stringify(race, null, 2) + '\n', 'utf-8');
    console.log(`[migrated] ${file}`);
    migratedCount++;
  } else {
    skippedCount++;
  }
}

console.log(`\n完了: ${migratedCount} 件移行, ${skippedCount} 件スキップ`);
