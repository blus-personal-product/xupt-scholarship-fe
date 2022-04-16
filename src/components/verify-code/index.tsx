import { LoadingOutlined, RedoOutlined } from '@ant-design/icons';
import { Input, Form, Spin, Space, FormInstance, message, Button } from 'antd';
import * as React from 'react';
import * as api from '@/service/captcha';
import style from './style.module.less';
import { requiredRule } from '@/config/form';

interface IProps {
  form: FormInstance;
  captchaCode: string | undefined;
  setCaptchaCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface IVerifyCodeData {
  code: string;
  input_code: string;
}

const VerifyCode: React.FC<IProps> = (props) => {
  const { form, captchaCode, setCaptchaCode } = props;
  
  const [loading, setLoading] = React.useState(false);

  const getCaptchaImg = async () => {
    try {
      setLoading(true);
        const code = await api.getCaptchaCode();
        setCaptchaCode(code);
    } catch (error) {
      setCaptchaCode(undefined);
      message.error("获取验证码图片失败")
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getCaptchaImg();
  }, []);

  return (
    <Form
      form={form}
      className={style['captcha-form']}
    >
      <div className={style['captcha-box']}>
        <div className={style['captcha-img']} >
          <img
            src={`http://127.0.0.1:8096/captcha/${captchaCode}-${Date.now()}.png`}
            alt="验证码"
          />
        </div>
        <Button
          loading={loading}
          size="large"
          className={style['captcha-reload-btn']}
          onClick={getCaptchaImg}
          icon={
            loading ? (<LoadingOutlined />) : (<RedoOutlined />)
          }
        >换一张</Button>
      </div>
      <Form.Item
        className={style['captcha-code-input']}
        name="verify_code"
        rules={requiredRule}
      >
        <Input placeholder="请输入验证码" />
      </Form.Item>
    </Form>
  );
};

export default VerifyCode;