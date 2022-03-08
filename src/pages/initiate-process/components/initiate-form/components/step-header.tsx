import { useStepContext } from '@/pages/initiate-process/context/step';
import { Steps } from 'antd';
import * as React from 'react';
import style from '../../../style.module.less'
const { Step } = Steps;

const StepHeader: React.FC = () => {
  const { step } = useStepContext();
  return (
    <Steps
      current={step}
      className={style['steps-page-header']}
    >
      <Step
        title="发起奖学金评定流程"
      ></Step>
      <Step
        title="上传相关公开文件"
      />
      <Step title="确定通知成员"></Step>
    </Steps>
  )
}

export default StepHeader;