import { Form, Input } from 'antd';
import * as React from 'react';
import { useLastForm } from '../../hooks/use-last-form';

const NoticeMember: React.FC = () => {
  const [form, onValuesChange] = useLastForm('notice');
  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="通知成员"
        
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default NoticeMember;