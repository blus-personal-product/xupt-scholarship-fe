import * as React from 'react';

interface PracticeFormStore {
}

const PracticeFormContext = React.createContext<PracticeFormStore>({} as PracticeFormStore);

export const usePracticeFormContext = () => React.useContext(PracticeFormContext);

type IProps = React.PropsWithChildren<{
}>

const PracticeFormProvider: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <PracticeFormContext.Provider
      value={{
      }}
    >
      {children}
    </PracticeFormContext.Provider>
  );
};

export default PracticeFormProvider;

