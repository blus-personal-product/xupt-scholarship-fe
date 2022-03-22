import * as React from 'react';

export type ProcessFormType = 'initiate' | 'upload';

interface FormValueContextValue {
  initiate: any;
  upload: any;
}

interface FormValueContext extends FormValueContextValue {
  updateFormValue: (type: ProcessFormType, value: any) => void;
}

const FormValueContext = React.createContext({} as FormValueContext);

export const useProcessFormValueContext = () => React.useContext(FormValueContext);

interface IProps extends React.PropsWithChildren<{}> {

}

function reducer(state: FormValueContextValue, action: { type: ProcessFormType, value: any }): FormValueContextValue {
  switch (action.type) {
    case 'initiate':
      return {
        ...state,
        initiate: action.value,
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

export const ProcessFormValueProvider: React.FC<IProps> = (props) => {
  const [formState, dispatch] = React.useReducer(reducer, {
    initiate: null,
    upload: null,
  });

  const updateFormValue = (type: ProcessFormType, value: any) => {
    dispatch({ type, value })
  }
  return (
    <FormValueContext.Provider
      value={{
        ...formState,
        updateFormValue
      }}
    >
      {props.children}
    </FormValueContext.Provider>
  )
}