import { Table, Popconfirm, Form, Typography, message, Button } from 'antd';
import * as React from 'react';
import style from '@/pages/upload-student-list/style.module.less';
import EditableCell from './components/editable-cell';
import Filter, { FilterFormValue } from './components/filter';
import { CloudUploadOutlined } from '@ant-design/icons';
import * as api from '@/service/upload';

interface IProps {
  tableData: StudentItem[];
  updateStudentData: (data: StudentItem[]) => void;
}

export interface StudentItem {
  id: number;
  name: string;
  student_id: string;
  gender: string;
  professional: string;
  course_credit: number;
  phone: string;
  email: string;
}

const StudentEditTable: React.FC<IProps> = (props) => {

  const { tableData, updateStudentData } = props;
  const [filterData, setFilterData] = React.useState<FilterFormValue>({
    name: '',
    student_id: '',
    professional: 'all',
  });

  const [form] = Form.useForm<StudentItem>();
  const [editingKey, setEditingKey] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [uploadIdList, setUploadIdList] = React.useState<number[]>([]);

  const isEditing = (record: StudentItem) => record.id === editingKey;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: StudentItem[]) => {
      setUploadIdList(selectedRowKeys as number[]);
    },
    getCheckboxProps: (record: StudentItem) => ({
      name: record.name,
    }),
  };

  const mergeData = React.useMemo(() => {
    if (filterData.name || (filterData.professional !== 'all') || filterData.student_id) {
      return tableData.filter(t => {
        let flag = true;
        if (filterData.name) {
          const searchName = filterData.name;
          flag = (searchName.includes(t.name) || t.name.includes(searchName));
        }
        if (flag && filterData.professional !== 'all') {
          flag = filterData.professional === t.professional;
        }
        if (flag && filterData.student_id) {
          const stu_ids = filterData.student_id;
          flag = (stu_ids.includes(t.student_id) || t.student_id.includes(stu_ids));
        }
        console.log(flag, t, filterData);
        return flag;
      })
    }
    return tableData;
  }, [tableData, filterData]);


  const professionOptions = React.useMemo(() => {
    const optionMap = new Map();
    return tableData.reduce((p, c) => {
      const isExist = optionMap.has(c.professional);
      if (!isExist) {
        p.push({
          label: c.professional,
          value: c.professional,
        });
        optionMap.set(c.professional, c.professional);
      }
      return p;
    }, [] as any);
  }, [tableData])

  const columns = React.useMemo(() => [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
      editable: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: '专业',
      dataIndex: 'professional',
      key: 'professional',
      editable: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      editable: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: '学位课加权平均成绩',
      dataIndex: 'course_credit',
      key: 'course_credit',
      editable: true,
      sorter: (a: any, b: any) => a.course_credit - b.course_credit,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_: any, record: StudentItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              <Button type="link">保存</Button>
            </Typography.Link>
            <Popconfirm
              title="确认取消编辑吗？"
              onConfirm={cancel}
            >
              <Button danger type="link">取消</Button>
            </Popconfirm>
          </span>
        ) : (
            <Typography.Link
              disabled={editingKey !== -1}
              onClick={() => edit(record)}
            >
              编辑
            </Typography.Link>
          );
      },
    },
  ], [editingKey]);

  const edit = (record: Partial<StudentItem>) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id || -1);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updateStudentData(newData);
        setEditingKey(-1);
      } else {
        newData.push(row);
        updateStudentData(newData);
        setEditingKey(-1);
      }
    } catch (errInfo) {
      message.error("保存表格数据失败");
    }
  };

  const mergedColumns = React.useMemo(() => columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: StudentItem) => ({
        record,
        inputType: col.dataIndex === 'course_credit' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  }), [columns]);

  const uploadStudentInfo = async () => {
    try {
      setLoading(true);
      const uploadList = tableData.filter(item => uploadIdList.includes(item.id));
      await api.postUpLoadStudentList(uploadList);
      const currList = tableData.filter(item => !uploadIdList.includes(item.id));
      updateStudentData(currList);
    } catch (error) {
      message.error("上传失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} component={false}>
      <Filter
        data={filterData}
        updateRules={setFilterData}
        options={professionOptions}
      />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        title={() => (
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            disabled={loading || (!tableData.length)}
            loading={loading}
            onClick={uploadStudentInfo}
          >上传</Button>
        )}
        rowSelection={{
          type: 'checkbox',
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
          ...rowSelection,
        }}
        className={style['student-table']}
        dataSource={mergeData}
        columns={mergedColumns as any[]}
      />
    </Form>
  )
};

export default StudentEditTable;