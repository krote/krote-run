'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { submitContact, type ContactActionState } from '@/lib/contact-actions';

type Props = {
  defaultName?: string;
  defaultEmail?: string;
  userId?: string;
};

export default function ContactForm({ defaultName = '', defaultEmail = '', userId }: Props) {
  const t = useTranslations('contact');
  const [state, action, isPending] = useActionState<ContactActionState, FormData>(
    submitContact,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && 'success' in state) {
      formRef.current?.reset();
    }
  }, [state]);

  if (state && 'success' in state) {
    return (
      <div className="text-center py-16 px-6">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--color-primary)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-ink)' }}>
          {t('successTitle')}
        </h2>
        <p className="text-sm mb-8" style={{ color: '#666' }}>
          {t('successMessage')}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-sm font-medium rounded-lg no-underline transition-colors"
          style={{ background: 'var(--color-primary)', color: 'white' }}
        >
          {t('backToTop')}
        </Link>
      </div>
    );
  }

  const categories = ['race_error', 'race_suggestion', 'site_bug', 'other'] as const;

  return (
    <form ref={formRef} action={action} className="space-y-6">
      {userId && <input type="hidden" name="user_id" value={userId} />}

      {state && 'error' in state && (
        <div
          className="px-4 py-3 rounded-lg text-sm"
          style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #fac9c9' }}
        >
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-ink)' }}
          >
            {t('name')} <span style={{ color: 'var(--color-primary)' }}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            defaultValue={defaultName}
            placeholder={t('namePlaceholder')}
            required
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              background: 'white',
              color: 'var(--color-ink)',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-ink)' }}
          >
            {t('email')} <span style={{ color: 'var(--color-primary)' }}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            defaultValue={defaultEmail}
            placeholder={t('emailPlaceholder')}
            required
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              background: 'white',
              color: 'var(--color-ink)',
            }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-category"
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-ink)' }}
        >
          {t('category')} <span style={{ color: 'var(--color-primary)' }}>*</span>
        </label>
        <select
          id="contact-category"
          name="category"
          required
          defaultValue=""
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors appearance-none"
          style={{
            border: '1px solid var(--color-border)',
            background: 'white',
            color: 'var(--color-ink)',
          }}
        >
          <option value="" disabled>{t('categoryPlaceholder')}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{t(`categories.${cat}`)}</option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-ink)' }}
        >
          {t('message')} <span style={{ color: 'var(--color-primary)' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder={t('messagePlaceholder')}
          required
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors resize-y"
          style={{
            border: '1px solid var(--color-border)',
            background: 'white',
            color: 'var(--color-ink)',
            minHeight: '120px',
          }}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-medium transition-opacity disabled:opacity-60"
          style={{ background: 'var(--color-primary)', color: 'white' }}
        >
          {isPending ? t('submitting') : t('submit')}
        </button>
      </div>
    </form>
  );
}
