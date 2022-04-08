import * as React from 'react';
import { ProcessFormValueProvider } from '../../context/form-value';
import { useStepContext } from '../../context/step';
import InitiateForm from '../initiate-form';
import ConfirmProcess from '../confirm-process';
import UploadFile from '../upload-file';
import useIsCreate from '../../hooks/use-is-create';
import { Divider } from 'antd';

const StepContent: React.FC = () => {
  const { step } = useStepContext();
  const isCreate = useIsCreate();
  const stepIndex = step.index;
  const ContentComponent = React.useMemo(() => {
    if (!isCreate) {
      return (
        <React.Fragment>
          <ConfirmProcess />
          <Divider orientation="left">相关文件</Divider>
          <UploadFile />
          <Divider orientation="left">详细创建信息</Divider>
          <InitiateForm />
        </React.Fragment>
      );
    }
    switch (stepIndex) {
      case 2:
        return (
          <ConfirmProcess />
        );
      case 1:
        return (
          <UploadFile />
        );
      default:
        return (
          <InitiateForm />
        );
    }
  }, [stepIndex, isCreate]);
  return (
    <ProcessFormValueProvider>
      {
        ContentComponent
      }
    </ProcessFormValueProvider>
  );
};

export default React.memo(StepContent);