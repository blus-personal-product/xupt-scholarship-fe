import { ProcessFormType } from './../context/form';
import { Form, FormProps, FormInstance } from 'antd';
import * as React from 'react';
import { useProcessFormContext } from '../context/form';
import { useStepContext } from '../context/step';

export const useLastForm = (formType: ProcessFormType): [FormInstance, FormProps['onValuesChange']] => {
  const { updateFormValue, ...formValue } = useProcessFormContext();
  const { step } = useStepContext();
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue(formValue[formType]);
  }, [step]);
  const onValuesChange: FormProps['onValuesChange'] = (_, v) => {
    updateFormValue(formType, v);
  }
  return [form, onValuesChange];
}