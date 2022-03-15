/**
 * 登录注册表单组件
 */
import * as React from 'react';
import * as aHooks from 'ahooks';
import { Button, Form, Input, message, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import storage from '@/utils/storage';
import * as sign from '@/service/user/sign';
import { useAuth } from '@/routes/auth.context';
import * as verifyApi from '@/service/captcha/index';
import style from '@/pages/sign/style.module.less';
import { AUTH_CODE, EXPIRED_TIME } from '@/config/auth';
import VerifyCode from '@/components/verify-code';


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
  const { type, setLoading } = props;
  const [captchaCode, setCaptchaCode] = React.useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  const [verifyForm] = Form.useForm();
  const { signIn } = useAuth();
  const fromPath = (location as any).state?.from?.pathname || "/";

  const { run: submitForm } = aHooks.useDebounceFn(async () => {
    await form.validateFields();
    try {
      const verifyValue = verifyForm.getFieldsValue(true);
      const verifyRes = await verifyApi.postVerifyCaptchaCode({
        code: captchaCode || '',
        input_code: verifyValue.verify_code,
      });

      if (!verifyRes) {
        throw new Error("验证码错误");
      }
      const formValue = form.getFieldsValue(true);
      setLoading(true);
      let currentCode = '';
      if (type === 'login') {
        currentCode = await sign.postLogin(formValue);
      } else {
        currentCode = await sign.postRegister(formValue);
      }
      if (!currentCode) {
        throw new Error("获取登录凭证失败");
      }
      storage.set({
        key: AUTH_CODE,
        value: currentCode,
        expired: EXPIRED_TIME,
        flag: false,
      });
      await signIn(fromPath);
      message.success("登录成功");
    } catch (error) {
      message.error(error?.message || "登陆失败");
    } finally {
      setLoading(false);
    }
  }, {
    wait: 500
  });

  const formInfo = type === 'login' ? {
    submitText: "登录",
    initValue: LoginInitValue
  } : {
      submitText: "注册",
      initValue: RegisterInitValue
    };

  React.useEffect(() => {
    return () => setLoading(false);
  })

  return (
    <React.Fragment>
      <div className={style['sign-form']}>
        <Form
          form={form}
          requiredMark={false}
          initialValues={formInfo.initValue}
          layout="vertical"
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
          <VerifyCode
            form={verifyForm}
            captchaCode={captchaCode}
            setCaptchaCode={setCaptchaCode}
          />
          {
            type === 'login' && (
              <Form.Item>
                <div className={style['forget-password-label']}>
                  <Typography.Text type="secondary">初始密码：Jxj + 学号</Typography.Text>
                  <Link className={style['forget-password']} to="/forget-password">
                    <QuestionCircleOutlined className={style['forget-icon']} />
                      忘记密码
                    </Link>
                </div>
              </Form.Item>
            )
          }
          <Form.Item>
            <Button
              className={style['sign-submit-btn']}
              onClick={submitForm}
              block
              type="primary"
            >
              {formInfo.submitText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

SignForm.defaultProps = {
  type: 'login'
}

export default SignForm;

