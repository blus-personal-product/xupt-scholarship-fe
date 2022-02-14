import { FormInstance } from 'antd';
import * as React from 'react';


interface ApplicationStore {
  moralForm: FormInstance;
  practiceForm: FormInstance;
  academicForm: FormInstance;
}

const ApplicationContext = React.createContext<ApplicationStore>({} as ApplicationStore);

export const useApplicationContext = () => React.useContext(ApplicationContext);

type IProps = React.PropsWithChildren<{
  moralForm: FormInstance;
  practiceForm: FormInstance;
  academicForm: FormInstance;
}>

const ApplicationProvider: React.FC<IProps> = (props) => {
  const { children, moralForm, practiceForm, academicForm } = props;

  return (
    <ApplicationContext.Provider
      value={{
        practiceForm,
        moralForm,
        academicForm
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;

