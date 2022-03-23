import UploadDragger from '@/components/upload-dragger';
import { Card, Form } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import { useLastForm } from '../../hooks/use-last-form';

export interface UploadFormValue {
  files: UploadFile[];
}

const uploadFormValue = {
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
        initialValues={uploadFormValue}
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