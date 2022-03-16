import { cx } from '@/utils';
import { Card } from 'antd';
import * as React from 'react';
import style from '../style.module.less';

const HandleChartCard: React.FC = () => {

  return (
    <Card
      className={cx(style['info-card'], style['chart-card'])}
      title="日处理速率"
    >

    </Card>
  )
};

export default HandleChartCard;