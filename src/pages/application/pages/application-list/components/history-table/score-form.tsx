import { Button, Form, FormInstance, FormProps, InputNumber, message, Space, Statistic } from 'antd';
import * as React from 'react';
import style from "../../style.module.less";
import * as api from '@/service/apply';
import { useAuth } from '@/context/auth.context';
import { getApplyScore } from '@/utils';
import getGrade from '@/utils/get-grade';

type ScoreValue = api.ScoreValue;

interface IProps {
  applyId: number;
  initValue?: ScoreValue
  submitCallBack?: () => void;
  scoreFormRef?: FormInstance<api.ScoreValue>;
}

const ScoreFormList: {
  type: "base" | "moral" | "practice" | "academic" | "sum";
  name: string;
}[] = [{
  type: 'base',
  name: "学业课成绩",
}, {
  type: "moral",
  name: "思想品德分数",
}, {
  type: "practice",
  name: "实践活动分数"
}, {
  type: "academic",
  name: "学术分数",
}, {
  type: "sum",
  name: "总和"
}]

const ScoreForm: React.FC<IProps> = (props) => {
  const { user } = useAuth();
  const { initValue, applyId, submitCallBack, scoreFormRef } = props;
  const [loading, setLoading] = React.useState(false);

  const updateSum = (values: any) => {
    const sum = getApplyScore(values, user.student?.grade || '', user.student?.type || 'bachelor_degree');
    if (sum !== values.sum) {
      formRef.setFieldsValue({
        ...values,
        sum,
      });
    }
  }

  const onValuesChange: FormProps['onValuesChange'] = (_, values) => {
    updateSum(values);
  }
  let [formRef] = Form.useForm<ScoreValue>();
  formRef = scoreFormRef || formRef;

  const submitForm = async () => {
    const value = formRef.getFieldsValue(true) as ScoreValue;
    try {
      setLoading(true);
      await api.postApplicationScoreList(applyId, {
        ...value,
      });
      submitCallBack && await submitCallBack();
      message.success("评定成功");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const formValue = React.useMemo(() => {
    if (initValue?.base === 0) {
      return {
        ...initValue,
        base: user.course
      }
    }
    return initValue || {};
  }, [user.course, initValue]);

  React.useEffect(() => {
    if (initValue) {
      formRef.setFieldsValue(formValue);
    }
    updateSum(formValue);
  }, [formValue]);

  const options = React.useMemo(() => {
    const grade = getGrade(user.student?.grade);
    return ScoreFormList.filter(item => {
      if (grade === 2) {
        return true;
      } else if (grade === 1) {
        return item.type === 'base' || item.type === 'sum';
      } else {
        return item.type !== 'base';
      }
    });
  }, [user]);

  return (
    <Form
      className={style["score-form"]}
      layout="inline"
      form={formRef}
      onValuesChange={onValuesChange}
      initialValues={initValue}
    >
      <Space align="center">
        {
          options.map((item) => (
            <React.Fragment key={item.type}>
              <div className={style["score-form-item"]}>
                <React.Fragment>
                  <div className={style["form-top-label"]}>{item.name}</div>
                  <Form.Item
                    name={item.type}
                  >
                    <InputNumber
                      min={0}
                      disabled={loading || ['base', 'sum'].includes(item.type)}
                    />
                  </Form.Item>
                </React.Fragment>
              </div>
            </React.Fragment>
          ))
        }
      </Space>
      { !scoreFormRef && (
        <Form.Item>
          <Button onClick={submitForm} loading={loading} type="primary">确认分数并提交</Button>
        </Form.Item>
      )
      }
    </Form >
  );
}

ScoreForm.defaultProps = {
  initValue: {
    moral: 0,
    practice: 0,
    academic: 0,
    sum: 0,
    base: 0,
  }
}

export default ScoreForm;