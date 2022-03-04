/**
 * 申请表单
 */
import * as React from 'react';
import ApplicationProvider from './context/application.context';
import AcademicForm, { AcademicFormValue } from './components/academic-form';
import MoralForm, { MoralFormValue } from './components/moral-form';
import PracticeForm, { PracticeFormValue } from './components/practice-form';
import FormAnchor from './components/form-anchor';
import style from './style/layout.module.less';
import { Button, Form, message, Modal, Spin } from 'antd';
import { HandleApplicationFormType, postApplicationForm } from '@/service/application-form';
import { useParams } from 'react-router-dom';
import { getApplicationForm } from '@/service/application-form';
import { usePageHeaderContext } from '@/context/page-header';

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

export interface ApplicationValue {
  moral: MoralFormValue;
  practice: PracticeFormValue;
  academic: AcademicFormValue;
}

const ApplicationForm: React.FC = () => {

  const applyId = (+(useParams<{ applyId: string }>()?.applyId || '')) || -1;

  const { updatePageHeaderState } = usePageHeaderContext();
  const [moralForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const [academicForm] = Form.useForm();
  const [modalLoading, setModalLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [permission, setPermission] = React.useState<FormPermission>(applyId === -1 ? 'read' : 'create')
  const [modalStatus, setModalStatus] = React.useState<{
    visible: boolean;
    type: HandleApplicationFormType;
  }>({
    visible: false,
    type: 'submit',
  });

  React.useEffect(() => {
    if (applyId !== -1) {
      loadApplyForm();
    }
  }, [applyId]);


  const loadApplyForm = async () => {
    try {
      setLoading(true);
      const res = await getApplicationForm(applyId);
    } catch (error) {
      message.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const getFormValue = (): ApplicationValue => {
    const value: ApplicationValue = {
      moral: moralForm.getFieldsValue(true),
      practice: practiceForm.getFieldsValue(true),
      academic: academicForm.getFieldsValue(true),
    };
    return value;
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
      setModalLoading(true);
      await postApplicationForm(modalStatus.type, getFormValue());
    } catch (error) {
      message.error(`${messageData[modalStatus.type]}失败: ${error.message}`)
    } finally {
      setModalLoading(false);
      setModalStatus({
        type: 'save',
        visible: false,
      });
    }
  }


  React.useEffect(() => {
    updatePageHeaderState({
      title: '申请表单',
      extra: [
        <Button
          key="1"
          onClick={saveForm}
        >保存</Button>,
        <Button
          type="primary"
          key="2"
          onClick={submitForm}
        >提交</Button>,
      ],
      subTitle: '',
    })
  }, []);

  return (
    <Spin
      spinning={loading}
    >
      <Modal
        title={messageData[modalStatus.type].title}
        visible={modalStatus.visible}
        onOk={handleForm}
        okText="确认"
        cancelText="取消"
        closable={false}
        cancelButtonProps={{
          disabled: modalLoading
        }}
        onCancel={() => setModalStatus({ ...modalStatus, visible: false })}
        confirmLoading={modalLoading}
      >
        {messageData[modalStatus.type].desc}
      </Modal>
      <div
        className={style['form-page-layout']}
      >
        <ApplicationProvider
          moralForm={moralForm}
          practiceForm={practiceForm}
          academicForm={academicForm}
        >
          <section
            className={style['application-form-anchor']}
          >
            <FormAnchor />
          </section>
          <section
            className={style['application-form-card']}
          >
            <MoralForm />
            <PracticeForm />
            <AcademicForm />
          </section>
        </ApplicationProvider>
      </div>
    </Spin>
  );
};

export default ApplicationForm;