/**
 * 结果公示
 */
import { Card, Divider, message, SelectProps } from 'antd';
import * as React from 'react';
import AnnouncementComment from './components/comment';
import AnnouncementFilter from './components/filter';
import AnnouncementTable, { AnnouncementItem } from './components/table';
import * as api from '@/service/announcement';
import { useProcess } from '@/context/process-status';
import moment from 'moment';
import { useForm } from 'antd/lib/form/Form';

export interface IFilterFormValue {
  name?: string;
  student_id?: string;
  grade?: string;
  professional?: string;
  class?: number;
}

export interface IFilterSelectOptions {
    grade: SelectProps['options'];
    professional: SelectProps['options'];
    class: SelectProps['options'];
  }

/**
 * 班级公示、年级公示、最终结果公示
 */
const Announcement: React.FC = () => {
  const { process_id } = useProcess();
  const [announcementData, setAnnouncementData] = React.useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState<IFilterSelectOptions>({
    grade: [],
    professional: [],
    class: []
  })
  const [filterRef] = useForm<IFilterFormValue>();
  const filterTable = () => {
    const value: IFilterFormValue = filterRef.getFieldsValue(true);
    const list = announcementData.filter(item => [
      (value?.class === item.class) || (value?.class === undefined),
      (item.student_id.includes(value?.student_id || '')) || (value?.student_id === undefined),
      (value?.professional === item.professional) || (value?.professional === undefined),
      (item.name.includes(value?.name || '')) || (value?.name === undefined),
      (value?.grade === item.grade) || (value?.grade === undefined)
    ].every(v => v));
    setAnnouncementData(list);
  };

  const getFilterOptions = (list:AnnouncementItem[], key: "grade" | "class" | "professional") => {
    return [...new Set(list.map(item => item[key]))].map(item => ({
      label: item,
      value: item,
    }));
  }

  const loadAnnouncement = async () => {
    try {
      setLoading(true);
      const res = await api.getAnnouncement(process_id);
      const list = res.map(item => ({
        ...item,
        grade: moment(item.grade).format("YYYY")
      }));
      const gradeOpts = getFilterOptions(list, "grade");
      const classOpts = getFilterOptions(list, "class");
      const professionalOpts = getFilterOptions(list, "professional");
      setAnnouncementData(list || []);
      setFilterOptions({
        grade: gradeOpts,
        class: classOpts,
        professional: professionalOpts
      })
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
      <AnnouncementFilter filterOpt={filterOptions} filter={filterTable} formRef={filterRef} />
      <AnnouncementTable dataSource={announcementData} loading={loading} />
      <Divider orientation="left">评论区</Divider>
      <AnnouncementComment />
    </Card>
  )
}

export default Announcement;