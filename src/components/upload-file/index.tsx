// 需要后端配置跨域以及进行Options的预连接请求处理
import * as api from '@/service/upload'
import { Form, FormItemProps, message, Upload } from 'antd';
import * as React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';

interface IProps extends React.PropsWithChildren<{}> {
  formProps?: FormItemProps;
}

interface IProps extends UploadProps<any> { }

const normFile: FormItemProps['getValueFromEvent'] = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UploadDragger: React.FC<IProps> = (props) => {
  const { children, formProps, ...resetProps } = props;
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const uploadFileList = async (list: UploadFile[]) => {
    try {
      const uploadList = await api.postUploadApplyFileList(list);
      const finishList = fileList.map((item, index) => ({
        ...item,
        status: 'success',
        url: uploadList[index],
        percent: 1,
      }));
      setFileList(finishList as any[]);
    } catch (error) {
      message.error("上传失败");
    } finally {

    }
  }
  React.useEffect(() => {
    if (
      fileList.some(item => item.status !== 'success')
    ) {
      const needLoadList = fileList.filter(item => item.status !== 'success' || item.url === "");
      uploadFileList(needLoadList);
    }
  }, [fileList]);
  return (
    <Form.Item
      valuePropName="fileList"
      getValueFromEvent={normFile}
      {...formProps}
    >
      <Upload.Dragger
        {...resetProps}
        beforeUpload={(_, uploadFileList) => {
          setFileList(uploadFileList);
          return false;
        }}
        multiple
        fileList={fileList}
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