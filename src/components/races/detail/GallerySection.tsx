import type { Race, Locale } from '@/lib/types';

interface GallerySectionProps {
  race: Race;
  locale: Locale;
}

export default function GallerySection({ race, locale }: GallerySectionProps) {
  const hasGallery = race.gallery.length > 0;
  const hasVoices = race.voices.length > 0;

  if (!hasGallery && !hasVoices) return null;

  const isJa = locale === 'ja';

  return (
    <section id="gallery">
      {/* フォトギャラリー */}
      {hasGallery && (
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {race.gallery.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-[4px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.caption_ja ?? ''}
                  className="w-full aspect-[4/3] object-cover"
                />
                {(item.caption_ja || item.caption_en) && (
                  <p
                    className="text-xs px-2 py-1.5 leading-snug"
                    style={{ color: 'var(--color-mid)', background: 'white', border: '1px solid var(--color-border)', borderTop: 'none' }}
                  >
                    {isJa ? (item.caption_ja ?? item.caption_en) : (item.caption_en ?? item.caption_ja)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 参加者の声 */}
      {hasVoices && (
        <div className="space-y-3">
          {race.voices.map((voice, i) => (
            <div
              key={i}
              className="rounded-[4px] p-4"
              style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
            >
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ color: 'var(--color-ink2)' }}
              >
                &ldquo;{voice.quote_ja}&rdquo;
              </p>
              {voice.author && (
                <p className="text-xs font-medium" style={{ color: 'var(--color-mid)' }}>
                  — {voice.author}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
