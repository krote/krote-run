'use strict';

/**
 * テスト用に最小の PDF を生成する（tools/crawl のテスト専用）
 * @param {string[]} lines - 1ページに書く行（ASCII のみ）。空配列ならテキストなしの PDF
 * @returns {Uint8Array}
 */
function makePdf(lines) {
  const escape = (s) => s.replace(/[\()]/g, (c) => `\${c}`);
  const content = lines.length === 0
    ? ''
    : `BT /F1 10 Tf 20 800 Td 12 TL ${lines.map((l) => `(${escape(l)}) '`).join(' ')} ET`;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let body = '%PDF-1.4\n';
  const offsets = [];
  objects.forEach((obj, i) => {
    offsets.push(body.length);
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefAt = body.length;
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) body += `${String(off).padStart(10, '0')} 00000 n \n`;
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`;
  return new TextEncoder().encode(body);
}

module.exports = { makePdf };
