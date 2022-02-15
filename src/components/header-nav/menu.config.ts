export interface IMenu {
  key: string;
  title: string;
  path: string;
  type?: 'group' | 'sub_menu';
  children?: IMenu[];
}

export const getMenus = (): IMenu[] => [
  {
    key: 'home',
    path: '/',
    title: '个人面板'
  },
  {
    key: 'apply',
    path: '/apply',
    title: '申请奖学金',
    children: [
      {
        key: 'form',
        path: '/form',
        title: '申请表单'
      },
      {
        key: 'progress',
        path: '',
        title: '申请列表'
      }
    ]
  }
];

/**
 * 获取key对应的title
 * @param searchKey 
 * @param menus 
 */
export const getTitle = (searchKey: string, menus: IMenu[]): string => 
  menus.find(item => item.key === searchKey)?.title || ''