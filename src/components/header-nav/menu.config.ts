export interface IMenus {
  key: string;
  title: string;
  path?: string;
  type?: 'group' | 'sub_menu';
  children?: IMenus[];
}

export const getMenus = (): IMenus[] => [
  {
    key: 'home',
    path: '/',
    title: '个人面板'
  },
  {
    key: 'apply',
    path: '/apply',
    title: '申请'
  }
];

/**
 * 获取key对应的title
 * @param searchKey 
 * @param menus 
 */
export const getTitle = (searchKey: string, menus: IMenus[]): string => 
  menus.find(item => item.key === searchKey)?.title || ''