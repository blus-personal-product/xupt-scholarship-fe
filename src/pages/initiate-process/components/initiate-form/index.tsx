
import { ProcessList } from '@/pages/process/pages/handle-process/process.list';
import { Form } from 'antd';
import * as React from 'react';
import CardFormItem from './components/card-form-item';
import style from '../../style.module.less';
import StepFooter from './components/step-footer';

const InitiateForm: React.FC = () => {
  return (
    <Form
      className={style['initiate-form']}
    >
      {
        ProcessList.map(process => (
          <React.Fragment key={process.name}>
            <CardFormItem
              title={process.title}
              name={process.name}
              duration={process.duration}
            />
          </React.Fragment>
        ))
      }
      <StepFooter />
    </Form>
  )
};

export default InitiateForm;