/**
 * 结果公示
 */
import { Card, Divider, message, SelectProps } from 'antd';
import * as React from 'react';
import AnnouncementComment from './components/comment';
import AnnouncementFilter, { IShipType, ITableShowTag } from './components/filter';
import AnnouncementTable, { AnnouncementItem, getColumns } from './components/table';
import * as api from '@/service/announcement';
import { useProcess } from '@/context/process-status';
import moment from 'moment';
import { useForm } from 'antd/lib/form/Form';
import downloadFileToExcel from '@/utils/xlsx-download';
import { useAuth } from '@/context/auth.context';
import { ShowResultList } from '../process/pages/handle-process/process.list';

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
  const { user } = useAuth();
  const { process_id, step } = useProcess();
  const [announcementData, setAnnouncementData] = React.useState<AnnouncementItem[]>([]);
  const [filterData, setFilterData] = React.useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState<IFilterSelectOptions>({
    grade: [],
    professional: [],
    class: []
  });
  const [selectTags, setSelectTags] = React.useState<ITableShowTag[]>([]);
  const handleChange = (tag: ITableShowTag, checked: boolean) => {
    if (checked) {
      const addTags = [...selectTags, tag];
      setSelectTags(addTags);
    } else {
      const delTags = selectTags.filter(v => v !== tag);
      setSelectTags(delTags);
    }
  }
  const [filterRef] = useForm<IFilterFormValue>();

  const getTagSelectedStatus = (ship_type: IShipType) => {
    const tags = (selectTags as any).filter((v: string) => !['only_score', 'only_course_credit'].includes(v))
    return (!!tags.length) || selectTags.includes(ship_type);
  }

  const filterTable = () => {
    const value: IFilterFormValue = filterRef.getFieldsValue(true);
    const list = announcementData.filter(item => [
      (value?.class === item.class) || (value?.class === undefined),
      (item.student_id.includes(value?.student_id || '')) || (value?.student_id === undefined),
      (value?.professional === item.professional) || (value?.professional === undefined),
      (item.name.includes(value?.name || '')) || (value?.name === undefined),
      (value?.grade === item.grade) || (value?.grade === undefined),
      ((!item?.ship_type) || getTagSelectedStatus(item?.ship_type as any))
    ].every(v => v));
    setFilterData(list);
  };

  const getFilterOptions = (list: AnnouncementItem[], key: "grade" | "class" | "professional") => {
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
      setFilterData(list || []);
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

  const download = () => {
    const columns = getColumns(step as any).reduce((p, c: any) => {
      p.filter.push(c.dataIndex);
      p.header.push(c.title);
      return p;
    }, {
      header: [],
      filter: [],
    } as {
      header: string[];
      filter: string[];
    });
    downloadFileToExcel({
      fileName: `${moment().format("YYYY")}年奖学金公示结果`,
      sheetName: "奖学金",
      sheetData: announcementData,
      sheetFilter: columns.filter,
      sheetHeader: columns.header
    })
  }


  React.useEffect(() => {
    const show = [
      user.identity === 'student' && step && ShowResultList.includes(step),
      user.identity === 'manager' || user.identity === 'student,manager',
    ];
    if (show.some(v => v)) {
      loadAnnouncement();
    };
  }, [process_id, step, user.identity])

  return (
    <Card>
      <AnnouncementFilter
        filterOpt={filterOptions}
        filter={filterTable}
        formRef={filterRef}
        tagChange={handleChange}
        selectTags={selectTags}
        download={download}
      />
      <AnnouncementTable selectTags={selectTags} dataSource={filterData} loading={loading} />
      <Divider orientation="left">评论区</Divider>
      <AnnouncementComment />
    </Card>
  )
}

export default Announcement;