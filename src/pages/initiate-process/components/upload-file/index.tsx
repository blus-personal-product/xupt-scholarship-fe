import UploadDragger from '@/components/upload-dragger';
import { Form } from 'antd';
import * as React from 'react';
import { useLastForm } from '../../hooks/use-last-form';

const UploadFile: React.FC = () => {
  const [form, onValuesChange] = useLastForm('upload');
  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="通知成员"
      >
        <UploadDragger />
      </Form.Item>
    </Form>
  );
};

export default UploadFile;