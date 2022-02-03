/**
 * Auth Provider
 * 登录权限控制
 * 对于权限不足的页面返回登录页
 */
import * as React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export interface AuthContextType {
  user: IUser;
  signIn: (data: IUser, fromPath?: string) => void;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);


export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const signPagePath = "/sign";
  const dashboardPage = "/";

  const navigate = useNavigate();
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const signIn: AuthContextType['signIn'] = (data, fromPath) => {
    setUser(data);
    navigate(fromPath ?? dashboardPage, { replace: true });
  };
  const signOut: AuthContextType['signOut'] = () => {
    setUser({} as IUser);
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
      {props.children}
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
  // const { user } = useAuth();
  // const location = useLocation();
  // if (!user.email) {
  //   return <Navigate to="/sign" state={{ from: location }} replace />
  // }
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};