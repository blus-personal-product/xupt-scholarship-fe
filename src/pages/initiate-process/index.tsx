/**
 * 发起流程
 */
import * as React from 'react';
import { Card } from 'antd';
import { StepProvider } from './context/step';
import StepHeader from './components/step-header';
import StepContent from './components/step-content';
import StepFooter from './components/step-footer';
import { ProcessFormInstanceProvider } from './context/form-instance';
const InitiateProcess: React.FC = () => {

  return (
    <StepProvider>
      <ProcessFormInstanceProvider>
        <Card>
          <StepHeader />
          <StepContent />
          <StepFooter />
        </Card>
      </ProcessFormInstanceProvider>
    </StepProvider>
  )
};

export default InitiateProcess;