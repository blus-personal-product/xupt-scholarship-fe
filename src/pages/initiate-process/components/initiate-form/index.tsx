
import { ProcessList } from '@/pages/process/pages/handle-process/process.list';
import { Form } from 'antd';
import * as React from 'react';
import CardFormItem from './components/card-form-item';
import style from '../../style.module.less';
import { useLastForm } from '../../hooks/use-last-form';

const InitiateForm: React.FC = () => {
  const [form, onValuesChange] = useLastForm('initiate');
  return (
    <Form
      className={style['initiate-form']}
      form={form}
      onValuesChange={onValuesChange}
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
    </Form>
  )
};

export default InitiateForm;