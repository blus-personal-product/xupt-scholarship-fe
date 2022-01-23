/**
 * 登录注册表单组件
 */
import * as React from 'react';
import { Form, Input, Button, Checkbox, Spin, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import * as sign from '@/service/sign';

import style from './sign-form.module.less';


interface ISignFormProps {
  type: 'login' | 'register';
}

const LoginInitValue: sign.ILoginFormValue = {
  sign_id: '',
  password: '',
  remember: false,
};

const RegisterInitValue: sign.IRegisterFormValue = {
  sign_id: '',
  password: '',
  confirm_password: '',
};

const SignForm: React.FC<ISignFormProps> = (props) => {
  const { type } = props;
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);

  const submitForm = async () => {
    try {
      await form.validateFields();
      const formValue = form.getFieldsValue(true);
      setLoading(true);
      if (type === 'login') {
        await sign.postLogin(formValue);
      } else {
        await sign.postRegister(formValue);
      }
    } catch (error) {
      message.error("登陆失败");
    } finally {
      setLoading(false);
    }
  };

  const formInfo = type === 'login' ? {
    submitText: "登录",
    initValue: LoginInitValue
  }: {
    submitText: "注册",
    initValue: RegisterInitValue
  };

  return (
    <div className={style['sign-form']}>
      <Spin
        spinning={loading}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={formInfo.initValue}
        >
          <Form.Item
            label="邮箱"
            name="sign_id"
            required
            hasFeedback
            rules={[{
              type: "email",
              message: "请输入正确的邮箱格式"
            }]}
          >
            <Input
              placeholder="请输入您的邮箱"
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            hasFeedback
            required
            rules={[{
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: '密码为八位以上大小写字母和数字的组合',
            },]}
          >
            <Input.Password
              placeholder="请输入您的密码"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          {
            type === 'login' && (
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 12 }}
              >
                <Checkbox>下次登录的时候记住我</Checkbox>
              </Form.Item>
            )
          }
          {
            type === 'register' && (
              <Form.Item
                name="confirm_password"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "确认密码不能为空！！！",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message: '密码为八位以上大小写字母和数字的组合',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('确认密码和密码不一致！'));
                    },
                  }),
                ]}
                required
              >
                <Input.Password
                  placeholder="请再次输入您的密码"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            )
          }
          <Form.Item
            wrapperCol={{ offset: 10, span: 12 }}
          >
            <Button type="primary" onClick={submitForm}>
              {formInfo.submitText}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
};

SignForm.defaultProps = {
  type: 'login'
}

export default SignForm;

