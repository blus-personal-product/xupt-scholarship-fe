import { cx } from '@/utils';
import { Card } from 'antd';
import * as React from 'react';
import style from '../style.module.less';

const DepartmentCard: React.FC = () => {

  return (
    <Card
      className={cx(style['info-card'], style['department-card'])}
      title="评审负责部门信息"
    >

    </Card>
  )
};

export default DepartmentCard;