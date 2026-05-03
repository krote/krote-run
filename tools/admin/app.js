// ── 定数 ───────────────────────────────────────────────────────────
const PREFECTURES = [
  { code: '01', name: '北海道' }, { code: '02', name: '青森県' }, { code: '03', name: '岩手県' },
  { code: '04', name: '宮城県' }, { code: '05', name: '秋田県' }, { code: '06', name: '山形県' },
  { code: '07', name: '福島県' }, { code: '08', name: '茨城県' }, { code: '09', name: '栃木県' },
  { code: '10', name: '群馬県' }, { code: '11', name: '埼玉県' }, { code: '12', name: '千葉県' },
  { code: '13', name: '東京都' }, { code: '14', name: '神奈川県' }, { code: '15', name: '新潟県' },
  { code: '16', name: '富山県' }, { code: '17', name: '石川県' }, { code: '18', name: '福井県' },
  { code: '19', name: '山梨県' }, { code: '20', name: '長野県' }, { code: '21', name: '岐阜県' },
  { code: '22', name: '静岡県' }, { code: '23', name: '愛知県' }, { code: '24', name: '三重県' },
  { code: '25', name: '滋賀県' }, { code: '26', name: '京都府' }, { code: '27', name: '大阪府' },
  { code: '28', name: '兵庫県' }, { code: '29', name: '奈良県' }, { code: '30', name: '和歌山県' },
  { code: '31', name: '鳥取県' }, { code: '32', name: '島根県' }, { code: '33', name: '岡山県' },
  { code: '34', name: '広島県' }, { code: '35', name: '山口県' }, { code: '36', name: '徳島県' },
  { code: '37', name: '香川県' }, { code: '38', name: '愛媛県' }, { code: '39', name: '高知県' },
  { code: '40', name: '福岡県' }, { code: '41', name: '佐賀県' }, { code: '42', name: '長崎県' },
  { code: '43', name: '熊本県' }, { code: '44', name: '大分県' }, { code: '45', name: '宮崎県' },
  { code: '46', name: '鹿児島県' }, { code: '47', name: '沖縄県' },
];

const ALL_TAGS = [
  'AIMS公認', 'SPARTATHLON基準', 'ご当地エイド', 'ご当地エイド充実', 'ご当地グルメ',
  'アップダウン多い', 'アルプス', 'ウルトラマラソン', 'エリート大会', 'オリンピック施設',
  'コスパが良い', 'フラット', 'ワールドメジャーズ', '世界遺産', '中止（2026年大会）',
  '初ウルトラおすすめ', '初心者おすすめ', '北海道', '城下町', '夏マラソン',
  '大規模', '女性限定', '富士山', '日本陸連公認', '景色が良い',
  '桜', '橋', '歴史', '歴史ある大会', '沖縄',
  '海沿い', '温暖', '温泉', '湖畔', '火山',
  '第1回大会', '紅葉', '観光', '記録狙い', '離島',
];

const GIFT_CATEGORIES = [
  { id: 'medal',         label: 'メダル・トロフィー', icon: '🥇' },
  { id: 'tshirt',        label: 'Tシャツ・ウェア',   icon: '👕' },
  { id: 'towel',         label: 'タオル',             icon: '🧣' },
  { id: 'local_product', label: '地元産品',           icon: '🎎' },
  { id: 'food',          label: '食べ物・お菓子',     icon: '🍱' },
  { id: 'goods',         label: 'スポーツグッズ',     icon: '🏃' },
  { id: 'coupon',        label: 'クーポン・券',        icon: '🎟️' },
  { id: 'certificate',   label: '完走証',             icon: '📜' },
  { id: 'other',         label: 'その他',             icon: '🎁' },
];

const DISTANCE_TYPES = [
  { value: 'full', label: 'フルマラソン (42.195km)' },
  { value: 'half', label: 'ハーフ (21.0975km)' },
  { value: '10k', label: '10km' },
  { value: '5k', label: '5km' },
  { value: 'ultra', label: 'ウルトラ' },
  { value: 'other', label: 'その他' },
];

// ── 状態 ───────────────────────────────────────────────────────────
let currentRace = null;
let isDirty = false;

// ── 初期化 ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildPrefectureSelect();
  buildTagGrid();
  loadRaceList();
  bindEvents();
});

function buildPrefectureSelect() {
  const sel = document.getElementById('f-prefecture');
  sel.innerHTML = PREFECTURES.map(p => `<option value="${p.code}">${p.name}</option>`).join('');
}

function buildTagGrid() {
  const grid = document.getElementById('tag-grid');
  grid.innerHTML = ALL_TAGS.map(tag => `
    <label class="tag-item" data-tag="${tag}">
      <input type="checkbox" value="${tag}" />
      ${tag}
    </label>
  `).join('');

  grid.querySelectorAll('.tag-item').forEach(el => {
    el.addEventListener('click', () => {
      const cb = el.querySelector('input');
      cb.checked = !cb.checked;
      el.classList.toggle('selected', cb.checked);
      markDirty();
    });
  });
}

// ── 大会リスト ─────────────────────────────────────────────────────
async function loadRaceList() {
  const res = await fetch('/api/races');
  const races = await res.json();
  const list = document.getElementById('race-list');
  list.innerHTML = races.map(r => {
    const badge = r.missingCount?.high > 0
      ? `<span class="missing-badge missing-high">高:${r.missingCount.high}</span>`
      : r.missingCount?.medium > 0
      ? `<span class="missing-badge missing-medium">中:${r.missingCount.medium}</span>`
      : '';
    return `
    <li class="race-item" data-id="${r.id}">
      <div class="race-item-name">${r.full_name_ja ?? r.name_ja}</div>
      <div class="race-item-meta">
        ${r.date}
        ${r.hasImage ? '<span class="img-badge">📷 画像あり</span>' : ''}
        ${badge}
      </div>
    </li>
  `;
  }).join('');

  list.querySelectorAll('.race-item').forEach(el => {
    el.addEventListener('click', () => loadRace(el.dataset.id));
  });
}

document.getElementById('search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.race-item').forEach(el => {
    const name = el.querySelector('.race-item-name').textContent.toLowerCase();
    el.classList.toggle('hidden', q && !name.includes(q));
  });
});

// ── 大会読み込み ───────────────────────────────────────────────────
async function loadRace(id) {
  if (isDirty && !confirm('未保存の変更があります。続けますか？')) return;

  const res = await fetch(`/api/races/${id}`);
  currentRace = await res.json();
  isDirty = false;

  // アクティブ表示
  document.querySelectorAll('.race-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('editor').style.display = 'flex';
  document.getElementById('editor-title').textContent = currentRace.full_name_ja ?? currentRace.name_ja;
  document.getElementById('save-status').textContent = '';
  document.getElementById('save-status').className = 'save-status';

  // 公式サイトプレビューを更新
  updatePreview(currentRace.official_url);

  populateForm(currentRace);
}

function populateForm(r) {
  // 基本情報
  setVal('f-id', r.id);
  setVal('f-name_ja', r.name_ja);
  setVal('f-name_en', r.name_en);
  // 正式名称：未入力の場合はシリーズ名を初期値として設定
  setVal('f-full_name_ja', r.full_name_ja ?? r.name_ja);
  setVal('f-full_name_en', r.full_name_en ?? r.name_en);
  setVal('f-edition', r.edition ?? '');
  setVal('f-date', r.date);
  setVal('f-prefecture', r.prefecture);
  setVal('f-city_ja', r.city_ja);
  setVal('f-city_en', r.city_en);
  setVal('f-official_url', r.official_url);

  // 説明文
  setVal('f-description_ja', r.description_ja);
  setVal('f-description_en', r.description_en);

  // エントリー期間
  renderEntryPeriods(r.entry_periods ?? []);

  // 受付終了フラグ
  const entryClosed = document.getElementById('f-entry_closed');
  if (entryClosed) entryClosed.checked = !!r.entry_closed;

  // エントリーリンク
  renderEntryLinks(r.entry_links ?? []);

  setVal('f-reception_type', r.reception_type ?? 'pre_day');
  setVal('f-reception_note_ja', r.reception_note_ja ?? '');
  setVal('f-reception_note_en', r.reception_note_en ?? '');

  // カテゴリ
  renderCategories(r.categories ?? []);

  // タグ
  const tags = new Set(r.tags ?? []);
  document.querySelectorAll('.tag-item').forEach(el => {
    const tag = el.dataset.tag;
    const checked = tags.has(tag);
    el.querySelector('input').checked = checked;
    el.classList.toggle('selected', checked);
  });

  // 参加賞
  renderGifts(r.participation_gifts ?? []);

  // 周辺スポット
  renderNearbySpots(r.nearby_spots ?? []);

  // コース
  setVal('f-course_gpx_file', r.course_gpx_file ?? '');

  // 画像
  loadImagePreview(r.id);
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = val ?? '';
}

// ── エントリー期間 ─────────────────────────────────────────────────
function renderEntryPeriods(periods) {
  const container = document.getElementById('entry-periods-container');
  container.innerHTML = '';
  periods.forEach(p => addEntryPeriodRow(p));
}

function addEntryPeriodRow(period = {}) {
  const container = document.getElementById('entry-periods-container');
  const row = document.createElement('div');
  row.className = 'entry-period-row';
  row.innerHTML = `
    <div class="entry-period-header">
      <span class="entry-period-label">期間 ${container.children.length + 1}</span>
      <button class="btn btn-danger btn-remove-period">削除</button>
    </div>
    <div class="form-grid">
      <div class="field">
        <label>開始日</label>
        <input type="date" class="ep-start" value="${period.start_date ?? ''}" />
      </div>
      <div class="field">
        <label>終了日</label>
        <input type="date" class="ep-end" value="${period.end_date ?? ''}" />
      </div>
      <div class="field">
        <label>参加費（円）</label>
        <input type="number" class="ep-fee" min="0" value="${period.entry_fee ?? ''}" />
      </div>
      <div class="field">
        <label>ラベル（日本語）</label>
        <input type="text" class="ep-label-ja" value="${period.label_ja ?? ''}" placeholder="例: 一般エントリー" />
      </div>
      <div class="field">
        <label>ラベル（English）</label>
        <input type="text" class="ep-label-en" value="${period.label_en ?? ''}" placeholder="e.g. General Entry" />
      </div>
    </div>
  `;

  row.querySelector('.btn-remove-period').addEventListener('click', () => {
    row.remove();
    // 番号を振り直す
    document.querySelectorAll('.entry-period-label').forEach((el, i) => {
      el.textContent = `期間 ${i + 1}`;
    });
    markDirty();
  });

  row.querySelectorAll('input').forEach(el => el.addEventListener('input', markDirty));
  container.appendChild(row);
}

function collectEntryPeriods() {
  return [...document.querySelectorAll('.entry-period-row')].map(row => ({
    start_date: row.querySelector('.ep-start').value || null,
    end_date: row.querySelector('.ep-end').value || null,
    entry_fee: parseInt(row.querySelector('.ep-fee').value) || null,
    label_ja: row.querySelector('.ep-label-ja').value || '',
    label_en: row.querySelector('.ep-label-en').value || '',
  })).filter(p => p.start_date && p.end_date);
}

document.getElementById('btn-add-entry-period').addEventListener('click', () => {
  addEntryPeriodRow();
  markDirty();
});

// ── エントリーリンク ──────────────────────────────────────────────
function renderEntryLinks(links) {
  const container = document.getElementById('entry-links-container');
  container.innerHTML = '';
  links.forEach(l => addEntryLinkRow(l));
}

function addEntryLinkRow(link = {}) {
  const container = document.getElementById('entry-links-container');
  const row = document.createElement('div');
  row.className = 'entry-link-row';
  row.style.cssText = 'display:grid;grid-template-columns:1fr 2fr auto;gap:8px;align-items:end;margin-bottom:8px;';
  row.innerHTML = `
    <div class="field" style="margin:0">
      <label>サイト名</label>
      <input type="text" class="el-site" value="${(link.site_name ?? '').replace(/"/g, '&quot;')}" placeholder="例: RUNNET" list="entry-site-suggestions" />
      <datalist id="entry-site-suggestions">
        <option value="RUNNET">
        <option value="SPORT ENTRY">
        <option value="JTBスポーツ">
        <option value="マラソンリンク">
        <option value="公式サイト">
      </datalist>
    </div>
    <div class="field" style="margin:0">
      <label>URL</label>
      <input type="url" class="el-url" value="${(link.url ?? '').replace(/"/g, '&quot;')}" placeholder="https://runnet.jp/..." />
    </div>
    <button class="btn btn-danger btn-remove-link" style="margin-bottom:0;">削除</button>
  `;
  row.querySelector('.btn-remove-link').addEventListener('click', () => {
    row.remove();
    markDirty();
  });
  row.querySelectorAll('input').forEach(el => el.addEventListener('input', markDirty));
  container.appendChild(row);
}

function collectEntryLinks() {
  return [...document.querySelectorAll('.entry-link-row')]
    .map(row => ({
      site_name: row.querySelector('.el-site').value.trim(),
      url: row.querySelector('.el-url').value.trim(),
    }))
    .filter(l => l.site_name && l.url);
}

document.getElementById('btn-add-entry-link').addEventListener('click', () => {
  addEntryLinkRow();
  markDirty();
});

// ── カテゴリ ───────────────────────────────────────────────────────
function renderCategories(categories) {
  const container = document.getElementById('categories-container');
  container.innerHTML = '';
  categories.forEach((cat, i) => addCategoryRow(cat, i));
}

function addCategoryRow(cat = {}, index) {
  const container = document.getElementById('categories-container');
  const idx = index ?? container.children.length;
  const row = document.createElement('div');
  row.className = 'category-row';
  row.dataset.idx = idx;
  row.innerHTML = `
    <div class="field">
      <label>種別</label>
      <select class="cat-type">
        ${DISTANCE_TYPES.map(d => `<option value="${d.value}" ${cat.distance_type === d.value ? 'selected' : ''}>${d.label}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label>距離 (km)</label>
      <input type="number" class="cat-dist" step="0.001" value="${cat.distance_km ?? ''}" />
    </div>
    <div class="field">
      <label>参加費 (円)</label>
      <input type="number" class="cat-fee" min="0" value="${cat.entry_fee ?? ''}" />
    </div>
    <div class="field">
      <label>定員</label>
      <input type="number" class="cat-capacity" min="0" value="${cat.capacity ?? ''}" />
    </div>
    <div class="field">
      <label>制限時間 (分)</label>
      <input type="number" class="cat-limit" value="${cat.time_limit_minutes ?? ''}" />
    </div>
    <div class="field">
      <label>スタート時刻</label>
      <input type="time" class="cat-start" value="${cat.start_time ?? ''}" />
    </div>
    <div class="field">
      <label>&nbsp;</label>
      <button class="btn btn-danger btn-remove-cat">削除</button>
    </div>
    <div class="field full">
      <label>カテゴリ名（日本語・任意）</label>
      <input type="text" class="cat-name-ja" value="${(cat.name_ja ?? '').replace(/"/g, '&quot;')}" placeholder="例: 一般の部、ペアの部" />
    </div>
    <div class="field full">
      <label>参加資格（日本語・任意）</label>
      <textarea class="cat-eligibility-ja" rows="3" placeholder="例: 20歳以上の男女、高校生以上">${(cat.eligibility_ja ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    </div>
    <div class="field full">
      <label>参加資格（English・任意）</label>
      <textarea class="cat-eligibility-en" rows="3" placeholder="e.g. Open to men and women aged 20+">${(cat.eligibility_en ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    </div>
    <div class="field full">
      <label>GPXファイル名（任意）</label>
      <input type="text" class="cat-gpx-file" value="${(cat.course_gpx_file ?? '').replace(/"/g, '&quot;')}" placeholder="例: nagano-marathon-2026-full.gpx" />
      <p class="field-hint">ファイルは <code>public/gpx/</code> に配置し、保存後に <code>npm run course:generate</code> を実行してください。</p>
    </div>
  `;
  row.querySelector('.btn-remove-cat').addEventListener('click', () => {
    row.remove();
    markDirty();
  });
  row.querySelectorAll('input, select, textarea').forEach(el => el.addEventListener('change', markDirty));
  container.appendChild(row);
}

document.getElementById('btn-add-category').addEventListener('click', () => {
  addCategoryRow();
  markDirty();
});

// ── 参加賞 ─────────────────────────────────────────────────────────
function renderGifts(gifts) {
  const container = document.getElementById('gifts-container');
  container.innerHTML = '';
  gifts.forEach(gift => addGiftRow(gift));
}

function addGiftRow(gift = {}) {
  const container = document.getElementById('gifts-container');
  const selectedCats = new Set(gift.gift_categories ?? []);
  const row = document.createElement('div');
  row.className = 'gift-row';

  row.innerHTML = `
    <div class="gift-row-header">
      <span class="gift-row-label">参加賞 ${container.children.length + 1}</span>
      <button class="btn btn-danger btn-remove-gift">削除</button>
    </div>
    <div class="gift-categories-grid">
      ${GIFT_CATEGORIES.map(c => `
        <label class="gift-cat-item${selectedCats.has(c.id) ? ' selected' : ''}">
          <input type="checkbox" value="${c.id}" ${selectedCats.has(c.id) ? 'checked' : ''} />
          ${c.icon} ${c.label}
        </label>
      `).join('')}
    </div>
    <div class="gift-fields">
      <div class="field full">
        <label>説明（日本語）</label>
        <textarea class="gift-desc-ja" rows="2">${gift.description_ja ?? ''}</textarea>
      </div>
      <div class="field full">
        <label>説明（English）</label>
        <div class="input-row align-top">
          <textarea class="gift-desc-en" rows="2">${gift.description_en ?? ''}</textarea>
          <button class="btn btn-translate gift-translate">🔄 翻訳</button>
        </div>
      </div>
    </div>
  `;

  // カテゴリチェックボックス
  row.querySelectorAll('.gift-cat-item').forEach(el => {
    el.addEventListener('click', () => {
      const cb = el.querySelector('input');
      cb.checked = !cb.checked;
      el.classList.toggle('selected', cb.checked);
      markDirty();
    });
  });

  // 翻訳ボタン
  row.querySelector('.gift-translate').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const srcEl = row.querySelector('.gift-desc-ja');
    const dstEl = row.querySelector('.gift-desc-en');
    const text = srcEl.value.trim();
    if (!text) return alert('翻訳する日本語テキストを入力してください');
    btn.disabled = true;
    btn.textContent = '翻訳中…';
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, field: 'description' }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      dstEl.value = data.translated;
      markDirty();
    } catch (err) {
      alert(`翻訳エラー: ${err.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = '🔄 翻訳';
    }
  });

  // 削除ボタン
  row.querySelector('.btn-remove-gift').addEventListener('click', () => {
    row.remove();
    // 番号を振り直す
    document.querySelectorAll('.gift-row-label').forEach((el, i) => {
      el.textContent = `参加賞 ${i + 1}`;
    });
    markDirty();
  });

  row.querySelectorAll('textarea').forEach(el => el.addEventListener('input', markDirty));
  container.appendChild(row);
}

function collectGifts() {
  return [...document.querySelectorAll('.gift-row')].map(row => ({
    gift_categories: [...row.querySelectorAll('.gift-cat-item input:checked')].map(cb => cb.value),
    description_ja: row.querySelector('.gift-desc-ja').value,
    description_en: row.querySelector('.gift-desc-en').value,
    image: null,
  }));
}

document.getElementById('btn-add-gift').addEventListener('click', () => {
  addGiftRow();
  markDirty();
});

// ── 周辺スポット ────────────────────────────────────────────────

const NEARBY_SPOT_TYPES = [
  { value: '観光地', icon: '🏛️' },
  { value: '温泉',   icon: '♨️' },
  { value: 'グルメ', icon: '🍜' },
  { value: '宿泊',   icon: '🏨' },
];

function renderNearbySpots(spots) {
  const container = document.getElementById('nearby-spots-container');
  container.innerHTML = '';
  spots.forEach(spot => addNearbySpotRow(spot));
}

function addNearbySpotRow(spot = {}) {
  const container = document.getElementById('nearby-spots-container');
  const row = document.createElement('div');
  row.className = 'nearby-spot-row';

  const typeOptions = NEARBY_SPOT_TYPES.map(t =>
    `<option value="${t.value}" ${spot.type === t.value ? 'selected' : ''}>${t.icon} ${t.value}</option>`
  ).join('');

  row.innerHTML = `
    <div class="gift-row-header">
      <span class="gift-row-label">スポット ${container.children.length + 1}</span>
      <button class="btn btn-danger btn-remove-spot">削除</button>
    </div>
    <div class="nearby-spot-fields">
      <div class="field">
        <label>タイプ</label>
        <select class="spot-type">${typeOptions}</select>
      </div>
      <div class="field">
        <label>会場からの距離</label>
        <input type="text" class="spot-distance" placeholder="例: 徒歩5分、車で15分" value="${spot.distance_from_venue ?? ''}">
      </div>
      <div class="field">
        <label>名前（日本語）</label>
        <input type="text" class="spot-name-ja" value="${spot.name_ja ?? ''}">
      </div>
      <div class="field">
        <label>名前（English）</label>
        <div class="input-row">
          <input type="text" class="spot-name-en" value="${spot.name_en ?? ''}">
          <button class="btn btn-translate spot-translate-name">🔄 翻訳</button>
        </div>
      </div>
      <div class="field full">
        <label>説明（日本語）</label>
        <textarea class="spot-desc-ja" rows="2">${spot.description_ja ?? ''}</textarea>
      </div>
      <div class="field full">
        <label>説明（English）</label>
        <div class="input-row align-top">
          <textarea class="spot-desc-en" rows="2">${spot.description_en ?? ''}</textarea>
          <button class="btn btn-translate spot-translate-desc">🔄 翻訳</button>
        </div>
      </div>
      <div class="field full">
        <label>URL（任意）</label>
        <input type="url" class="spot-url" placeholder="https://..." value="${spot.url ?? ''}">
      </div>
      <div class="field">
        <label>緯度（任意）</label>
        <input type="number" class="spot-lat" step="0.0001" value="${spot.latitude ?? ''}">
      </div>
      <div class="field">
        <label>経度（任意）</label>
        <input type="number" class="spot-lng" step="0.0001" value="${spot.longitude ?? ''}">
      </div>
    </div>
  `;

  // 翻訳ボタン（名前）
  row.querySelector('.spot-translate-name').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const srcEl = row.querySelector('.spot-name-ja');
    const dstEl = row.querySelector('.spot-name-en');
    const text = srcEl.value.trim();
    if (!text) return alert('翻訳する日本語テキストを入力してください');
    btn.disabled = true; btn.textContent = '翻訳中…';
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, field: 'name' }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      dstEl.value = data.translated;
      markDirty();
    } catch (err) {
      alert(`翻訳エラー: ${err.message}`);
    } finally {
      btn.disabled = false; btn.textContent = '🔄 翻訳';
    }
  });

  // 翻訳ボタン（説明）
  row.querySelector('.spot-translate-desc').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const srcEl = row.querySelector('.spot-desc-ja');
    const dstEl = row.querySelector('.spot-desc-en');
    const text = srcEl.value.trim();
    if (!text) return alert('翻訳する日本語テキストを入力してください');
    btn.disabled = true; btn.textContent = '翻訳中…';
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, field: 'description' }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      dstEl.value = data.translated;
      markDirty();
    } catch (err) {
      alert(`翻訳エラー: ${err.message}`);
    } finally {
      btn.disabled = false; btn.textContent = '🔄 翻訳';
    }
  });

  // 削除ボタン
  row.querySelector('.btn-remove-spot').addEventListener('click', () => {
    row.remove();
    document.querySelectorAll('.nearby-spot-row .gift-row-label').forEach((el, i) => {
      el.textContent = `スポット ${i + 1}`;
    });
    markDirty();
  });

  row.querySelectorAll('input, textarea, select').forEach(el => el.addEventListener('input', markDirty));
  container.appendChild(row);
}

function collectNearbySpots() {
  return [...document.querySelectorAll('.nearby-spot-row')].map(row => ({
    type: row.querySelector('.spot-type').value,
    name_ja: row.querySelector('.spot-name-ja').value,
    name_en: row.querySelector('.spot-name-en').value,
    description_ja: row.querySelector('.spot-desc-ja').value,
    description_en: row.querySelector('.spot-desc-en').value,
    distance_from_venue: row.querySelector('.spot-distance').value,
    url: row.querySelector('.spot-url').value || null,
    latitude: parseFloat(row.querySelector('.spot-lat').value) || null,
    longitude: parseFloat(row.querySelector('.spot-lng').value) || null,
  }));
}

document.getElementById('btn-add-nearby-spot').addEventListener('click', () => {
  addNearbySpotRow();
  markDirty();
});

// ── 保存 ───────────────────────────────────────────────────────────
document.getElementById('btn-save').addEventListener('click', saveRace);

async function saveRace() {
  if (!currentRace) return;

  const updated = buildRaceData();
  const btn = document.getElementById('btn-save');
  const status = document.getElementById('save-status');
  btn.disabled = true;
  status.textContent = '保存中…';
  status.className = 'save-status';

  try {
    const res = await fetch(`/api/races/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error(await res.text());

    currentRace = updated;
    isDirty = false;
    status.textContent = '✓ 保存しました';
    status.className = 'save-status success';
    const displayName = updated.full_name_ja || updated.name_ja;
    document.getElementById('editor-title').textContent = displayName;

    // リスト側の名前も更新
    const listItem = document.querySelector(`.race-item[data-id="${updated.id}"] .race-item-name`);
    if (listItem) listItem.textContent = displayName;

    // 公式URLが変わっていれば更新
    updatePreview(updated.official_url);

    setTimeout(() => { status.textContent = ''; status.className = 'save-status'; }, 3000);
  } catch (err) {
    status.textContent = `エラー: ${err.message}`;
    status.className = 'save-status error';
  } finally {
    btn.disabled = false;
  }
}

// ── リモートDB登録 ────────────────────────────────────────────────
document.getElementById('btn-sync-remote').addEventListener('click', syncRemoteDb);

async function syncRemoteDb() {
  if (!confirm('全レースデータをリモートDB（本番）に反映します。\nよろしいですか？')) return;

  const btn = document.getElementById('btn-sync-remote');
  const status = document.getElementById('save-status');
  btn.disabled = true;
  status.textContent = 'リモートDB登録中…';
  status.className = 'save-status';

  try {
    const res = await fetch('/api/sync-remote', { method: 'POST' });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || 'リモートDB登録に失敗しました');
    status.textContent = '✓ リモートDBに登録しました';
    status.className = 'save-status success';
    setTimeout(() => { status.textContent = ''; status.className = 'save-status'; }, 5000);
  } catch (err) {
    status.textContent = `エラー: ${err.message}`;
    status.className = 'save-status error';
  } finally {
    btn.disabled = false;
  }
}

function buildRaceData() {
  // カテゴリ収集
  const categories = [...document.querySelectorAll('.category-row')].map(row => ({
    ...( (() => {
      // 既存カテゴリデータを維持しつつ編集値で上書き
      const idx = parseInt(row.dataset.idx) || 0;
      const orig = (currentRace.categories ?? [])[idx] ?? {};
      return orig;
    })() ),
    distance_type: row.querySelector('.cat-type').value,
    distance_km: parseFloat(row.querySelector('.cat-dist').value) || 0,
    entry_fee: parseInt(row.querySelector('.cat-fee').value) || null,
    capacity: parseInt(row.querySelector('.cat-capacity').value) || 0,
    time_limit_minutes: parseInt(row.querySelector('.cat-limit').value) || 0,
    start_time: row.querySelector('.cat-start').value || '',
    name_ja: row.querySelector('.cat-name-ja')?.value.trim() || null,
    eligibility_ja: row.querySelector('.cat-eligibility-ja')?.value.trim() || null,
    eligibility_en: row.querySelector('.cat-eligibility-en')?.value.trim() || null,
    course_gpx_file: row.querySelector('.cat-gpx-file')?.value.trim() || null,
  }));

  // タグ収集
  const tags = [...document.querySelectorAll('.tag-item.selected')].map(el => el.dataset.tag);

  // エントリー期間収集（レガシーフィールドも最初の期間から自動導出）
  const entryPeriods = collectEntryPeriods();
  const firstPeriod = entryPeriods[0] ?? null;

  return {
    ...currentRace,
    entry_fee: null,
    entry_fee_by_category: true,
    name_ja: getVal('f-name_ja'),
    name_en: getVal('f-name_en'),
    full_name_ja: getVal('f-full_name_ja') || null,
    full_name_en: getVal('f-full_name_en') || null,
    edition: parseInt(getVal('f-edition')) || null,
    date: getVal('f-date'),
    prefecture: getVal('f-prefecture'),
    city_ja: getVal('f-city_ja'),
    city_en: getVal('f-city_en'),
    description_ja: getVal('f-description_ja'),
    description_en: getVal('f-description_en'),
    official_url: getVal('f-official_url'),
    entry_periods: entryPeriods,
    entry_closed: document.getElementById('f-entry_closed')?.checked ?? false,
    entry_links: collectEntryLinks(),
    // レガシーフィールド: 最初の期間から自動導出
    entry_start_date: firstPeriod?.start_date ?? null,
    entry_end_date: firstPeriod?.end_date ?? null,
    reception_type: getVal('f-reception_type'),
    reception_note_ja: getVal('f-reception_note_ja'),
    reception_note_en: getVal('f-reception_note_en'),
    categories,
    tags,
    course_gpx_file: getVal('f-course_gpx_file') || null,
    participation_gifts: collectGifts(),
    nearby_spots: collectNearbySpots(),
  };
}

function getVal(id) {
  return document.getElementById(id)?.value ?? '';
}

// ── 翻訳 ───────────────────────────────────────────────────────────
document.querySelectorAll('.btn-translate').forEach(btn => {
  btn.addEventListener('click', async () => {
    const srcEl = document.getElementById(btn.dataset.src);
    const dstEl = document.getElementById(btn.dataset.dst);
    const field = btn.dataset.field;
    const text = srcEl.value.trim();
    if (!text) return alert('翻訳する日本語テキストを入力してください');

    btn.disabled = true;
    btn.textContent = '翻訳中…';
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, field }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      dstEl.value = data.translated;
      markDirty();
    } catch (err) {
      alert(`翻訳エラー: ${err.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = '🔄 翻訳';
    }
  });
});

// ── 画像アップロード ───────────────────────────────────────────────
document.getElementById('image-upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file || !currentRace) return;

  const ext = '.' + file.name.split('.').pop().toLowerCase();
  const base64 = await fileToBase64(file);

  try {
    const res = await fetch(`/api/upload/${currentRace.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64, ext }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error('アップロード失敗');

    // プレビュー更新
    showImagePreview(data.url + '?t=' + Date.now());

    // リスト側バッジ更新
    const meta = document.querySelector(`.race-item[data-id="${currentRace.id}"] .race-item-meta`);
    if (meta && !meta.querySelector('.img-badge')) {
      meta.insertAdjacentHTML('beforeend', '<span class="img-badge">📷 画像あり</span>');
    }
  } catch (err) {
    alert(`画像エラー: ${err.message}`);
  }
});

function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

async function loadImagePreview(id) {
  const preview = document.getElementById('image-preview');
  const exts = ['jpg', 'png', 'webp'];
  for (const ext of exts) {
    const url = `/images/races/${id}.${ext}`;
    const ok = await imageExists(url);
    if (ok) { showImagePreview(url); return; }
  }
  preview.innerHTML = '<span class="image-placeholder">画像なし</span>';
}

function showImagePreview(url) {
  document.getElementById('image-preview').innerHTML = `<img src="${url}" alt="eyecatch" />`;
}

function imageExists(url) {
  return fetch(url, { method: 'HEAD' }).then(r => r.ok).catch(() => false);
}

// ── 公式サイトプレビュー ───────────────────────────────────────────
let previewVisible = false;

document.getElementById('btn-toggle-preview').addEventListener('click', () => {
  previewVisible = !previewVisible;
  document.getElementById('preview-pane').classList.toggle('hidden', !previewVisible);
  document.getElementById('resize-handle').classList.toggle('hidden', !previewVisible);
  document.getElementById('btn-toggle-preview').style.background = previewVisible ? 'var(--ink)' : '';
  document.getElementById('btn-toggle-preview').style.color = previewVisible ? 'white' : '';
});

// ── リサイズハンドル ───────────────────────────────────────────────
(function initResizeHandle() {
  const handle = document.getElementById('resize-handle');
  const pane = document.getElementById('preview-pane');

  let startX = 0;
  let startWidth = 0;

  handle.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startWidth = pane.getBoundingClientRect().width;
    handle.classList.add('dragging');

    // ドラッグ中は iframe のマウスイベントを無効化（iframe がイベントを吸収するのを防ぐ）
    document.getElementById('preview-iframe').style.pointerEvents = 'none';

    const onMove = (e) => {
      const delta = startX - e.clientX; // 右端から左に広げる
      const newWidth = Math.max(200, startWidth + delta);
      pane.style.width = newWidth + 'px';
    };

    const onUp = () => {
      handle.classList.remove('dragging');
      document.getElementById('preview-iframe').style.pointerEvents = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
})();

function updatePreview(url) {
  const pane = document.getElementById('preview-pane');
  const urlLabel = document.getElementById('preview-url');
  const openLink = document.getElementById('preview-open');
  const iframe = document.getElementById('preview-iframe');

  if (!url) {
    urlLabel.textContent = 'URLなし';
    openLink.href = '#';
    iframe.src = 'about:blank';
    return;
  }

  urlLabel.textContent = url;
  openLink.href = url;
  iframe.src = url;
}

// ── ユーティリティ ─────────────────────────────────────────────────
function markDirty() {
  isDirty = true;
}

function bindEvents() {
  // フォーム変更検知
  document.querySelectorAll('input:not([readonly]), select, textarea').forEach(el => {
    el.addEventListener('input', markDirty);
  });

  // ページ離脱警告
  window.addEventListener('beforeunload', (e) => {
    if (isDirty) { e.preventDefault(); e.returnValue = ''; }
  });

  // Cmd/Ctrl+S で保存
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      saveRace();
    }
  });
}

// ── 大会削除 ───────────────────────────────────────────────────────
document.getElementById('btn-delete').addEventListener('click', async () => {
  if (!currentRace) return;
  const name = currentRace.full_name_ja || currentRace.name_ja;
  if (!confirm(`「${name}」を削除しますか？\nこの操作は元に戻せません。`)) return;

  try {
    const res = await fetch(`/api/races/${currentRace.id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || '削除失敗');

    // エディターを閉じてリスト更新
    currentRace = null;
    isDirty = false;
    document.getElementById('editor').style.display = 'none';
    document.getElementById('empty-state').style.display = 'flex';
    await loadRaceList();
  } catch (err) {
    alert(`削除エラー: ${err.message}`);
  }
});

// ── 大会追加モーダル ───────────────────────────────────────────────
let modalMode = 'from-series';
let modalSeriesList = [];

document.getElementById('btn-add-race').addEventListener('click', openAddModal);
document.getElementById('modal-close').addEventListener('click', closeAddModal);
document.getElementById('modal-cancel').addEventListener('click', closeAddModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeAddModal();
});

document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    modalMode = tab.dataset.mode;
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t === tab));
    document.getElementById('modal-from-series').classList.toggle('hidden', modalMode !== 'from-series');
    document.getElementById('modal-new-series').classList.toggle('hidden', modalMode !== 'new-series');
    updateModalIdPreview();
  });
});

// ID プレビュー更新
document.getElementById('m-series-select').addEventListener('change', updateModalIdPreview);
document.getElementById('m-year-existing').addEventListener('input', updateModalIdPreview);
document.getElementById('m-series-id').addEventListener('input', updateModalIdPreview);
document.getElementById('m-year-new').addEventListener('input', updateModalIdPreview);

function updateModalIdPreview() {
  if (modalMode === 'from-series') {
    const sid = document.getElementById('m-series-select').value;
    const year = document.getElementById('m-year-existing').value;
    const preview = sid && year ? `${sid}-${year}` : '—';
    document.getElementById('m-id-preview-existing').textContent = preview;
  } else {
    const sid = document.getElementById('m-series-id').value.trim();
    const year = document.getElementById('m-year-new').value;
    const preview = sid && year ? `${sid}-${year}` : '—';
    document.getElementById('m-id-preview-new').textContent = preview;
  }
}

async function openAddModal() {
  // 都道府県セレクトを初期化（モーダル用）
  const sel = document.getElementById('m-prefecture-new');
  if (!sel.children.length) {
    sel.innerHTML = PREFECTURES.map(p => `<option value="${p.code}">${p.name}</option>`).join('');
  }

  // シリーズ一覧を取得
  const seriesSel = document.getElementById('m-series-select');
  seriesSel.innerHTML = '<option value="">読み込み中…</option>';
  try {
    const res = await fetch('/api/series');
    modalSeriesList = await res.json();
    seriesSel.innerHTML = modalSeriesList.map(s =>
      `<option value="${s.id}">${s.name_ja}</option>`
    ).join('');
  } catch {
    seriesSel.innerHTML = '<option value="">取得失敗</option>';
  }

  // デフォルト年を設定
  const nextYear = new Date().getFullYear() + 1;
  document.getElementById('m-year-existing').value = nextYear;
  document.getElementById('m-year-new').value = nextYear;
  updateModalIdPreview();

  document.getElementById('modal-error').textContent = '';
  document.getElementById('modal-error').classList.add('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeAddModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

document.getElementById('modal-submit').addEventListener('click', async () => {
  const errorEl = document.getElementById('modal-error');
  errorEl.classList.add('hidden');
  const submitBtn = document.getElementById('modal-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = '作成中…';

  try {
    let body;
    if (modalMode === 'from-series') {
      const seriesId = document.getElementById('m-series-select').value;
      const year = document.getElementById('m-year-existing').value;
      if (!seriesId) throw new Error('シリーズを選択してください');
      if (!year) throw new Error('開催年を入力してください');
      body = { mode: 'from-series', seriesId, year };
    } else {
      const seriesId = document.getElementById('m-series-id').value.trim();
      const name_ja = document.getElementById('m-name-ja').value.trim();
      const name_en = document.getElementById('m-name-en').value.trim();
      const year = document.getElementById('m-year-new').value;
      const date = document.getElementById('m-date-new').value;
      const prefecture = document.getElementById('m-prefecture-new').value;
      if (!seriesId) throw new Error('シリーズIDを入力してください');
      if (!/^[a-z0-9-]+$/.test(seriesId)) throw new Error('シリーズIDは英小文字・数字・ハイフンのみ使用できます');
      if (!name_ja) throw new Error('大会名（日本語）を入力してください');
      if (!year) throw new Error('開催年を入力してください');
      body = { mode: 'new-series', seriesId, year, name_ja, name_en, date, prefecture };
    }

    const res = await fetch('/api/races', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '作成失敗');

    closeAddModal();
    await loadRaceList();
    // 作成した大会をエディターで開く
    loadRace(data.id);
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '作成して編集';
  }
});

// ── タブ切り替え ────────────────────────────────────────────────────
let currentTab = 'races'; // 'races' | 'check' | 'data-check'

document.getElementById('tab-races').addEventListener('click', () => switchTab('races'));
document.getElementById('tab-check').addEventListener('click', () => switchTab('check'));
document.getElementById('tab-data-check').addEventListener('click', () => switchTab('data-check'));

function switchTab(tab) {
  currentTab = tab;

  document.getElementById('tab-races').classList.toggle('active', tab === 'races');
  document.getElementById('tab-check').classList.toggle('active', tab === 'check');
  document.getElementById('tab-data-check').classList.toggle('active', tab === 'data-check');

  // サイドバー
  document.getElementById('race-list').classList.toggle('hidden', tab !== 'races');
  document.getElementById('series-list').classList.toggle('hidden', tab !== 'check');
  document.getElementById('data-check-list').classList.toggle('hidden', tab !== 'data-check');
  document.getElementById('search').style.display = tab === 'races' ? '' : 'none';

  // メインエリア
  const inEditor = document.getElementById('editor').style.display !== 'none';
  document.getElementById('empty-state').style.display = (tab === 'races' && !inEditor) ? 'flex' : 'none';
  document.getElementById('editor').style.display = (tab === 'races' && inEditor) ? 'flex' : 'none';
  document.getElementById('resize-handle').classList.add('hidden');
  document.getElementById('preview-pane').classList.add('hidden');
  document.getElementById('check-area').classList.toggle('hidden', tab !== 'check');
  document.getElementById('data-check-area').classList.toggle('hidden', tab !== 'data-check');

  if (tab === 'check') loadSeriesList();
  if (tab === 'data-check') loadDataCheck();
}

// ── シリーズ一覧 ────────────────────────────────────────────────────
let currentCheckSeriesId = null;
let lastCheckResult = null;

async function loadSeriesList() {
  const list = document.getElementById('series-list');
  list.innerHTML = '<li style="padding:12px 14px;color:rgba(255,255,255,0.3);font-size:12px;">読み込み中…</li>';

  try {
    const res = await fetch('/api/series');
    const series = await res.json();

    list.innerHTML = series.map(s => {
      const hasUrl = !!s.latestRace?.official_url;
      return `
        <li class="series-item" data-id="${s.id}">
          <div class="series-item-info">
            <div class="series-item-name">${s.name_ja}</div>
            ${s.latestRace ? `<div class="series-item-date">${s.latestRace.date}</div>` : ''}
            ${!hasUrl ? '<div class="series-item-no-url">公式URLなし</div>' : ''}
          </div>
          <button class="btn btn-check" data-id="${s.id}" ${hasUrl ? '' : 'disabled'}>チェック</button>
        </li>
      `;
    }).join('');

    list.querySelectorAll('.btn-check:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sid = btn.dataset.id;
        const seriesName = btn.closest('.series-item').querySelector('.series-item-name').textContent;
        startSeriesCheck(sid, seriesName);
      });
    });

    list.querySelectorAll('.series-item').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.series-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
      });
    });

  } catch (err) {
    list.innerHTML = `<li style="padding:12px 14px;color:#e07060;font-size:12px;">エラー: ${err.message}</li>`;
  }
}

// ── シリーズチェック実行 ─────────────────────────────────────────────
async function startSeriesCheck(seriesId, seriesName) {
  currentCheckSeriesId = seriesId;
  lastCheckResult = null;

  // アクティブ表示
  document.querySelectorAll('.series-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === seriesId);
  });

  // チェック中表示
  document.getElementById('check-empty').classList.add('hidden');
  document.getElementById('check-result').classList.add('hidden');

  const loadingEl = document.createElement('div');
  loadingEl.className = 'check-empty';
  loadingEl.id = 'check-loading';
  loadingEl.innerHTML = `<p>🔍 ${seriesName} をチェック中…<br><span style="font-size:11px;opacity:0.7">公式サイトにアクセスしています</span></p>`;
  document.getElementById('check-panel').appendChild(loadingEl);

  // チェック中はボタン無効化
  const btn = document.querySelector(`.btn-check[data-id="${seriesId}"]`);
  if (btn) { btn.disabled = true; btn.textContent = '確認中…'; }

  try {
    const res = await fetch('/api/series-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seriesId }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'チェック失敗');

    lastCheckResult = data;
    renderCheckResult(data);

  } catch (err) {
    document.getElementById('check-panel').querySelector('#check-loading')?.remove();
    document.getElementById('check-empty').classList.remove('hidden');
    document.getElementById('check-empty').innerHTML = `<p style="color:var(--primary)">エラー: ${err.message}</p>`;
  } finally {
    const loadEl = document.getElementById('check-loading');
    if (loadEl) loadEl.remove();
    if (btn) { btn.disabled = false; btn.textContent = 'チェック'; }
  }
}

// ── チェック結果レンダリング ──────────────────────────────────────────
const DATE_STATUS_LABELS = {
  same:      { text: '同じ大会',           cls: 'badge-same' },
  next_race: { text: '次回大会の可能性',    cls: 'badge-next' },
  ambiguous: { text: '開催日が異なります',  cls: 'badge-ambiguous' },
  unknown:   { text: '日付を取得できず',    cls: 'badge-unknown' },
};

function renderCheckResult(data) {
  document.getElementById('check-result').classList.remove('hidden');
  document.getElementById('check-empty').classList.add('hidden');

  // タイトル
  document.getElementById('check-series-name').textContent = data.seriesName;

  // ステータスバッジ
  const statusInfo = DATE_STATUS_LABELS[data.dateStatus] || DATE_STATUS_LABELS.unknown;
  const badge = document.getElementById('check-status-badge');
  badge.textContent = statusInfo.text;
  badge.className = `check-status-badge ${statusInfo.cls}`;

  // 参照URL
  const sourceBar = document.getElementById('check-source-bar');
  sourceBar.innerHTML = '<strong>参照元:</strong> ' + data.sourceUrls.map((u, i) =>
    `<a class="check-source-url" href="${u}" target="_blank" rel="noopener">${u}</a>${i < data.sourceUrls.length - 1 ? '<span class="check-source-sep">・</span>' : ''}`
  ).join('');

  // 差分テーブル
  const tbody = document.getElementById('diff-tbody');
  const changedDiff = data.diff.filter(d => d.changed);
  const noChangeDiff = data.diff.filter(d => !d.changed);

  if (changedDiff.length === 0 && data.dateStatus === 'same') {
    document.getElementById('check-no-change').classList.remove('hidden');
    document.getElementById('check-diff-area').style.display = 'none';
    return;
  }

  document.getElementById('check-no-change').classList.add('hidden');
  document.getElementById('check-diff-area').style.display = '';

  tbody.innerHTML = [...changedDiff, ...noChangeDiff].map(d => `
    <tr class="${d.changed ? 'diff-row-changed' : ''}">
      <td>${d.label}</td>
      <td>${d.current ?? '<span style="color:var(--light)">未設定</span>'}</td>
      <td>${d.extracted ?? '<span style="color:var(--light)">取得できず</span>'}</td>
      <td style="text-align:center">
        ${d.changed
          ? `<input type="checkbox" class="diff-check" data-key="${d.key}" checked />`
          : '<span style="color:var(--light);font-size:11px;">—</span>'
        }
      </td>
    </tr>
  `).join('');

  // AI特記事項
  const notesEl = document.getElementById('check-notes');
  if (data.extracted?.notes) {
    notesEl.classList.remove('hidden');
    notesEl.innerHTML = `<strong>AI特記事項</strong>${data.extracted.notes}`;
  } else {
    notesEl.classList.add('hidden');
  }

  // アクションボタン
  renderCheckActions(data);
}

function renderCheckActions(data) {
  const actionsEl = document.getElementById('check-actions');

  if (data.dateStatus === 'same') {
    actionsEl.innerHTML = `
      <button class="btn btn-apply-update" id="btn-do-update">既存データを更新</button>
      <span class="action-hint">チェックボックスで選択した項目を ${data.currentRaceId}.json に上書きします</span>
    `;
    document.getElementById('btn-do-update').addEventListener('click', () => applyCheck('update', data));

  } else if (data.dateStatus === 'next_race') {
    actionsEl.innerHTML = `
      <button class="btn btn-apply-new" id="btn-do-new">次回大会として新規追加</button>
      <button class="btn btn-secondary" id="btn-do-update-anyway">既存を更新</button>
      <span class="action-hint">
        登録済み開催日 ${data.currentDate} は過去です。
        ${data.newRaceId ? `新規ファイル: <strong>${data.newRaceId}.json</strong>` : ''}
      </span>
    `;
    document.getElementById('btn-do-new').addEventListener('click', () => applyCheck('new', data));
    document.getElementById('btn-do-update-anyway').addEventListener('click', () => applyCheck('update', data));

  } else if (data.dateStatus === 'ambiguous') {
    actionsEl.innerHTML = `
      <button class="btn btn-apply-new" id="btn-do-new">新規大会として追加</button>
      <button class="btn btn-apply-update" id="btn-do-update">既存を更新（日付変更扱い）</button>
      <span class="action-hint">
        登録日 ${data.currentDate} と抽出日 ${data.extracted?.date} が異なります。
        ${data.newRaceId ? `新規ID候補: <strong>${data.newRaceId}</strong>` : ''}
      </span>
    `;
    document.getElementById('btn-do-new').addEventListener('click', () => applyCheck('new', data));
    document.getElementById('btn-do-update').addEventListener('click', () => applyCheck('update', data));

  } else {
    actionsEl.innerHTML = `<span style="color:var(--light);font-size:12px;">日付情報が取得できなかったため適用できません。手動で確認してください。</span>`;
  }
}

// ── データチェック ────────────────────────────────────────────────────
let dcAllData = [];

async function loadDataCheck() {
  const wrap = document.getElementById('dc-table-wrap');
  wrap.innerHTML = '<p style="padding:20px;color:var(--light);">読み込み中…</p>';

  try {
    const res = await fetch('/api/completeness');
    if (!res.ok) throw new Error(`サーバーエラー: ${res.status} — サーバーを再起動してください`);
    dcAllData = await res.json();

    // 年フィルタを構築
    const years = [...new Set(dcAllData.map(r => r.date?.slice(0, 4)).filter(Boolean))].sort().reverse();
    const yearSel = document.getElementById('dc-year-filter');
    yearSel.innerHTML = '<option value="">すべての年</option>' +
      years.map(y => `<option value="${y}">${y}年</option>`).join('');

    // イベントバインド（初回のみ）
    if (!yearSel.dataset.bound) {
      yearSel.dataset.bound = '1';
      yearSel.addEventListener('change', renderDcTable);
      document.getElementById('dc-hide-ok').addEventListener('change', renderDcTable);
    }

    renderDcTable();
  } catch (err) {
    wrap.innerHTML = `<p style="padding:20px;color:var(--primary);">エラー: ${err.message}</p>`;
  }
}

const DC_FIELDS = [
  { key: 'entry_period',   label: 'エントリー期間', priority: 'high' },
  { key: 'entry_fee_cat',  label: '参加費',          priority: 'high' },
  { key: 'official_url',   label: '公式URL',         priority: 'high' },
  { key: 'entry_capacity', label: '定員',            priority: 'medium' },
  { key: 'time_limit',     label: '制限時間',        priority: 'medium' },
  { key: 'description',    label: '説明文',          priority: 'medium' },
];

function renderDcTable() {
  const wrap = document.getElementById('dc-table-wrap');
  const year = document.getElementById('dc-year-filter').value;
  const hideOk = document.getElementById('dc-hide-ok').checked;

  let data = dcAllData;
  if (year) data = data.filter(r => r.date?.startsWith(year));

  if (hideOk) {
    data = data.filter(r => r.missing.high.length > 0 || r.missing.medium.length > 0);
  }

  if (data.length === 0) {
    wrap.innerHTML = '<p style="padding:20px;color:var(--light);">該当する大会はありません</p>';
    return;
  }

  const headerCells = DC_FIELDS.map(f => `<th>${f.label}</th>`).join('');
  const rows = data.map(r => {
    const allMissingFields = new Set([
      ...r.missing.high.map(m => m.field),
      ...r.missing.medium.map(m => m.field),
    ]);
    // entry_fee と entry_fee_cat は同じ列にまとめる
    if (allMissingFields.has('entry_fee')) allMissingFields.add('entry_fee_cat');

    const cells = DC_FIELDS.map(f => {
      const ng = allMissingFields.has(f.key);
      if (ng) {
        return `<td class="dc-ng" data-id="${r.id}" title="${r.name_ja} — ${f.label}未整備">✗</td>`;
      }
      return `<td class="dc-ok">✓</td>`;
    }).join('');

    return `<tr>
      <td class="dc-name-cell" title="${r.name_ja}">${r.name_ja}</td>
      <td style="white-space:nowrap;font-size:11px;color:var(--mid);">${r.date ?? '—'}</td>
      ${cells}
    </tr>`;
  }).join('');

  wrap.innerHTML = `
    <table class="dc-table">
      <thead>
        <tr>
          <th>大会名</th>
          <th>開催日</th>
          ${headerCells}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  // ✗ クリックで編集タブへ
  wrap.querySelectorAll('.dc-ng').forEach(cell => {
    cell.addEventListener('click', () => {
      const id = cell.dataset.id;
      switchTab('races');
      loadRace(id);
    });
  });
}

// ── チェック結果を適用 ────────────────────────────────────────────────
async function applyCheck(mode, data) {
  // チェックされた項目のみ updates に含める
  const updates = {};
  document.querySelectorAll('.diff-check:checked').forEach(cb => {
    const key = cb.dataset.key;
    const row = data.diff.find(d => d.key === key);
    if (row) updates[key] = row.extracted;
  });

  if (Object.keys(updates).length === 0) {
    alert('適用する項目を1つ以上選択してください');
    return;
  }

  const confirmMsg = mode === 'new'
    ? `${data.newRaceId}.json を新規作成します。よろしいですか？`
    : `${data.currentRaceId}.json を更新します。よろしいですか？`;
  if (!confirm(confirmMsg)) return;

  // ボタン無効化
  document.querySelectorAll('#check-actions .btn').forEach(b => { b.disabled = true; });

  try {
    const res = await fetch('/api/series-apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        raceId: data.currentRaceId,
        updates,
        mode,
        newRaceId: mode === 'new' ? data.newRaceId : undefined,
      }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || '保存失敗');

    const msg = mode === 'new'
      ? `✓ ${result.id}.json を新規作成しました`
      : `✓ ${result.id}.json を更新しました`;

    const noticeEl = document.createElement('div');
    noticeEl.style.cssText = 'padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:4px;color:#15803d;font-size:13px;font-weight:600;';
    noticeEl.textContent = msg;
    document.getElementById('check-actions').after(noticeEl);

    // 大会一覧を更新
    loadRaceList();

  } catch (err) {
    alert(`エラー: ${err.message}`);
    document.querySelectorAll('#check-actions .btn').forEach(b => { b.disabled = false; });
  }
}
