import * as React from 'react';
import { Space, Avatar, Dropdown, Badge, Menu, Popover, List } from 'antd';
import { BellOutlined, LoginOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined, } from '@ant-design/icons';
import style from './style.module.less';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const UserControllers: React.FC = () => {
  const UserMenu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="user-center">用户中心</Menu.Item>
      <Menu.Item icon={<LoginOutlined />} danger key="login_out">退出登录</Menu.Item>
    </Menu>
  );

  const NoticeList = (
    <List
      size="large"
      bordered={true}
      dataSource={data}
      className={style['notice-list']}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  )

  return (
    <Space align="center">
      <div className={style['control-box']}>
        <SearchOutlined className={style['control-icon']} />
      </div>
      <Dropdown overlay={NoticeList} placement="bottomLeft">
        <div className={style['control-box']}>
          <Badge count={data.length}>
            <BellOutlined className={style['control-icon']} />
          </Badge>
        </div>
      </Dropdown>

      <div className={style['control-box']}>
        <QuestionCircleOutlined className={style['control-icon']} />
      </div>
      <Dropdown overlay={UserMenu}>
        <div className={style['control-box']}>
          <Avatar size={28} className={style['user-avatar']}>U</Avatar>
          <span></span>
        </div>
      </Dropdown>
    </Space>
  );
};

export default UserControllers;