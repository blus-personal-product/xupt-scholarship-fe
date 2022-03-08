import * as React from 'react';

export type ProcessFormType = 'initiate' | 'notice' | 'upload';

interface FormContextValue {
  initiate: any;
  notice: any;
  upload: any;
}

interface FormContext extends FormContextValue {
  updateFormValue: (type: ProcessFormType, value: any) => void;
}

const FormContext = React.createContext({} as FormContext);

export const useProcessFormContext = () => React.useContext(FormContext);

interface IProps extends React.PropsWithChildren<{}> {

}

function reducer(state: FormContextValue, action: { type: ProcessFormType, value: any }): FormContextValue {
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

export const ProcessFormProvider: React.FC<IProps> = (props) => {
  const [formState, dispatch] = React.useReducer(reducer, {
    initiate: null,
    notice: null,
    upload: null,
  });

  const updateFormValue = (type: ProcessFormType, value: any) => {
    dispatch({ type, value })
  }
  return (
    <FormContext.Provider
      value={{
        ...formState,
        updateFormValue
      }}
    >
      {props.children}
    </FormContext.Provider>
  )
}