/**
 * 学术成果表单
 */
import * as React from 'react';
import { Form } from 'antd';
import FormHeader from '../form-header';
import ScientificForm from './components/scientific-form';

const AcademicForm: React.FC = () => {
  return (
    <section id="academic-form">
      <FormHeader
        title="学术成果"
        score={0}
      />
      <Form
        name="academic"
      >
        <ScientificForm />
      </Form>
    </section>
  )
};

export default AcademicForm;