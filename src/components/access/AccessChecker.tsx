'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { AccessInfo } from '@/lib/types';

interface AccessCheckerProps {
  access: AccessInfo;
}

export default function AccessChecker({ access }: AccessCheckerProps) {
  const t = useTranslations('access');
  const [departure, setDeparture] = useState('');
  const [showResult, setShowResult] = useState(false);

  function handleCheck() {
    if (departure.trim()) {
      setShowResult(true);
    }
  }

  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">{t('title')}</h3>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          placeholder={t('inputPlaceholder')}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          aria-label={t('inputLabel')}
        />
        <button
          onClick={handleCheck}
          disabled={!departure.trim()}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('checkButton')}
        </button>
      </div>

      {/* Access info */}
      <div className="space-y-3 text-sm">
        {access.nearestStation && (
          <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-lg">🚉</span>
            <div>
              <p className="font-medium text-gray-900">{t('result.nearestStation')}</p>
              <p className="text-gray-600">
                {access.nearestStation}
                {access.walkingMinutes && (
                  <span className="ml-2 text-primary">
                    {t('result.walkingTime', { minutes: access.walkingMinutes })}
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {access.busInfo && (
          <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-lg">🚌</span>
            <div>
              <p className="font-medium text-gray-900">{t('result.bus')}</p>
              <p className="text-gray-600">{access.busInfo}</p>
            </div>
          </div>
        )}

        {access.shuttleInfo && (
          <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-lg">🚐</span>
            <div>
              <p className="font-medium text-gray-900">{t('result.shuttle')}</p>
              <p className="text-gray-600">{access.shuttleInfo}</p>
            </div>
          </div>
        )}

        {access.parkingAvailable && (
          <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-lg">🅿️</span>
            <div>
              <p className="font-medium text-gray-900">{t('result.parking')}</p>
              <p className="text-gray-600">
                {access.parkingCapacity
                  ? `${access.parkingCapacity.toLocaleString()}台`
                  : 'あり'}
                {access.parkingFee && ` / ¥${access.parkingFee.toLocaleString()}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Departure result */}
      {showResult && departure && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p className="text-blue-700">
            <strong>{departure}</strong> からのアクセス情報は{' '}
            <a
              href={`https://www.google.com/maps/dir/${encodeURIComponent(departure)}/${encodeURIComponent(access.nearestStation ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-900"
            >
              Google Maps で確認
            </a>
            できます。
          </p>
        </div>
      )}
    </div>
  );
}
