/**
 * 发起流程
 */
import * as React from 'react';
import { Card, Steps } from 'antd';
import InitiateForm from './components/initiate-form';
import { StepProvider, useStepContext } from './context/step';
import style from './style.module.less';

const { Step } = Steps;

const InitiateProcess: React.FC = () => {
  const { step } = useStepContext();
  return (
    <StepProvider>
      <Card>
        <Steps
          current={step}
          className={style['steps-page-header']}
          >
          <Step
            title="发起奖学金评定流程"
          >
          </Step>
          <Step
            title="上传相关公开文件"
          />
          <Step title="确定通知成员">

          </Step>
        </Steps>
        <InitiateForm />
      </Card>
    </StepProvider>
  )
};

export default InitiateProcess;