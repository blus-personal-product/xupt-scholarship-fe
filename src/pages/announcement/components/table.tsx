import * as React from 'react';
import { Table, } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export type AnnouncementItem = {
  id: number;
  moral: number;
  academic: number;
  practice: number;
  course_credit: number;
  score: number;
  name: string;
  student_id: string;
  college: string;
  professional: string;
  grade: string;
  class: number;
}

interface IProps {
  dataSource: AnnouncementItem[];
  loading: boolean;
}

const columns: ColumnsType<AnnouncementItem> = [
  {
    dataIndex: 'id',
    title: '申请ID',
    key: 'id',
  },
  {
    dataIndex: 'name',
    title: '姓名',
    key: 'name',
  },
  {
    dataIndex: 'student_id',
    title: '学号',
    key: 'student_id',
  },
  {
    dataIndex: 'grade',
    title: '年级',
    key: 'grade'
  },
  {
    dataIndex: 'score',
    title: '总分',
    key: 'score',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.score - b.score,
  },
  {
    dataIndex: 'course_credit',
    title: '学业课加权成绩',
    key: 'course_credit',
    sorter: (a, b) => a.course_credit - b.course_credit,
  },
  {
    dataIndex: 'moral',
    title: '思想品德成绩',
    key: 'moral',
    sorter: (a, b) => a.moral - b.moral,
  },
  {
    dataIndex: 'practice',
    title: '实践活动成绩',
    key: 'practice',
    sorter: (a, b) => a.practice - b.practice,
  },
  {
    dataIndex: 'academic',
    title: '学术成绩',
    key: 'academic',
    sorter: (a, b) => a.academic - b.academic,
  },
]

const AnnouncementTable: React.FC<IProps> = (props) => {
  const { dataSource, loading } = props;
  return (
    <Table loading={loading} bordered columns={columns} dataSource={dataSource} />
  )
};

export default AnnouncementTable;