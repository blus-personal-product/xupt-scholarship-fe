import * as React from 'react';
import { ProcessFormType } from './form-value';

interface StepContext {
  step: {
    index: number;
    type: ProcessFormType;
  }
  next: () => void;
  prev: () => void;
}

const FormStepType:ProcessFormType[] = ['initiate', 'upload'];

const getFormType = (index :number ) => {
  return FormStepType[index];
}

const StepContext = React.createContext<StepContext>({} as StepContext);

export const useStepContext = () => React.useContext(StepContext);

interface IProps extends React.PropsWithChildren<{}> {

}

export const StepProvider: React.FC<IProps> = (props) => {

  const [stepIndex, setStepIndex] = React.useState(0);

  const next = () => setStepIndex(stepIndex + 1 > 2 ? 2 : stepIndex + 1);
  const prev = () => setStepIndex(stepIndex - 1 < 0 ? 0 : stepIndex - 1)
  return (
    <StepContext.Provider
      value={{
        step: {
          index: stepIndex,
          type: getFormType(stepIndex)
        },
        next,
        prev,
      }}
    >
      {props.children}
    </StepContext.Provider>
  )
};