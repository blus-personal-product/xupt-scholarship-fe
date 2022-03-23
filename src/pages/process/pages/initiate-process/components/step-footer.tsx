import { useStepContext } from '@/pages/process/pages/initiate-process/context/step';
import { Button, message } from 'antd';
import * as React from 'react';
import * as api from '@/service/process';
import { useProcessFormInstanceContext } from '../context/form-instance';
import style from '../style.module.less';
import { InitiateFormValue } from './initiate-form';
import { UploadFormValue } from './upload-file';

const StepFooter: React.FC = () => {
  const { step, next, prev } = useStepContext();
  const { getFormInstance } = useProcessFormInstanceContext();
  const [loading, setLoading] = React.useState(false);
  const [timeOut, setTimeOut] = React.useState(5);
  const timer = React.useRef<any>();
  const stepIndex = step.index;

  const goNextStep = async () => {
    const form = getFormInstance(step.type);
    try {
      setLoading(true);
      // await form.validateFields();
      next();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const submitProcess = async () => {
    try {
      setLoading(true);
      const initiateValue: InitiateFormValue = getFormInstance('initiate').getFieldsValue(true);
      const uploadValue: UploadFormValue = getFormInstance('upload').getFieldsValue(true);
      await api.postInitProcess({
        upload: uploadValue,
        form: initiateValue,
      });
      message.success("创建成功");
    } catch (error) {
      message.error("提交失败");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (timeOut > 0) {
      if (stepIndex === 2) {
        setLoading(true);
        timer.current = setInterval(() => {
          setTimeOut(() => timeOut - 1);
        }, 1000);
      }
    } else {
      clearInterval(timer.current);
      setLoading(false);
    }
    return () => {
      timer.current && clearInterval(timer.current);
      setLoading(false);
    }
  }, [timeOut, stepIndex]);

  return (
    <div
      className={style['step-footer-banner']}
    >
      {
        stepIndex !== 0 && (
          <Button className={style['step-prev-button']} onClick={prev}>上一步</Button>
        )
      }
      {
        stepIndex === 2 && (
          <Button
            type="primary"
            loading={loading}
            onClick={submitProcess}
            disabled={loading}
          >
            {timeOut <= 0 ? '' : `${timeOut} s`}
            我已知晓，确认创建
          </Button>
        )
      }
      {
        stepIndex !== 2 && (
          <Button type="primary" disabled={loading} loading={loading} onClick={goNextStep}>下一步</Button>
        )
      }
    </div >
  );
};

export default StepFooter;