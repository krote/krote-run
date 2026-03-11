'use client';

import { useEffect, useRef } from 'react';
import type { CourseMapData } from '@/lib/types';

// NOTE: Import as dynamic with ssr:false to avoid SSR issues with Leaflet
// Usage in pages:
//   const CourseMap = dynamic(() => import('@/components/course/CourseMap'), { ssr: false })

interface CourseMapProps {
  courseMap: CourseMapData;
  className?: string;
}

export default function CourseMap({ courseMap, className = '' }: CourseMapProps) {
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

      const map = L.map(mapRef.current).setView(
        [courseMap.centerLat, courseMap.centerLng],
        courseMap.zoom,
      );
      leafletMapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add center marker
      L.marker([courseMap.centerLat, courseMap.centerLng]).addTo(map);
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
