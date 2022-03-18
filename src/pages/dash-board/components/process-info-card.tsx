
import { cx } from '@/utils';
import { Card } from 'antd';
import * as React from 'react';
import style from '../style.module.less';

const ProcessInfo:React.FC = () => {
  return (
    <Card
      title="流程动态"
      className={cx(style['info-card'], style['process-card'])}
    >

    </Card>
  )
};

export default ProcessInfo;