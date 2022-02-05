import * as React from 'react';
import { Form } from 'antd';
import AcademicForm from './components/academic-form';
import MoralForm from './components/moral-form';
import PracticeForm from './components/practice-from';

const ApplicationForm: React.FC = () => {
  return (
    <React.Fragment>
      <Form.Provider
      >
        <AcademicForm />
        <MoralForm />
        <PracticeForm />
      </Form.Provider>
    </React.Fragment>
  );
};

export default ApplicationForm;