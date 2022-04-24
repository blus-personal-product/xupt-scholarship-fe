import * as React from 'react';
import { Table, Tag, TableProps, Button, message, Drawer } from 'antd';
import * as I from './interface';
import { EditTwoTone } from '@ant-design/icons';
import * as api from '@/service/apply';
import { useProcess } from '@/context/process-status';
import ApplicationForm from '@/pages/application/pages/application-form';
import ScoreForm from './score-form';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

const getColumns = (
  identity: IUser['identity'],
  changeEditForm: (id: number) => void
): TableProps<I.HistoryTableData>['columns'] => [
    {
      title: '表单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '当前状态',
      dataIndex: 'handle_state',
      key: 'handle_state',
      render: (state: I.IHandleStatus) => <Tag color={state === 'submit' ? 'success' : 'geekblue'}>{I.TypesMap.get(state)}</Tag>
    },
    {
      title: '学号',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '最近评审人工号',
      dataIndex: 'comment_user',
      key: 'comment_user',
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
        record.editable && identity !== 'manager' ? (
          <Link to={`/apply/form/${record.id}`} state={{
            showScore: true,
          }}>
            <Button
              shape="round"
              icon={<EditTwoTone />}
            >
              修改评分
          </Button>
          </Link >
        ) : (
            <Button
              type="dashed"
              shape="round"
              onClick={() => changeEditForm(record.id)}
              icon={<EditTwoTone />}
            >审核</Button>
          )
      ),
    },
  ];


const HistoryTable: React.FC = () => {
  const { user } = useAuth();
  const [tableData, setTableData] = React.useState<I.HistoryTableData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(-1);
  const { process_id } = useProcess();

  const commentApplyForm = (id: number) => {
    setVisible(true);
    setSelectedId(id)
  }

  const onCloseForm = () => {
    setVisible(false);
    setSelectedId(-1);
  };

  const columns = React.useMemo(() => getColumns(user.identity, commentApplyForm), [user.identity, commentApplyForm])

  const getTableData = async () => {
    try {
      setLoading(true);
      const applyList = await api.getApplicationList({
        page_count: 10,
        page_index: 1,
        is_check: user.identity,
        procedure_id: process_id
      });
      const tableData: I.HistoryTableData[] = (applyList || []).map(item => ({
        key: item.id,
        id: item.id,
        create_at: item.create_at,
        edit_at: item.edit_at,
        handle_state: item.status,
        score_info: item.score_info,
        score: item.score,
        user_id: item.user_id,
        comment_user: item.step.user_id,
        editable: item.editable,
      }));
      setTableData(tableData);
    } catch (error) {
      console.log(error);
      message.error("获取申请列表失败");
    } finally {
      setLoading(false);
    }
  }

  const selectedInfo = React.useMemo(() => tableData.find(item => item.id === selectedId), [tableData, selectedId]);


  React.useEffect(() => {
    getTableData();
  }, []);

  return (
    <React.Fragment>
      <Drawer
        onClose={onCloseForm}
        visible={visible}
        width={992}
        headerStyle={{
          height: 48,
          padding: 20
        }}
        bodyStyle={{
          padding: '16px 8px'
        }}
        footer={
          <ScoreForm applyId={selectedId} initValue={selectedInfo?.score_info} />
        }
        footerStyle={{
          height: 80,
        }}
      >
        <ApplicationForm commentApplyId={selectedId} />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={tableData}
      />
    </React.Fragment>
  )
};

export default HistoryTable;