import * as React from 'react';
import { ProcessFormProvider } from '../../context/form';
import { useStepContext } from '../../context/step';
import InitiateForm from '../initiate-form';
import NoticeMember from '../notice-member';
import UploadFile from '../upload-file';

const StepContent: React.FC = () => {
  const { step } = useStepContext();
  const ContentComponent = React.useMemo(() => {
    switch (step) {
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
  }, [step])
  return (
    <ProcessFormProvider>
      {
        ContentComponent
      }
    </ProcessFormProvider>
  );
};

export default StepContent;