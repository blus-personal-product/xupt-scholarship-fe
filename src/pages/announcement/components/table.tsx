import * as React from 'react';
import { Table, Tag, } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { IShipType, ITableShowTag } from './filter';
import { ProcessStep } from '@/pages/process/pages/handle-process/process.list';
import { useProcess } from '@/context/process-status';

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
  ship_type: string;
}

interface IProps {
  dataSource: AnnouncementItem[];
  loading: boolean;
  selectTags: ITableShowTag[];
}

export const getColumns = (step: ProcessStep): ColumnsType<AnnouncementItem> => [
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
    dataIndex: 'professional',
    title: '专业',
    key: 'professional',
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
  {
    dataIndex: 'ship_type',
    title: '奖学金类型',
    key: 'ship_type',
    render: (_, record) => renderShipType(record.ship_type as any, step)
  },
];

const renderShipType = (ship_type: IShipType, step?: ProcessStep) => {
  const colorMap: Record<IShipType, { label: string; color: string }> = {
    first: {
      label: "一等奖",
      color: "geekblue",
    },
    second: {
      label: "二等奖",
      color: "cyan",
    },
    third: {
      label: "三等奖",
      color: "blue"
    },
    national: {
      label: "国家奖学金",
      color: "volcano"
    },
    inspirational: {
      label: "励志奖学金",
      color: "lime"
    }
  };
  if (step !== 'finish') {
    return <Tag>尚未公布</Tag>
  }
  if (!ship_type) {
    return <Tag>未入选</Tag>
  } else {
    return <Tag color={colorMap[ship_type].color}>{colorMap[ship_type].label}</Tag>
  }
}

const AnnouncementTable: React.FC<IProps> = (props) => {
  const { dataSource, loading, selectTags } = props;
  const { step } = useProcess();
  const columns = React.useMemo(() => getColumns(step as any), [step]);

  const filterColumns = React.useMemo(() =>
    columns.filter(item => {
      if (selectTags.includes('only_course_credit')) {
        return !['moral', 'practice', 'academic'].includes(item.key as any);
      }
      if (selectTags.includes('only_score')) {
        return !['course_credit', 'moral', 'practice', 'academic'].includes(item.key as any);
      }

      if (selectTags.includes('only_score') && selectTags.includes('only_course_credit')) {
        return !['moral', 'practice', 'academic'].includes(item.key as any);
      }

      return true;
    })
    , [selectTags, columns]);
  return (
    <Table loading={loading} bordered columns={filterColumns} dataSource={dataSource} />
  )
};

export default AnnouncementTable;