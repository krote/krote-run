import type { Announcement } from './types';
import announcementsData from '@/data/announcements.json';

export function sortAnnouncements(list: Announcement[]): Announcement[] {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getAnnouncements(): Announcement[] {
  return sortAnnouncements(announcementsData as Announcement[]);
}
