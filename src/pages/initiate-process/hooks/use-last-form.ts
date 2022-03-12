import { ProcessFormType } from '../context/form-value';
import { Form, FormProps, FormInstance } from 'antd';
import * as React from 'react';
import { useProcessFormValueContext } from '../context/form-value';
import { useStepContext } from '../context/step';
import { useProcessFormInstanceContext } from '../context/form-instance';

export const useLastForm = (formType: ProcessFormType): [FormInstance, FormProps['onValuesChange']] => {
  const { updateFormValue, ...formValue } = useProcessFormValueContext();
  const { step } = useStepContext();
  const { updateFormInstance } = useProcessFormInstanceContext();
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue(formValue[formType]);
  }, [step]);
  React.useEffect(() => {
    updateFormInstance(formType, form);
  }, [formType])
  const onValuesChange: FormProps['onValuesChange'] = (_, v) => {
    updateFormValue(formType, v);
  }
  return [form, onValuesChange];
}