import { useAuth } from '@/context/auth.context';
import { Card } from 'antd';
import * as React from 'react';
import UserInfo from './components/user-info';

export interface IUserInfo extends IUser {

}

const UserCenter: React.FC = () => {
  return (
    <Card>
      <UserInfo />
    </Card>
  )
};

export default UserCenter;