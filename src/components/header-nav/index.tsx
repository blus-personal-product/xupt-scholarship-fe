import * as React from 'react';
import { getMenus, IMenu, getTitle } from './menu.config';
import { Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import * as hooks from '@/hooks'
import style from './style.module.less';


const renderMenu = (menus: IMenu[]) => {
  return menus.map(menu => {
    if (menu.children) {
      return (
        <Menu.SubMenu key={menu.key} title={menu.title}>
          {
            menu.children.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={`${menu.path}${item.path}`}>{item.title}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={menu.key}>
        <Link to={menu.path || '/'}>{menu.title}</Link>
      </Menu.Item>
    )
  });
}

const getMatchedKeys = (pathname: string, menus: IMenu[]) => {
  const keys: string[] = [];
  const pathNames = pathname.split('/').filter(v => !!v);
  const key = menus.find(menu => {
    if (menu.path === `/${pathNames[0]}`) {
      if (menu.children) {
        const childKey = menu.children.find(item => item.path === (pathNames[1] ? `/${pathNames[1]}`: ''))?.key || '';
        keys.push(menu.key, childKey);
        return true;
      }
      return true;
    }
    return false;
  })?.key || 'home';

  return !!keys.length ? keys : [key];
}

const HeaderNav: React.FC = () => {
  const { pathname } = useLocation();

  const menus = React.useMemo(() => getMenus(), []);
  const matchKeys = React.useMemo(() => getMatchedKeys(pathname, menus), [menus, pathname]);
  const [selectKeys, setSelectedKeys] = React.useState<string[]>(!!matchKeys.length ? matchKeys : ['home']);
  const title = React.useMemo(() => getTitle(selectKeys[0], menus), [menus, selectKeys]);

  hooks.useDocumentTitle(title, [title]);

  const updateKeys: MenuProps['onClick'] = (e) => {
    setSelectedKeys(e.keyPath)
  }
  console.log(matchKeys, selectKeys)
  // 避免初始化进入导致的页面导航不匹配
  React.useEffect(() => {
    if (matchKeys && matchKeys.join('/') !== selectKeys.join('/')) {
      setSelectedKeys(matchKeys)
    }
  }, [])

  return (
    <Menu
      mode="horizontal"
      selectedKeys={selectKeys}
      onClick={updateKeys}
      theme="light"
      className={style['header-nav']}
    >
      {
        renderMenu(menus)
      }
    </Menu>
  )
};

export default HeaderNav;