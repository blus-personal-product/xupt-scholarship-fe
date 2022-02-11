/**
 * 实践活动表
 */
import * as React from 'react';
import { Form } from 'antd';
import FormHeader from './form-header';
import PracticeSocialForm, { PracticeSocialFormValue, practiceSocialFormDefaultValue } from './practice-social-form';
import PracticeCompetitionForm, { PracticeCompetitionFormValue, practiceCompetitionDefaultFormValue } from './practice-competition-form';
import PracticeResultForm, { PracticeResultFormValue, practiceResultDefaultFormValue } from './practice-result-form';
import PracticeFormProvider from '../context/practice.context';

type PracticeFormValue = {
  result: PracticeResultFormValue[];
  social: PracticeSocialFormValue;
  competition: PracticeCompetitionFormValue[];
};

interface IProps {
  practiceValue?: PracticeFormValue;
}

const defaultFormValue: PracticeFormValue = {
  result: [practiceResultDefaultFormValue],
  social: practiceSocialFormDefaultValue,
  competition: [practiceCompetitionDefaultFormValue]
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