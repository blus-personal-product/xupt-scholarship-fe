/**
 * 申请表单
 */
import * as React from 'react';
import ApplicationProvider from './context/application.context';
import AcademicForm from './components/academic-form';
import MoralForm from './components/moral-form';
import PracticeForm from './components/practice-form';
import FormAnchor from './components/form-anchor';
import { Col, Row } from 'antd';

const ApplicationForm: React.FC = () => {
  return (
    <Row>
      <ApplicationProvider>
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
  );
};

export default ApplicationForm;