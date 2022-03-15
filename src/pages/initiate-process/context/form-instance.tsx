import { FormInstance } from 'antd';
import * as React from 'react';
import { ProcessFormType } from './form-value';

interface FormInstanceContextValue {
  initiate: any;
  notice: any;
  upload: any;
}

interface FormInstanceContext extends FormInstanceContextValue {
  updateFormInstance: (type: ProcessFormType, value: any) => void;
  getFormInstance: (type: ProcessFormType) => FormInstance;
}

const FormInstanceContext = React.createContext({} as FormInstanceContext);

export const useProcessFormInstanceContext = () => React.useContext(FormInstanceContext);

interface IProps extends React.PropsWithChildren<{}> {

}

function reducer(state: FormInstanceContextValue, action: { type: ProcessFormType, value: any }): FormInstanceContextValue {
  switch (action.type) {
    case 'initiate':
      return {
        ...state,
        initiate: action.value,
      };
    case 'notice':
      return {
        ...state,
        notice: action.value,
      };
    case 'upload':
      return {
        ...state,
        upload: action.value,
      };
    default:
      throw new Error();
  }
}

export const ProcessFormInstanceProvider: React.FC<IProps> = (props) => {
  const [formInstance, dispatch] = React.useReducer(reducer, {
    initiate: null,
    notice: null,
    upload: null,
  });

  const updateFormInstance = (type: ProcessFormType, value: any) => {
    dispatch({ type, value })
  }

  const getFormInstance = (type: ProcessFormType) => {
    return formInstance[type];
  }
  return (
    <FormInstanceContext.Provider
      value={{
        ...formInstance,
        updateFormInstance,
        getFormInstance,
      }}
    >
      {props.children}
    </FormInstanceContext.Provider>
  )
}