/**
 * 申请表单
 */
import * as React from 'react';
import ApplicationProvider from './context/application.context';
import AcademicForm from './components/academic-form';
import MoralForm from './components/moral-form';
import PracticeForm from './components/practice-form';
import FormAnchor from './components/form-anchor';

import { Col, Form, Row } from 'antd';
import FormSubmitBanner from './components/form-submit-banner';

const ApplicationForm: React.FC = () => {

  const [moralForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const [academicForm] = Form.useForm();

  return (
    <React.Fragment>
      <FormSubmitBanner />
      <Row>
        <ApplicationProvider
          moralForm={moralForm}
          practiceForm={practiceForm}
          academicForm={academicForm}
        >
          <Col xs={{ span: 24 }} span={8} md={{ span: 4 }}>
            <FormAnchor />
          </Col>
          <Col>
            <MoralForm />
            <PracticeForm />
            <AcademicForm />
          </Col>
        </ApplicationProvider>
      </Row>
    </React.Fragment>
  );
};

export default ApplicationForm;