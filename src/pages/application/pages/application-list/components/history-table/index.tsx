import * as React from 'react';
import { Table, Tag, Space, TableProps, Button } from 'antd';
import * as I from './interface';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';

const columns: TableProps<I.HistoryTableData>['columns'] = [
  {
    title: '表单ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '处理状态',
    dataIndex: 'handle_state',
    key: 'handle_state',
    render: (state: I.IHandleStatus) => <Tag>{I.TypesMap.get(state)}</Tag>
  },
  {
    title: '验证状态',
    dataIndex: 'validate_state',
    key: 'validate_state',
    render: (state: I.IValidateStatus) => <Tag>{I.TypesMap.get(state)}</Tag>
  },
  {
    title: '更新时间',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link
          type="link"
          to={`/apply/form/${record.id}`}>
          <EditTwoTone />
        </Link>
        <Button
          type="link"
          danger
          icon={
            <DeleteOutlined />
          }
        />
      </Space>
    ),
  },
];


const HistoryTable: React.FC = () => {
  const [tableData, setTableData] = React.useState<I.HistoryTableData[]>([])
  return (
    <Table columns={columns} dataSource={tableData} />
  )
};

export default HistoryTable;