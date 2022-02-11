/**
 * 实践活动表
 */
import * as React from 'react';
import { FormValue } from '../types/form';
import FormHeader from './form-header';
import PracticeSocialForm from './practice-social-form';
import { Form } from 'antd';
import PracticeCompetitionForm from './practice-competition-form';
import PracticeResultForm from './practice-result-form';
import PracticeFormProvider from '../context/practice.context';

interface PracticeFormItemValue {

}

type PracticeFormValue = FormValue<PracticeFormItemValue>;

interface IProps {
  practiceValue?: PracticeFormValue;
}

const defaultFormValue: PracticeFormValue = {
  list: [
    {
      category: 'result',
      list: [
        {
          type: 'international',
          info: '',
          name: '',
          list: []
        }
      ],
    }
  ]
}

const PracticeForm: React.FC<IProps> = (props) => {
  const { practiceValue } = props;
  return (
    <PracticeFormProvider>
      <FormHeader
        title="实践活动成绩"
        score={0}
      />
      <Form
        name="practice"
        onValuesChange={(v, v1) => console.log(v, v1)}
        initialValues={practiceValue}
      >
        <PracticeResultForm />
        <PracticeSocialForm />
        <PracticeCompetitionForm />
      </Form>
    </PracticeFormProvider>
  )
};

PracticeForm.defaultProps = {
  practiceValue: defaultFormValue
}

export default PracticeForm;