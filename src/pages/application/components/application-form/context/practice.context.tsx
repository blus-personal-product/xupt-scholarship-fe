import { FormInstance } from 'antd';
import * as React from 'react';
import { Form } from 'antd';

interface PracticeFormStore {
  form: FormInstance;
}

const PracticeFormContext = React.createContext<PracticeFormStore>({} as PracticeFormStore);

export const usePracticeFormContext = () => React.useContext(PracticeFormContext);

type IProps = React.PropsWithChildren<{

}>

const PracticeFormProvider: React.FC<IProps> = (props) => {
  const { children } = props;
  const [form] = Form.useForm();
  return (
    <PracticeFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </PracticeFormContext.Provider>
  );
};

export default PracticeFormProvider;

