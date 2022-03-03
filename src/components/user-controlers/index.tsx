import * as React from 'react';
import { Space, Avatar, Image, Dropdown, Badge } from 'antd';
import PageNav from '../page-nav';

const UserControllers: React.FC = () => {
  return (
    <Space>
      <div>
        <Badge count={5}>
          <Avatar shape="square" size="large" />
        </Badge>
      </div>
      <div>
        <Dropdown overlay={<PageNav />}>
          <Avatar>U</Avatar>
        </Dropdown>
      </div>
    </Space>
  );
};

export default UserControllers;