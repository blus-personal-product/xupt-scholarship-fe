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
import useIsCreate from './hooks/use-is-create';

const InitiateProcess: React.FC = () => {
  const isCreate = useIsCreate();
  return (
    <StepProvider>
      <ProcessFormInstanceProvider>
        <Card>
          {
            isCreate && (
              <StepHeader />
            )
          }
          <StepContent />
          <StepFooter />
        </Card>
      </ProcessFormInstanceProvider>
    </StepProvider>
  )
};

export default InitiateProcess;