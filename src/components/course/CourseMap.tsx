'use client';

import { useEffect, useRef } from 'react';
import type { CourseProfile } from '@/lib/types';

// NOTE: Import as dynamic with ssr:false to avoid SSR issues with Leaflet
// Usage in pages via CourseMapLoader component

interface CourseMapProps {
  courseProfile: CourseProfile;
  className?: string;
}

export default function CourseMap({ courseProfile, className = '' }: CourseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // Store map instance to prevent re-initialization
  const leafletMapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Dynamic import of Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths for webpack/Next.js
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (!mapRef.current) return;

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
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div
        ref={mapRef}
        className={`h-64 w-full rounded-lg overflow-hidden ${className}`}
        style={{ minHeight: 256 }}
      />
    </>
  );
}
