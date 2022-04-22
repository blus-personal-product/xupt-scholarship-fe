/**
 * Auth Provider
 * 登录权限控制
 * 对于权限不足的页面返回登录页
 */
import * as React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import storage from '@/utils/storage';
import { AUTH_CODE } from '@/config/auth';
import * as api from '@/service/user/index';
import { getSignOut } from '@/service/user/sign';
import { message, Spin } from 'antd';

export interface AuthContextType {
  user: IUser;
  signIn: (fromPath?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

const signPagePath = "/sign";
const dashboardPage = "/";
const forgetPasswordPage = "/forget-password";
/**不需要验证和获取用户信息的页面 */
const NotNeedAuthList = [signPagePath, forgetPasswordPage];


export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [loading, setLoading] = React.useState(false);
  const code = storage.getStg(AUTH_CODE);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const userInfo = await api.getUserInfo();
      setUser(userInfo);
    } catch (error) {
      message.error("获取当前登录用户信息失败");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if ((!NotNeedAuthList.includes(pathname)) && (!user.email) && code) {
      getUserInfo();
    }
  }, [pathname])

  const signIn: AuthContextType['signIn'] = async (fromPath) => {
    try {
      await getUserInfo();
      navigate(fromPath ?? dashboardPage, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  const signOut: AuthContextType['signOut'] = async () => {
    try {
      navigate(signPagePath, { replace: true });
      await getSignOut()
    } catch (error) {
      console.error(error);
    } finally {
      setUser({} as IUser);
      storage.delStg(AUTH_CODE);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}
    >
      <Spin spinning={loading}>
        {props.children}
      </Spin>
    </AuthContext.Provider>
  )
};

/**
 * 获取权限信息
 */
export const useAuth = () => {
  return React.useContext(AuthContext);
};

/**管理员不可访问 */
const ManagerDisabledPage = ["/apply/form"];
const StudentDisabledPage = ["/upload"];
const StudentManagerDisabledPage: string[] = [];

/**
 * 需要验证的页面
 * @param props children
 */
export const RequireAuth: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const { user } = useAuth();

  const code = storage.getStg(AUTH_CODE);
  const location = useLocation();
  const { pathname } = location;
  const visible = [
    user.identity === "manager" && ManagerDisabledPage.includes(pathname),
    user.identity === "student" && StudentDisabledPage.includes(pathname),
    user.identity === "student,manager" && StudentManagerDisabledPage.includes(pathname)
  ].includes(true);
  if (visible) {
    message.warn("您没有查看该页面的权限");
    return <Navigate to="/" replace />
  }

  if ((!user.email) && (!code)) {
    return <Navigate to="/sign" state={{ from: location }} replace />
  }
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};