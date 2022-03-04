import * as React from 'react';
import { Space, Avatar, Image, Dropdown, Badge, Menu } from 'antd';
import PageNav from '../page-nav';

const UserControllers: React.FC = () => {
  const UserMenu = (
    <Menu>
      <Menu.Item danger key="login_out">退出</Menu.Item>
    </Menu>
  )
  return (
    <Space>
      <div>
        <Badge count={5}>
          <Avatar shape="square" />
        </Badge>
      </div>
      <div>
        <Dropdown overlay={UserMenu}>
          <Avatar>U</Avatar>
        </Dropdown>
      </div>
    </Space>
  );
};

export default UserControllers;