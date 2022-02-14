/**
 * 申请表单
 */
import * as React from 'react';
import ApplicationProvider from './context/application.context';
import AcademicForm, { AcademicFormValue } from './components/academic-form';
import MoralForm, { MoralFormValue } from './components/moral-form';
import PracticeForm, { PracticeFormValue } from './components/practice-form';
import FormAnchor from './components/form-anchor';

import { Col, Form, message, Row } from 'antd';
import FormSubmitBanner from './components/form-submit-banner';

const ApplicationForm: React.FC = () => {

  const [moralForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const [academicForm] = Form.useForm();

  const getFormValue = () => {
    return {
      moral: moralForm.getFieldsValue(true) as MoralFormValue,
      practice: practiceForm.getFieldsValue(true) as PracticeFormValue,
      academic: academicForm.getFieldsValue(true) as AcademicFormValue,
    };
  }

  const submitForm = async () => {
    await Promise.all([
      moralForm.validateFields(),
      practiceForm.validateFields(),
      academicForm.validateFields()
    ]).then().catch(err => {
      message.error(err.errorFields[0].errors[0]);
    })

    try {
      const value = getFormValue();
      console.log(value)
    } catch (error) {

    } finally {

    }
  }

  const saveForm = async () => {

  }

  return (
    <React.Fragment>
      <FormSubmitBanner
        save={saveForm}
        submit={submitForm}
      />
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