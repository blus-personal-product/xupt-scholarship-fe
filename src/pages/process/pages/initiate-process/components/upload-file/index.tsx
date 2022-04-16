import UploadDragger from '@/components/upload-file';
import { Card, Form } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import useDisabled from '../../hooks/use-disabled';
import { useLastForm } from '../../hooks/use-last-form';

export interface UploadFormValue {
  files: UploadFile[];
}

const uploadFormValue = {
  files: []
}

const UploadFile: React.FC = () => {
  const [form, onValuesChange] = useLastForm('upload');
  const formDisabled = useDisabled();
  return (
    <Card
      type="inner"
      title="流程以及评定依据相关文件"
      style={{
        margin: '0 96px',
      }}
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
          <UploadDragger disabled={formDisabled} />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UploadFile;