import client from '@/client';
import { AnnouncementItem } from '@/pages/announcement/components/table';

export const getAnnouncement = (processId: number) => {
  return client.get<AnnouncementItem[]>(`/announcement/${processId}`);
};