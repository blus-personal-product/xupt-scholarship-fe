import { useStepContext } from '@/pages/process/pages/initiate-process/context/step';
import { Button, message } from 'antd';
import * as React from 'react';
import * as api from '@/service/process';
import { useProcessFormInstanceContext } from '../context/form-instance';
import style from '../style.module.less';
import { InitiateFormValue } from './initiate-form';
import { UploadFormValue } from './upload-file';
import moment from 'moment';
import { DATE_FORMAT_NORMAL } from '@/config/time';
import useIsCreate from '../hooks/use-is-create';
import { CopyOutlined, EditOutlined } from '@ant-design/icons';
import { useProcess } from '@/context/process-status';

const StepFooter: React.FC = () => {
  const { step, next, prev } = useStepContext();
  const { getFormInstance } = useProcessFormInstanceContext();
  const [loading, setLoading] = React.useState(false);
  const [timeOut, setTimeOut] = React.useState(5);
  const timer = React.useRef<any>();
  const stepIndex = step.index;
  const { process_id, createable, editable } = useProcess();
  const isCreate = useIsCreate();

  const goNextStep = async () => {
    const form = getFormInstance(step.type);
    try {
      setLoading(true);
      await form.validateFields();
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
      const initValue = Object.keys(initiateValue).map((key) => {
        const tempKey = key as keyof InitiateFormValue;
        const [start, end] = initiateValue[tempKey].date || [];
        initiateValue[tempKey].date = [
          moment(start).format(DATE_FORMAT_NORMAL),
          moment(end).format(DATE_FORMAT_NORMAL)];
        return {
          step: tempKey,
          ...initiateValue[tempKey],
        }
      });
      const uploadValue: UploadFormValue = getFormInstance('upload').getFieldsValue(true);
      const processId = await api.postInitProcess({
        upload: uploadValue,
        form: initValue,
      });
      message.success("创建成功");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getProcess = async () => {
    try {
      setLoading(true);
      const { form } = await api.getProcessData(process_id);
      const initValue = form.form.reduce((p, v) => {
        const [start, end] = v.date || [];
        p[v.step] = {
          ...v,
          date: [
            moment(start, DATE_FORMAT_NORMAL),
            moment(end, DATE_FORMAT_NORMAL)
          ] as any,
        }
        return p;
      }, {} as InitiateFormValue);
      getFormInstance('initiate').setFieldsValue(initValue);
      getFormInstance('upload').setFieldsValue(form.upload);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (!isCreate && getFormInstance('initiate') && getFormInstance('upload')) {
      getProcess()
    }
  }, [process_id, getFormInstance])

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
        stepIndex !== 0 && isCreate && (
          <Button className={style['step-prev-button']} onClick={prev}>上一步</Button>
        )
      }
      {
        (stepIndex === 2 || !isCreate) && (createable || editable) && (
          <Button
            type="primary"
            loading={loading}
            onClick={submitProcess}
            disabled={loading || !(isCreate ? createable : editable)}
            icon={isCreate ? <CopyOutlined /> : <EditOutlined />}
          >
            { isCreate ? timeOut <= 0 ? '' : `${timeOut} s` : ''}
            我已知晓，确认{isCreate ? "创建" : "修改"}
          </Button>
        )
      }
      {
        stepIndex !== 2 && isCreate && (
          <Button type="primary" disabled={loading} loading={loading} onClick={goNextStep}>下一步</Button>
        )
      }
    </div >
  );
};

export default StepFooter;