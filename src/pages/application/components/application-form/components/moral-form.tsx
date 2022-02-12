/**
 * 思想品德成绩表
 */
import * as React from 'react';
import { Form, Input, Select, DatePicker, Card, FormProps, notification } from 'antd';
import { moralScoreList, MoralScoreItem } from '../config/moral.config';
import FormHeader from './form-header';
import { FormValue } from '../types/form';
import { validateMessages, disabledFormCurrentDate } from '@/config/form';
import FormListSkeleton from './form-list-skeleton';

type MoralFormItemValue = {
  level: MoralScoreItem['level'];
  name: string;
  info: string;
  time: string;
}
type MoralFormValue = FormValue<MoralFormItemValue>;

const defaultFormValue: MoralFormValue = {
  list: [
    {
      level: 'school',
      name: '',
      info: '',
      time: '',
    }
  ]
}


interface IProps {
  moralValue?: MoralFormValue;
}

const MoralForm: React.FC<IProps> = (props) => {
  const { moralValue } = props;

  const [score, setScore] = React.useState(0);
  const scoreMap = React.useMemo(() => {
    const temp = new Map();
    moralScoreList.forEach(item => {
      temp.set(item.level, item.score);
    });
    return temp;
  }, []);

  const options = React.useMemo(() => moralScoreList.map(item => ({
    ...item,
    title: `${item.title}  『分数：${item.score}分』`
  })), []);

  const getScore = (moralList: MoralFormValue['list']) => {
    return moralList.reduce((prev, curr) => {
      if (!curr || !curr.level) return prev;
      prev += scoreMap.get(curr.level);
      return prev;
    }, 0);
  };

  const prevScore = React.useMemo(() => getScore(moralValue?.list || []), [props.moralValue]);

  React.useEffect(() => {
    if (prevScore !== score) {
      setScore(prevScore);
    }
  }, []);

  const onValuesChange: FormProps<MoralFormValue>['onValuesChange'] = (_, values) => {
    const currScore = getScore(values.list);
    if (currScore !== score) {
      notification.open({
        message: `最新估算成绩为：${currScore}分`,
        description: '这个成绩仅为依靠当前表单计算得出结果，并不代表最终评审过后的分数',
      });
      setScore(currScore);
    }
  }
  return (
    <section id="moral-form">
      <FormHeader
        title="思想品德成绩"
        score={score}
      />
      <Form
        initialValues={moralValue}
        labelWrap
        onValuesChange={onValuesChange}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        name="moral"
        requiredMark={false}
        validateMessages={validateMessages}
      >
        <Card>
          <FormListSkeleton
            listId=""
            name="list"
            alertMessage="各级表彰均应属思想品德方面"
            title=""
            itemTitle="奖项"
          >
            {
            (field) => (
              <React.Fragment>
                <Form.Item
                  label="奖项级别"
                  name={[field.name, 'level']}
                  rules={[{
                    required: true
                  }]}
                >
                  <Select
                    options={options}
                    fieldNames={{ label: 'title', value: 'level' }}
                    placeholder="请选择奖项级别（必填）"
                  />
                </Form.Item>
                <Form.Item
                  label="奖项具名"
                  name={[field.name, 'name']}
                  rules={[{
                    required: true
                  }]}
                >
                  <Input
                    allowClear
                    placeholder="请输入奖项全名（必填）"
                  />
                </Form.Item>
                <Form.Item
                  label="颁布时间"
                  name={[field.name, 'time']}
                  rules={[{
                    required: true
                  }]}
                >
                  <DatePicker
                    allowClear
                    disabledDate={disabledFormCurrentDate}
                    placeholder="请输入奖项颁布时间（必填）"
                  />
                </Form.Item>
                <Form.Item
                  label="补充信息"
                  name={[field.name, 'info']}
                >
                  <Input.TextArea
                    placeholder="请输入奖项相关信息或者其他说明（非必填项）"
                  />
                </Form.Item>
              </React.Fragment>
            )
          }

          </FormListSkeleton>
        </Card>
      </Form>
    </section >
  );
};

MoralForm.defaultProps = {
  moralValue: defaultFormValue
}

export default MoralForm;