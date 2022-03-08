/**
 * 发起流程
 */
import * as React from 'react';
import { Card } from 'antd';
import { StepProvider } from './context/step';
import StepHeader from './components/initiate-form/components/step-header';
import StepContent from './components/step-content';
import StepFooter from './components/initiate-form/components/step-footer';
const InitiateProcess: React.FC = () => {

  return (
    <StepProvider>
      <Card>
        <StepHeader />
        <StepContent />
        <StepFooter />
      </Card>
    </StepProvider>
  )
};

export default InitiateProcess;