import { cx } from '@/utils';
import * as React from 'react';
import style from '../style.module.less';
import { getMenus, IMenu } from '@/components/page-nav/menu.config';
import { Menu, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useProcess } from '@/context/process-status';



const QuickStart: React.FC = () => {
  const { process_id } = useProcess();
  const childMenus = React.useMemo(() => getMenus(process_id).reduce((p, c) => {
    if (c.children && c.children.length) {
      p = [...p, ...c.children.map(m => ({
        ...m,
        path: c.path + m.path
      }))];
    }
    return p;
  }, [] as IMenu[]), []);
  return (
    <Card
      title="快速开始/便捷导航"
      className={cx(style['info-card'], style['quick-card'])}
    >
      {
        childMenus.map(menu => (
          <Link
            key={menu.key}
            to={menu.path}
          >
            <Card.Grid
              className={style['menu-card']}
            >
              <div className={style['menu-icon-box']}>
                {menu.icon}
              </div>
              <span className={style['menu-title']}>{menu.title}</span>
            </Card.Grid>
          </Link>
        ))
      }
    </Card>
  )
};

export default QuickStart;