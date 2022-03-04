import * as React from 'react';
import { getMenus, getMatchedKeys, renderMenu, getTitle } from './menu.config';
import { Layout, Menu, MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';
import * as hooks from '@/hooks'
import style from './style.module.less';


interface IProps {
  updateCrumbTitle: React.Dispatch<React.SetStateAction<string[]>>;
}

const PageNav: React.FC<IProps> = (props) => {
  const { updateCrumbTitle } = props;
  const { pathname } = useLocation();

  const menus = React.useMemo(() => getMenus(), []);
  const matchKeys = React.useMemo(() => getMatchedKeys(pathname, menus), [menus, pathname]);
  const [selectKeys, setSelectedKeys] = React.useState<string[]>(!!matchKeys.length ? matchKeys : ['home']);
  const titleList = React.useMemo(() => getTitle(selectKeys, menus), [menus, selectKeys,]);
  hooks.useDocumentTitle(titleList.join('-'), [titleList]);

  const updateKeys: MenuProps['onClick'] = (e) => {
    setSelectedKeys(e.keyPath)
  }
  // 避免初始化进入导致的页面导航不匹配
  React.useEffect(() => {
    if (matchKeys && matchKeys.join('/') !== selectKeys.join('/')) {
      setSelectedKeys([...matchKeys]);
    }
  }, [matchKeys]);

  React.useEffect(() => {
    updateCrumbTitle(titleList);
  },[titleList]);

  return (
    <Layout.Sider
      collapsible
      theme="light"
      breakpoint="lg"
      className={style['sider-nav']}
    >
      <Menu
        mode="inline"
        selectedKeys={selectKeys}
        onClick={updateKeys}
        theme="light"
        className={style['page-menu']}
      >
        {
          renderMenu(menus)
        }
      </Menu>
    </Layout.Sider>
  )
};

export default PageNav;