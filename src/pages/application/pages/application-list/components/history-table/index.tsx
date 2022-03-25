import * as React from 'react';
import { Table, Tag, Space, TableProps, Button, message } from 'antd';
import * as I from './interface';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import * as api from '@/service/apply';
import Style from '../../style.module.less';

const columns: TableProps<I.HistoryTableData>['columns'] = [
  {
    title: '表单ID',
    dataIndex: 'id',
    key: 'id',
  },
  // {
  //   title: '验证状态',
  //   dataIndex: 'validate_state',
  //   key: 'validate_state',
  //   render: (state: I.IValidateStatus) => <Tag>{I.TypesMap.get(state)}</Tag>
  // },
  {
    title: '处理状态',
    dataIndex: 'handle_state',
    key: 'handle_state',
    render: (state: I.IHandleStatus) => <Tag>{I.TypesMap.get(state)}</Tag>
  },
  {
    title: '创建时间',
    key: 'create_at',
    dataIndex: 'create_at'
  },
  {
    title: '更新时间',
    key: 'edit_at',
    dataIndex: 'edit_at',
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
  const [tableData, setTableData] = React.useState<I.HistoryTableData[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getTableData = async () => {
    try {
      setLoading(true);
      const applyList = await api.getApplicationList();
      const tableData: I.HistoryTableData[] = (applyList || []).map(item => ({
        key: item.id,
        id: item.id,
        create_at: item.create_at,
        edit_at: item.edit_at,
        handle_state: item.status,
      }));
      setTableData(tableData);
    } catch (error) {
      console.log(error);
      message.error("获取申请列表失败");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getTableData();
  }, []);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={tableData}
    />
  )
};

export default HistoryTable;