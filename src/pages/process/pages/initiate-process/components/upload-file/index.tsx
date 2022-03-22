import UploadDragger from '@/components/upload-dragger';
import { Card, Form } from 'antd';
import * as React from 'react';
import { useLastForm } from '../../hooks/use-last-form';

const initFormValue = {
  files: []
}

const UploadFile: React.FC = () => {
  const [form, onValuesChange] = useLastForm('upload');
  return (
    <Card
      type="inner"
      title="上传支持预览的文件"
      headStyle={{
        fontWeight: 600
      }}
      hoverable
    >
      <Form
        form={form}
        initialValues={initFormValue}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="files"
        >
          <UploadDragger />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UploadFile;