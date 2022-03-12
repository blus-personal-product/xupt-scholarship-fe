import { useStepContext } from '@/pages/initiate-process/context/step';
import { Button } from 'antd';
import * as React from 'react';
import { useProcessFormInstanceContext } from '../context/form-instance';
import style from '../style.module.less';

const StepFooter: React.FC = () => {
  const { step, next, prev } = useStepContext();
  const { getFormInstance } = useProcessFormInstanceContext();
  const [loading, setLoading] = React.useState(false);
  const stepIndex = step.index;
  const goNextStep = async () => {
    const form = getFormInstance(step.type);
    try {
      setLoading(true);
      await form.validateFields();
      next();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className={style['step-footer-banner']}
    >
      {
        stepIndex !== 0 && (
          <Button className={style['step-prev-button']} onClick={prev}>上一步</Button>
        )
      }
      {
        stepIndex !== 2 && (
          <Button type="primary" disabled={loading} loading={loading} onClick={goNextStep}>下一步</Button>
        )
      }
    </div >
  );
};

export default StepFooter;