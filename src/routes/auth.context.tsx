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
  const getUserInfo = async () => {
    try {
      setLoading(true);
      const userInfo = await api.getUserInfo();
      console.log(userInfo);
      setUser(userInfo);
    } catch (error) {
      message.error("获取当前登录用户信息失败");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if ((!NotNeedAuthList.includes(pathname) && (!user.email))) {
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
  const signOut: AuthContextType['signOut'] = () => {
    setUser({} as IUser);
    storage.del({ key: AUTH_CODE });
    navigate(signPagePath, { replace: true });
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

/**
 * 需要验证的页面
 * @param props children
 */
export const RequireAuth: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const { user } = useAuth();
  const code = storage.get({ key: AUTH_CODE, flag: false });
  const location = useLocation();
  if ((!user.email) && (!code)) {
    return <Navigate to="/sign" state={{ from: location }} replace />
  }
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};