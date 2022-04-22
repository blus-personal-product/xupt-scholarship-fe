import { Form, Input, InputNumber, Select } from 'antd';
import * as React from 'react';
import { StudentItem } from '..';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: StudentItem;
  index: number;
  children: React.ReactNode;
}

const StudentTypeOptions = [
  {
    label: '学硕',
    value: "bachelor_degree"
  },
  {
    label: '专硕',
    value: "profession_degree"
  }
]

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = dataIndex === 'type' ? <Select options={StudentTypeOptions} /> : (inputType === 'number' ? <InputNumber /> : <Input />);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )
      }
    </td>
  );
};


export default EditableCell;