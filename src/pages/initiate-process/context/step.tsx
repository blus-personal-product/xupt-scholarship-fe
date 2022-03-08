import * as React from 'react';

interface StepContext {
  step: number;
  next: () => void;
  prev: () => void;
}

const StepContext = React.createContext<StepContext>({} as StepContext);

export const useStepContext = () => React.useContext(StepContext);

interface IProps extends React.PropsWithChildren<{}> {

}

export const StepProvider: React.FC<IProps> = (props) => {

  const [step, setStep] = React.useState(0);

  const next = () => setStep(step + 1 > 2 ? 2 : step + 1);
  const prev = () => setStep(step - 1 < 0 ? 0 : step - 1)
  return (
    <StepContext.Provider
      value={{
        step,
        next,
        prev,
      }}
    >
      {props.children}
    </StepContext.Provider>
  )
};