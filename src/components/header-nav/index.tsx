import * as React from 'react';
import { getMenus, IMenus, getTitle } from './menu.config';
import { Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import * as hooks from '@/hooks'

const { SubMenu } = Menu;

const renderMenuChildren = (menus: IMenus[]) => {
  return menus.map(menu => {
    return (
      <Menu.Item key={menu.key}>
        <Link to={menu.path || '/'}>{menu.title}</Link>
      </Menu.Item>
    )
  });
}

const HeaderNav: React.FC = () => {
  const { pathname } = useLocation();

  const Menus = React.useMemo(() => getMenus(), []);
  const matchKeys = React.useMemo(() => Menus.find(item => item.path === pathname)?.key, [Menus]);
  const [selectKeys, SetSelectedKeys] = React.useState<string[]>(['home' || matchKeys]);
  const title = React.useMemo(() => getTitle(selectKeys[0], Menus), [Menus, selectKeys]);
  
  hooks.useDocumentTitle(title, [title]);
  
  const updateKeys: MenuProps['onClick'] = (e) => {
    SetSelectedKeys(e.keyPath)
  }

  // 避免初始化进入导致的页面导航不匹配
  React.useEffect(() => {
    if (matchKeys && matchKeys !== selectKeys[0]) {
      SetSelectedKeys([matchKeys])
    }
  }, [])

  return (
    <React.Fragment>
      <Menu
        mode="horizontal"
        selectedKeys={selectKeys}
        onClick={updateKeys}
      >
        {
          renderMenuChildren(Menus)
        }
      </Menu>
    </React.Fragment>
  )
};

export default HeaderNav;