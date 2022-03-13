/**
 * 登录注册表单组件
 */
import * as React from 'react';
import * as ahooks from 'ahooks';
import { Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '@/utils/storage';
import * as sign from '@/service/user/sign';

import style from './sign-form.module.less';
import { AUTH_CODE, EXPIRED_TIME } from '@/config/auth';


export interface ISignFormProps {
  type: 'login' | 'register';
  setLoading: (status: boolean) => void;
}

const LoginInitValue: sign.ILoginFormValue = {
  email: '',
  password: '',
};

const RegisterInitValue: sign.IRegisterFormValue = {
  email: '',
  password: '',
  confirm_password: '',
};

const SignForm: React.FC<ISignFormProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, setLoading } = props;
  const [form] = Form.useForm();
  const fromPath = (location as any).state?.from?.pathname || "/";

  const { run: submitForm } = ahooks.useDebounceFn(async () => {
    await form.validateFields();
    try {
      const formValue = form.getFieldsValue(true);
      setLoading(true);
      let currentCode = '';
      if (type === 'login') {
        currentCode = await sign.postLogin(formValue);
      } else {
        currentCode = await sign.postRegister(formValue);
      }
      storage.set({
        key: AUTH_CODE,
        value: currentCode,
        expired: EXPIRED_TIME,
      });
      navigate(fromPath, { replace: true });
    } catch (error) {
      message.error("登陆失败");
    } finally {
      setLoading(false);
    }
  }, {
    wait: 500
  });

  const formInfo = type === 'login' ? {
    submitText: "登录",
    submitTextEN: "Login",
    initValue: LoginInitValue
  } : {
      submitTextEN: "Register",
      submitText: "注册",
      initValue: RegisterInitValue
    };

  React.useEffect(() => {
    return () => setLoading(false);
  })

  return (
    <div className={style['sign-form']}>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        requiredMark={false}
        initialValues={formInfo.initValue}
      >
        <Form.Item
          label="邮箱"
          name="email"
          required
          hasFeedback
          rules={[{
            type: "email",
            required: true,
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
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            required: true,
            message: type === 'login' ? '密码长度需为8-16位，大写字母、小写字母以及数字组成' : '密码由大写字母、小写字母以及数字组成',
          },]}
        >
          <Input.Password
            placeholder="请输入您的密码"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
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
          <button
            onClick={submitForm}
            className="custom-btn btn-12"
          >
            <span>{formInfo.submitTextEN}</span>
            <span>{formInfo.submitText}</span>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

SignForm.defaultProps = {
  type: 'login'
}

export default SignForm;

