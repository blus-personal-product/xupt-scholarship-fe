import { useAuth } from '@/context/auth.context';
import { Card } from 'antd';
import * as React from 'react';
import UserInfo from './components/user-info';

export interface IUserInfo extends IUser {

}

const UserCenter: React.FC = () => {
  const { user } = useAuth();
  const detailInfo: IStudentInfo = {
    professional: "软件工程",
    grade: 2018,
    class: 6,
    college: "计算机学院"
  }
  return (
    <Card>
      <UserInfo baseInfo={user} detailInfo={detailInfo} />
    </Card>
  )
};

export default UserCenter;