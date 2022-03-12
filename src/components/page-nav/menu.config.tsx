import { AppstoreTwoTone, AreaChartOutlined, CloudTwoTone, ContainerOutlined, ContainerTwoTone, FormOutlined, InteractionTwoTone, SwapOutlined, ToolTwoTone } from "@ant-design/icons";
import { Menu } from "antd";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface IMenu {
  key: string;
  title: string;
  path: string;
  icon?: ReactNode;
  type?: 'group' | 'sub_menu';
  children?: IMenu[];
}

export const getMenus = (): IMenu[] => [
  {
    key: 'home',
    path: '/',
    title: '个人面板',
    icon: <AppstoreTwoTone />
  },
  {
    key: 'apply',
    path: '/apply',
    title: '申请奖学金',
    icon: <ContainerTwoTone />,
    children: [
      {
        key: 'form',
        path: '/form',
        title: '发起申请',
        icon: <FormOutlined />
      },
      {
        key: 'progress',
        path: '',
        title: '申请进度',
        icon: <SwapOutlined />
      }
    ]
  },
  {
    key: 'process',
    path: '/process',
    title: '评定流程',
    icon: <InteractionTwoTone />,
    children: [
      {
        key: 'handle',
        path: '',
        title: '流程管理/查看',
        icon: <AreaChartOutlined />
      },
      {
        key: 'initiate',
        path: '/initiate-process',
        title: '发起评定流程',
        icon: <ContainerOutlined />,
      },
    ]
  },
  {
    key: 'upload',
    path: '/upload',
    title: '上传学生名单',
    icon: <CloudTwoTone />,
  },
  {
    key: 'user',
    path: '/user',
    title: "用户中心",
    icon:  <ToolTwoTone />,
  }
];

/**
 * 获取key对应的title
 * @param searchKey 
 * @param menus 
 */
export const getTitle = (searchKeys: string[], menus: IMenu[]): string[] => {
  let tempChildMenus: IMenu[] = [];
  return searchKeys.map((key, index) => {
    if (index === 0) {
      const matched = menus.find(item => item.key === key);
      tempChildMenus = matched?.children || [];
      return matched?.title || '';
    }
    return tempChildMenus.find(item => item.key === key)?.title || '';
  })
}

export const renderMenu = (menus: IMenu[]) => {
  return menus.map(menu => {
    if (menu.children) {
      return (
        <Menu.SubMenu key={menu.key} title={menu.title} icon={menu.icon} >
          {
            menu.children.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`${menu.path}${item.path}`}>{item.title}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={menu.key} icon={menu.icon}>
        <Link to={menu.path || '/'}>{menu.title}</Link>
      </Menu.Item>
    )
  });
}

export const getMatchedKeys = (pathname: string, menus: IMenu[]) => {
  const keys: string[] = [];
  const pathNames = pathname.split('/').filter(v => !!v);
  const key = menus.find(menu => {
    if (menu.path === `/${pathNames[0]}`) {
      if (menu.children) {
        const childKey = menu.children.find(item => item.path === (pathNames[1] ? `/${pathNames[1]}` : ''))?.key || '';
        keys.push(menu.key, childKey);
        return true;
      }
      return true;
    }
    return false;
  })?.key || 'home';

  return !!keys.length ? keys : [key];
}