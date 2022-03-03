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
        title: '发起申请'
      },
      {
        key: 'progress',
        path: '',
        title: '申请进度'
      }
    ]
  },
  {
    key: 'process',
    path: '/process',
    title: '评定流程',
    children: [
      {
        key: 'handle',
        path: '',
        title: '流程管理/查看'
      },
      {
        key: 'detail',
        path: '/detail',
        title: '评定记录'
      }
    ]
  },
  {
    key: 'upload',
    path: '/upload',
    title: '上传学生名单'
  },
  {
    key: 'user',
    path: '/user',
    title: "用户中心"
  }
];

/**
 * 获取key对应的title
 * @param searchKey 
 * @param menus 
 */
export const getTitle = (searchKey: string, menus: IMenu[]): string =>
  menus.find(item => item.key === searchKey)?.title || ''