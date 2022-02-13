/**
 * 学术成果表单
 */
import * as React from 'react';
import { Form } from 'antd';
import FormHeader from '../form-header';
import ScientificForm, { ScientificFormValue, scientificDefaultFormValue } from './components/scientific-form';
import AwardForm, { AwardFormValue, awardDefaultFormValue } from './components/award-form';
import DissertationForm, { DissertationFormValue, dissertationDefaultFormValue } from './components/dissertation-form';
import PublishForm, { publishDefaultFormValue, PublishFormValue } from './components/publish-form';

interface AcademicFormValue {
  award: AwardFormValue[];
  scientific: ScientificFormValue[];
  dissertation: DissertationFormValue[];
  publish: PublishFormValue[];
}

const academicFormDefaultValue: AcademicFormValue = {
  award: [awardDefaultFormValue],
  scientific: [scientificDefaultFormValue],
  dissertation: [dissertationDefaultFormValue],
  publish: [publishDefaultFormValue]
}

interface IProps {
  academicValue?: AcademicFormValue;
}


const AcademicForm: React.FC<IProps> = (props) => {
  const { academicValue } = props;
  return (
    <section id="academic-form">
      <FormHeader
        title="学术成果"
        score={0}
      />
      <Form
        name="academic"
        initialValues={academicValue}
      >
        <ScientificForm />
        <AwardForm />
        <DissertationForm />
        <PublishForm />
      </Form>
    </section>
  )
};

AcademicForm.defaultProps = {
  academicValue: academicFormDefaultValue
}

export default AcademicForm;