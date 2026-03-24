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
  list.innerHTML = races.map(r => `
    <li class="race-item" data-id="${r.id}">
      <div class="race-item-name">${r.full_name_ja ?? r.name_ja}</div>
      <div class="race-item-meta">
        ${r.date}
        ${r.hasImage ? '<span class="img-badge">📷 画像あり</span>' : ''}
      </div>
    </li>
  `).join('');

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

  // エントリー
  setVal('f-entry_start_date', r.entry_start_date ?? '');
  setVal('f-entry_end_date', r.entry_end_date ?? '');
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
  `;
  row.querySelector('.btn-remove-cat').addEventListener('click', () => {
    row.remove();
    markDirty();
  });
  row.querySelectorAll('input, select').forEach(el => el.addEventListener('change', markDirty));
  container.appendChild(row);
}

document.getElementById('btn-add-category').addEventListener('click', () => {
  addCategoryRow();
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
  }));

  // タグ収集
  const tags = [...document.querySelectorAll('.tag-item.selected')].map(el => el.dataset.tag);

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
    entry_fee: parseInt(getVal('f-entry_fee')) || 0,
    entry_capacity: parseInt(getVal('f-entry_capacity')) || 0,
    entry_start_date: getVal('f-entry_start_date') || null,
    entry_end_date: getVal('f-entry_end_date') || null,
    reception_type: getVal('f-reception_type'),
    reception_note_ja: getVal('f-reception_note_ja'),
    reception_note_en: getVal('f-reception_note_en'),
    categories,
    tags,
    course_gpx_file: getVal('f-course_gpx_file') || null,
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
