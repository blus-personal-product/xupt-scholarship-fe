// 需要后端配置跨域以及进行Options的预连接请求处理
import { DraggerProps } from 'antd/lib/upload';
import { Form, FormItemProps, message, Upload } from 'antd';
import * as React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { AUTH_CODE } from '@/config/auth';
import storage from '@/utils/storage';

const dragProps = (): DraggerProps => {
  const authCode = storage.get({ key: AUTH_CODE, flag: false });
  return {
    name: 'file',
    multiple: true,
    method: "POST",
    action: 'http://127.0.0.2:8096/upload',
  };
};

interface IProps extends React.PropsWithChildren<{}> {
  formProps?: FormItemProps;
}

const normFile: FormItemProps['getValueFromEvent'] = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UploadDragger: React.FC<IProps> = (props) => {
  const { children, formProps } = props;
  const [fileList, setFileList] = React.useState<UploadFile[]>([])
  const onChange: DraggerProps['onChange'] = (info) => {
    const { status } = info.file;
    const tempFileList = info.fileList;
    if (status === 'done') {
      tempFileList.forEach(file => {
        file.url = file.response?.data;
      })
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList([...tempFileList]);
  }
  return (
    <Form.Item
      valuePropName="fileList"
      getValueFromEvent={normFile}
      {...formProps}
    >
      <Upload.Dragger
        {...dragProps()}
        fileList={fileList}
        onChange={onChange}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        {children}
      </Upload.Dragger>
    </Form.Item>
  );
};

UploadDragger.defaultProps = {
  formProps: {
    noStyle: true
  }
}

export default UploadDragger;