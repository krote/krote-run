'use client';

import { useEffect, useRef, useState } from 'react';
import type { CourseProfile } from '@/lib/types';

// NOTE: Import as dynamic with ssr:false to avoid SSR issues with Leaflet
// Usage in pages via CourseMapLoader component

interface CourseMapProps {
  courseProfile: CourseProfile;
  className?: string;
}

export default function CourseMap({ courseProfile, className = '' }: CourseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;
    let cancelled = false;

    import('leaflet').then((L) => {
      if (cancelled || !mapRef.current || leafletMapRef.current) return;
      // Fix default icon paths for webpack/Next.js
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const points = courseProfile.points;
      const centerLat = points.length > 0
        ? points.reduce((sum, p) => sum + p.lat, 0) / points.length
        : 35.6762;
      const centerLng = points.length > 0
        ? points.reduce((sum, p) => sum + p.lng, 0) / points.length
        : 139.6503;

      const map = L.map(mapRef.current);
      leafletMapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (points.length > 0) {
        const latlngs = points.map((p) => [p.lat, p.lng] as [number, number]);
        const polyline = L.polyline(latlngs, { color: '#2563eb', weight: 3 }).addTo(map);
        map.fitBounds(polyline.getBounds(), { padding: [20, 20] });
        L.marker([points[0].lat, points[0].lng]).addTo(map);
      } else {
        map.setView([centerLat, centerLng], 13);
        L.marker([centerLat, centerLng]).addTo(map);
      }
    });

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 拡大/縮小後にLeafletのタイル再描画を通知
  useEffect(() => {
    const timer = setTimeout(() => {
      leafletMapRef.current?.invalidateSize();
    }, 320);
    return () => clearTimeout(timer);
  }, [expanded]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div className={`relative ${className}`}>
        <div
          ref={mapRef}
          className="w-full rounded-lg overflow-hidden transition-[height] duration-300"
          style={{ height: expanded ? '70vh' : 256, minHeight: 256 }}
        />
        <button
          onClick={() => setExpanded((e) => !e)}
          title={expanded ? '縮小' : '拡大'}
          aria-label={expanded ? '縮小' : '拡大'}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1001,
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            padding: '3px 8px',
            fontSize: 12,
            color: 'var(--color-ink)',
            cursor: 'pointer',
            lineHeight: 1.5,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        >
          {expanded ? '縮小' : '拡大'}
        </button>
      </div>
    </>
  );
}
