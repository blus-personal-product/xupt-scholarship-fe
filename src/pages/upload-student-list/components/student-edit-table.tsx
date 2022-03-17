import { Table, TableColumnProps, TableProps } from 'antd';
import * as React from 'react';

interface IProps {
  tableData: any[];
}

interface StudentItem {
  id: number;
  name: string;
  student_id: string;
  gender: string;
  professional: string;
  course_credit: string;
}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '学号',
    dataIndex: 'student_id',
    key: 'student_id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '专业',
    dataIndex: 'professional',
    key: 'professional',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '学位课加权平均成绩',
    dataIndex: 'course_credit',
    key: 'course_credit',
  },
];

const tableProps: TableProps<StudentItem> = {
  columns: columns,
}

const StudentEditTable: React.FC<IProps> = (props) => {
  const { tableData } = props;
  return (
    <Table
      dataSource={tableData}
      {...tableProps}
    />
  )
};

export default StudentEditTable;