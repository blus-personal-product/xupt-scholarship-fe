import * as React from 'react';

interface ApplicationStore {

}

const ApplicationContext = React.createContext<ApplicationStore>({});

export const useApplicationContext = () => React.useContext(ApplicationContext);

type IProps = React.PropsWithChildren<{

}>

const ApplicationProvider: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <ApplicationContext.Provider
      value={{}}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;

