/**
 * 结果公示
 */
import { Card, Divider, message } from 'antd';
import * as React from 'react';
import AnnouncementComment from './components/comment';
import AnnouncementFilter from './components/filter';
import AnnouncementTable, { AnnouncementItem } from './components/table';
import * as api from '@/service/announcement';
import { useProcess } from '@/context/process-status';

/**
 * 班级公示、年级公示、最终结果公示
 */
const Announcement: React.FC = () => {
  const { process_id } = useProcess();
  const [announcementData, setAnnouncementData] = React.useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const loadAnnouncement = async () => {
    try {
      setLoading(true);
      const res = await api.getAnnouncement(process_id);
      setAnnouncementData(res || []);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadAnnouncement();
  }, [process_id])

  return (
    <Card>
      <AnnouncementFilter />
      <AnnouncementTable dataSource={announcementData} loading={loading} />
      <Divider orientation="left">评论区</Divider>
      <AnnouncementComment />
    </Card>
  )
}

export default Announcement;