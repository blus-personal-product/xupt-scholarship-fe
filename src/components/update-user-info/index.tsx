import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Upload } from 'antd';
import { disabledFormFeatureYear, requiredRule, validateMessages } from '@/config/form';
import * as React from 'react';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import style from './style.module.less';
import * as uploadApi from '@/service/upload';
import * as userApi from '@/service/user';
import { useAuth } from '@/context/auth.context';
import { use } from 'echarts';
import moment from 'moment';

export interface CompleteUserInfoValue {
  avatar: string;
  name: string;
  phone: string;
  user_id: string;
  student?: IStudentInfo;
  manager?: IManagerInfo;
}

const StudentTypeOptions: {
  key: IStudentInfo['type'];
  value: IStudentInfo['type'];
  label: string;
}[] = [
    {
      label: "学硕",
      value: "bachelor_degree",
      key: "bachelor_degree"
    },
    {
      label: "专硕",
      value: "profession_degree",
      key: "profession_degree"
    }
  ]

interface IProps {
  formValue: CompleteUserInfoValue;
}

const StudentForm = () => (
  <Form.Item noStyle name="student">
    <Form.Item
      name={["student", "college"]}
      label="学院"
      rules={requiredRule}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={["student", "professional"]}
      label="专业"
      rules={requiredRule}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={["student", "grade"]}
      label="年级"
      rules={requiredRule}
    >
      <DatePicker picker="year" suffixIcon={"级"} disabledDate={disabledFormFeatureYear} />
    </Form.Item>
    <Form.Item
      name={["student", "class"]}
      label="班级"
      rules={requiredRule}
    >
      <InputNumber
        min={1}
        precision={0}
        addonAfter="班"
      />
    </Form.Item>
    <Form.Item
      name={["student", "type"]}
      label="硕士类型"
      rules={requiredRule}
    >
      <Radio.Group
        buttonStyle="solid"
        options={StudentTypeOptions}
        optionType="button"
      />
    </Form.Item>
  </Form.Item>
)

const ManagerForm = () => (
  <Form.Item noStyle name="manager">
    <Form.Item
      name={["manager", "department"]}
      label="部门/学院"
      rules={requiredRule}
    >
      <Input placeholder="部门" />
    </Form.Item>
    <Form.Item
      name={["manager", "office"]}
      label="办公室/组"
      rules={requiredRule}
    >
      <Input placeholder="办公室" />
    </Form.Item>
    <Form.Item
      name={["manager", "position"]}
      label="职位"
      rules={requiredRule}
    >
      <Input placeholder="职位" />
    </Form.Item>
  </Form.Item>
)

const UploadUserInfo: React.FC<IProps> = (props) => {
  const { formValue } = props;
  const [form] = Form.useForm();
  const { user } = useAuth();
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
      initialValues={{
        ...user,
        student: {
          ...user.student,
          grade: moment(user.student?.grade || undefined)
        }
      }}
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
        rules={requiredRule}
      >
        <Input placeholder="请输入你的姓名" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="手机号"
        rules={requiredRule}
      >
        <Input type="tel" placeholder="请填写你的常用手机号" />
      </Form.Item>
      <Form.Item
        name="user_id"
        label="学号/工号"
        rules={requiredRule}
      >
        <Input placeholder="请输入您的学号/工号" />
      </Form.Item>
      {
        user.identity === 'manager'
          ? <ManagerForm />
          : <StudentForm />
      }
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