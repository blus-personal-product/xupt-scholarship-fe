import http from '@/client'

export interface IUserItem {
  avatar: string;
  email: string;
  name: string;
  en: string;
}
/**
 * 获取提及用户列表
 */
export const getMentionUserList = () => {
  return http.get<IMentionUser[]>("/user/list");
}

export type IUserInfo = IUser;

export const getUserInfo = () => {
  return  http.get<IUserInfo>("/user");
}