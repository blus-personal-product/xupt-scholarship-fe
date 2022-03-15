import * as React from 'react';
import { ProcessFormValueProvider } from '../../context/form-value';
import { useStepContext } from '../../context/step';
import InitiateForm from '../initiate-form';
import NoticeMember from '../notice-member';
import UploadFile from '../upload-file';

const StepContent: React.FC = () => {
  const { step } = useStepContext();
  const stepIndex = step.index;
  const ContentComponent = React.useMemo(() => {
    switch (stepIndex) {
      case 2:
        return (
          <NoticeMember />
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
  }, [stepIndex]);
  return (
    <ProcessFormValueProvider>
      {
        ContentComponent
      }
    </ProcessFormValueProvider>
  );
};

export default StepContent;