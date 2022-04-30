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
import { Button, Card, Form, message, Modal, Spin } from 'antd';
import { getApplicationStatus, HandleApplicationFormType, postApplicationForm, putApplicationForm, ScoreValue } from '@/service/apply';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApplicationForm } from '@/service/apply';
import { usePageHeaderContext } from '@/context/page-header';
import { useAuth } from '@/context/auth.context';
import { getRoutePath } from '@/utils';
import ScoreForm from '../application-list/components/history-table/score-form';
import getGrade from '@/utils/get-grade';
import { useProcess } from '@/context/process-status';
import { StudentEditableList } from '@/pages/process/pages/handle-process/process.list';

const messageData = {
  save: {
    title: '保存注意事项：',
    desc: '保存的信息不会提交，在进行下次编辑时仍可使用'
  },
  submit: {
    title: '提交注意事项：',
    desc: (
      <div>
        提交当前表单前建议您阅读以下事项：
        <ol style={{ marginLeft: 30 }}>
          <li><strong>一年级新生不需要填写该表单，最终只会与录取综合成绩作为计算分数;</strong></li>
          <li><strong>三年级学生不会将学业课成绩作为计算分数;</strong></li>
          <li>提交的信息会作为审核信息，在审核开始前你仍可更改;</li>
          <li>提交的表单会覆盖之前的提交记录;</li>
          <li>在同一年的奖学金评定记录中，只会用最后一次提交的申请表单来作为奖学金评定的依据，其他保存的申请表单在非『创建环节』不支持修改状态为「提交」;</li>
        </ol>
      </div>
    )
  },
};

export interface ApplicationValue {
  moral: MoralFormValue;
  practice: PracticeFormValue;
  academic: AcademicFormValue;
  score_info?: ScoreValue;
}

interface IProps {
  commentApplyId?: number;
  noArcher?: boolean;
}

const ApplicationForm: React.FC<IProps> = (props) => {
  const applyId = ((+(useParams<{ applyId: string }>()?.applyId || '')) || props.commentApplyId) || -1;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { step } = useProcess();
  const { updatePageHeaderState } = usePageHeaderContext();
  const [moralForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const [academicForm] = Form.useForm();
  const [scoreForm] = Form.useForm<ScoreValue>();
  const [scoreValue, setScoreValue] = React.useState<ScoreValue>();
  const [modalLoading, setModalLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [permission, setPermission] = React.useState<FormPermission>(applyId === -1 ? 'create' : 'read');
  const disabled = React.useMemo(() => ['edit', 'invisible'].includes(permission), [permission]);
  const [modalStatus, setModalStatus] = React.useState<{
    visible: boolean;
    type: HandleApplicationFormType;
  }>({
    visible: false || ((location.state as any)?.showScore || (getGrade(user.student?.grade) === 1) && step && StudentEditableList.includes(step)),
    type: 'submit',
  });

  React.useEffect(() => {
    if (user.identity !== 'manager' && applyId === -1) {
      loadApplyStatus();
    }
    if (applyId !== -1) {
      loadApplyForm();
    }
  }, [applyId]);

  const loadApplyStatus = async () => {
    try {
      setLoading(true);
      const res = await getApplicationStatus();
      if (res && typeof res === 'number' && props.commentApplyId !== -1) {
        navigate(getRoutePath(location.pathname, res));
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const loadApplyForm = async () => {
    try {
      setLoading(true);
      const res = await getApplicationForm(applyId);
      setPermission(res.editable ? 'edit' : 'read');
      moralForm.setFieldsValue(res.form.moral);
      practiceForm.setFieldsValue(res.form.practice);
      academicForm.setFieldsValue(res.form.academic);
      setScoreValue(res.score_info)
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
      score_info: scoreForm.getFieldsValue(true)
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
        moral,
        practice,
        academic,
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
      if (applyId === -1) {
        await postApplicationForm(modalStatus.type, getFormValue());
      } else {
        await putApplicationForm(modalStatus.type, getFormValue(), applyId)
      }
      message.success("操作成功");
    } catch (error) {
      message.error(`失败: ${error.message}`)
    } finally {
      setModalLoading(false);
      setModalStatus({
        type: 'save',
        visible: false,
      });
    }
  }


  React.useEffect(() => {
    if (step && StudentEditableList.includes(step)) {
      updatePageHeaderState({
        title: '申请表单',
        extra: disabled ? [] : [
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
      });
    }
    return () => {
      updatePageHeaderState({})
    }
  }, [step]);

  return (
    <Spin
      spinning={loading}
    >
      <Modal
        title={messageData[modalStatus.type].title}
        visible={modalStatus.visible}
        onOk={handleForm}
        okText="确认"
        width={800}
        cancelText="取消"
        closable={false}
        cancelButtonProps={{
          disabled: modalLoading
        }}
        onCancel={() => setModalStatus({ ...modalStatus, visible: false })}
        confirmLoading={modalLoading}
      >
        {messageData[modalStatus.type].desc}
        {
          modalStatus.type === 'submit' && (
            <ScoreForm initValue={scoreValue} applyId={applyId} scoreFormRef={scoreForm} />
          )
        }
      </Modal>
      <div
        className={style['form-page-layout']}
      >
        <ApplicationProvider
          moralForm={moralForm}
          practiceForm={practiceForm}
          academicForm={academicForm}
        >
          {
            !props.noArcher && (
              <section
                className={style['application-form-anchor']}
              >
                <FormAnchor />
              </section>
            )
          }
          <Card
            className={style['application-form-card']}
            hoverable
          >
            <MoralForm />
            <PracticeForm />
            <AcademicForm />
          </Card>
        </ApplicationProvider>
      </div>
    </Spin>
  );
};

ApplicationForm.defaultProps = {
  noArcher: false
}

export default ApplicationForm;