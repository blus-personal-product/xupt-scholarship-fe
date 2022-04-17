import { Layout, Space } from 'antd';
import * as React from 'react';
import UserControllers from '../user-controlers';
import style from './style.module.less';

interface IProps {
}

export const HeaderAvatarTitle: React.FC = () => (
  <a
    className={style['header-left-box']}
  >
    <img
      className={style['header-icon']}
      src="/logo.svg" alt="logo" />
    <h1
      className={style['header-title']}
    >
      西安邮电大学研究生奖学金系统
        </h1>
  </a>
)

const Header: React.FC<IProps> = (props) => {
  return (
    <Layout.Header
      className={style['header']}
    >
      <HeaderAvatarTitle />
      <UserControllers />
    </Layout.Header>
  );
};

export default Header;