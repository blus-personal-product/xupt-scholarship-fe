import * as React from 'react';
import ApplicationProvider from './context/application.context';
import AcademicForm from './components/academic-form';
import MoralForm from './components/moral-form';
import PracticeForm from './components/practice-from';

const ApplicationForm: React.FC = () => {
  return (
    <React.Fragment>
      <ApplicationProvider>
        <AcademicForm />
        <MoralForm />
        <PracticeForm />
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default ApplicationForm;