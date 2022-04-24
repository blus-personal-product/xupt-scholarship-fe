
import { ProcessList, ProcessStep } from '@/pages/process/pages/handle-process/process.list';
import { Form } from 'antd';
import * as React from 'react';
import CardFormItem from './components/card-form-item';
import style from '../../style.module.less';
import { useLastForm } from '../../hooks/use-last-form';
import { validateMessages } from '@/config/form';

interface DefaultStepValue {
  date: [string, string] | undefined | [];
  desc?: string;
  mentions?: string[];
};

export type InitiateFormValue = {
  [step in ProcessStep]: DefaultStepValue;
};
interface IProcessStepValue extends DefaultStepValue {
  step: ProcessStep;
};

export type IProcessValue = IProcessStepValue[];

const defaultValue: DefaultStepValue = {
  date: [],
  desc: '',
  mentions: []
}

const getInitiateFormValue = (): InitiateFormValue => {
  const data = {} as InitiateFormValue;
  ProcessList.forEach(item => {
    data[item.step] = defaultValue;
  });
  return data;
}

const InitiateForm: React.FC = () => {
  const [form, onValuesChange] = useLastForm('initiate');
  return (
    <Form
      className={style['initiate-form']}
      form={form}
      colon={false}
      initialValues={getInitiateFormValue()}
      requiredMark={false}
      validateMessages={validateMessages}
      onValuesChange={onValuesChange}
    >
      {
        ProcessList.map((process, index) => (
          <React.Fragment key={process.step}>
            <CardFormItem
              title={process.title}
              name={process.step}
              processIndex={index}
              duration={process.duration}
            />
          </React.Fragment>
        ))
      }
    </Form>
  );
};

export default InitiateForm;