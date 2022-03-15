import { IVerifyCodeData } from './../../components/verify-code/index';
import client from '@/client';

export const getCaptchaCode = async () => {
  return client.get<string>("/captcha");
}

export const postVerifyCaptchaCode = (params: IVerifyCodeData) => {
  return client.post<boolean>("/captcha/verify", params);
}

export const getReloadCaptchaCode = (code:string) => {
  return client.get<string>("/captcha/reload", {
    code: code,
  });
} 