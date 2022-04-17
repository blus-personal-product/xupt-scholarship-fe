import { ProcessStatus } from "@/context/process-status";
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
  blockList?: IUser['identity'][];

}

export const getMenus = (process_id: number): IMenu[] => [
  {
    key: 'home',
    path: '/',
    title: '个人面板',
    icon: <AppstoreTwoTone twoToneColor="rgba(57, 90, 255, 1)" />
  },
  {
    key: 'apply',
    path: '/apply',
    title: '申请奖学金',
    icon: <ContainerTwoTone twoToneColor="rgba(57, 90, 255, 1)" />,
    children: [
      {
        key: 'form',
        path: '/form',
        title: '发起/修改申请',
        blockList: ["manager"],
        icon: <FormOutlined twoToneColor="rgba(57, 90, 255, 1)" />
      },
      {
        key: 'progress',
        path: '',
        title: '申请进度',
        icon: <SwapOutlined twoToneColor="rgba(57, 90, 255, 1)" />
      }
    ]
  },
  {
    key: 'process',
    path: '/process',
    title: '评定流程',
    icon: <InteractionTwoTone twoToneColor="rgba(57, 90, 255, 1)" />,
    children: [
      {
        key: 'handle',
        path: '',
        title: '流程管理/查看',
        icon: <AreaChartOutlined twoToneColor="rgba(57, 90, 255, 1)" />
      },
      {
        key: 'initiate',
        path: '/initiate-process',
        title: process_id === -1 ? '发起评定流程' : '查看评定流程',
        // blockList: ["student", "student,manager"],
        icon: <ContainerOutlined twoToneColor="rgba(57, 90, 255, 1)" />,
      },
    ]
  },
  {
    key: 'upload',
    path: '/upload',
    title: '上传学生名单',
    blockList: ["student"],
    icon: <CloudTwoTone twoToneColor="rgba(57, 90, 255, 1)" />,
  },
  {
    key: 'user',
    path: '/user',
    title: "用户中心",
    icon: <ToolTwoTone twoToneColor="rgba(57, 90, 255, 1)" />,
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

export const renderMenu = (menus: IMenu[], identity: IUser['identity']) => {
  return menus.map(menu => {
    if (menu.children) {
      return (
        <Menu.SubMenu key={menu.key} title={menu.title} icon={menu.icon} >
          {
            menu.children.map((item) => (
              <Menu.Item key={item.key}
                disabled={(item.blockList || []).includes(identity)}
                icon={item.icon}
              >
                <Link to={`${menu.path}${item.path}`}>{item.title}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item
        disabled={(menu.blockList || []).includes(identity)}
        key={menu.key}
        icon={menu.icon}
      >
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