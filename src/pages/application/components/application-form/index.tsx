/**
 * 申请表单
 */
import * as React from 'react';
import ApplicationProvider from './context/application.context';
import AcademicForm, { AcademicFormValue } from './components/academic-form';
import MoralForm, { MoralFormValue } from './components/moral-form';
import PracticeForm, { PracticeFormValue } from './components/practice-form';
import FormAnchor from './components/form-anchor';

import { Col, Form, message, Modal, Row } from 'antd';
import FormSubmitBanner from './components/form-submit-banner';
import { HandleApplicationFormType, postApplicationForm } from '@/service/application-form';

export interface ApplicationValue {
  moral: MoralFormValue;
  practice: PracticeFormValue;
  academic: AcademicFormValue;
}

const ApplicationForm: React.FC = () => {

  const [moralForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const [academicForm] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState<{
    visible: boolean;
    type: HandleApplicationFormType;
  }>({
    visible: false,
    type: 'submit',
  });

  const messageData = {
    save: {
      title: '保存',
      desc: '保存的信息不会提交，在进行下次编辑时仍可使用'
    },
    submit: {
      title: '提交',
      desc: '提交的信息会作为审核信息，在审核开始前你仍可更改'
    },
  };

  const getFormValue = (): ApplicationValue => {
    return {
      moral: moralForm.getFieldsValue(true),
      practice: practiceForm.getFieldsValue(true),
      academic: academicForm.getFieldsValue(true),
    };
  }

  const submitForm = async () => {
    const formValue = await Promise.all([
      moralForm.validateFields(),
      practiceForm.validateFields(),
      academicForm.validateFields()
    ]).then(([moral, practice, academic]) => {
      const value: ApplicationValue = {
        moral, practice, academic
      };
      return value;
    }).catch(err => {
      message.error(err.errorFields[0].errors[0]);
    });

    if (!formValue) return;

    setModalStatus({
      type: 'submit',
      visible: true,
    });
  };

  const saveForm = () => {
    setModalStatus({
      type: 'save',
      visible: true,
    })
  };

  const handleForm = async () => {
    try {
      setLoading(true);
      await postApplicationForm(modalStatus.type, getFormValue());
    } catch (error) {
      message.error(`${messageData[modalStatus.type]}失败: ${error.message}`)
    } finally {
      setLoading(false);
      setModalStatus({
        type: 'save',
        visible: false,
      });
    }
  }

  return (
    <React.Fragment>
      <Modal
        title={messageData[modalStatus.type].title}
        visible={modalStatus.visible}
        onOk={handleForm}
        okText="确认"
        cancelText="取消"
        closable={false}
        cancelButtonProps={{
          disabled: loading
        }}
        onCancel={() => setModalStatus({...modalStatus, visible: false})}
        confirmLoading={loading}
      >
        {messageData[modalStatus.type].desc}
      </Modal>
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