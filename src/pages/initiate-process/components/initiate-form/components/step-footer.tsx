import { useStepContext } from '@/pages/initiate-process/context/step';
import { Button } from 'antd';
import * as React from 'react';
import style from '../../../style.module.less';

const StepFooter: React.FC = () => {
  const { step, next, prev } = useStepContext();
  return (
    <div
      className={style['step-footer-banner']}
    >
      {
        step !== 0 && (
          <Button onClick={prev}>上一步</Button>
        )
      }
      {
        step !== 2 && (
          <Button type="primary" onClick={next}>下一步</Button>
        )
      }
    </div >
  );
};

export default StepFooter;