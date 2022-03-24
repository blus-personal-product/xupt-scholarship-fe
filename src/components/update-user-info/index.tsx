import { Button, Form, Input, message, Upload } from 'antd';
import { validateMessages } from '@/config/form';
import * as React from 'react';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import style from './style.module.less';
import * as uploadApi from '@/service/upload';
import * as userApi from '@/service/user';

export interface CompleteUserInfoValue {
  avatar: string;
  name: string;
  phone: string;
  user_id: string;
}


interface IProps {
  formValue: CompleteUserInfoValue;
}

const UploadUserInfo: React.FC<IProps> = (props) => {
  const { formValue } = props;
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = React.useState(formValue.avatar);
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<any>(null);
  const uploadAvatarImg = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const url = await uploadApi.postAvatar(file);
      setImgUrl(`http://127.0.0.1:8096${url}`)
      message.success("上传成功");
    } catch (error) {
      message.error("上传失败");
    } finally {
      setLoading(false);
    }
  }

  const updateUserInfo = async () => {
    try {
      setLoading(true);
      const value = await form.validateFields();
      await userApi.postUpdateUserInfo({
        avatar: imgUrl,
        ...value
      });
      message.success("完善个人信成功");
      // location.reload();
    } catch (error) {
      message.error("完善个人信息失败");
    } finally {
      setLoading(false);
    }
  }

  React.useMemo(() => {
    uploadAvatarImg();
  }, [file]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <UserOutlined />}
      <div className={style['upload-avatar-text']}>上传头像</div>
    </div>
  );

  return (
    <Form
      form={form}
      validateMessages={validateMessages}
      labelAlign="left"
      {
      ...{
        labelCol: { span: 6, offset: 2 },
        wrapperCol: { span: 12 },
      }
      }
    >
      <Upload
        listType="picture-card"
        showUploadList={false}
        className={style['upload-avatar-box']}
        maxCount={1}
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
      >
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Form.Item
        name="name"
        label="姓名"
      >
        <Input placeholder="请输入你的姓名" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="手机号"
      >
        <Input type="tel" placeholder="请填写你的常用手机号" />
      </Form.Item>
      <Form.Item
        name="user_id"
        label="学号/工号"
      >
        <Input placeholder="请输入您的学号/工号" />
      </Form.Item>
      <Button
        type="primary"
        block
        loading={loading}
        disabled={loading}
        onClick={updateUserInfo}
        className={style['submit-btn']}
      >更新个人信息</Button>
    </Form >
  );
};

UploadUserInfo.defaultProps = {
  formValue: {
    avatar: '',
    name: '',
    phone: '',
    user_id: '',
  }
}

export default React.memo(UploadUserInfo);