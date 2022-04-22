import ProcessStepInfo from '@/pages/process/pages/handle-process/components/process-step-info';
import { cx } from '@/utils';
import * as React from 'react';
import style from '../style.module.less';

const ProcessInfo:React.FC = () => {

  return (
    <div
      className={cx(style['info-card'], style['process-card'])}
    >
      <ProcessStepInfo column={1}  title="流程动态" />
    </div>
  )
};

export default ProcessInfo;