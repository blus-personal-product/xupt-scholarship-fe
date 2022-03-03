/**
 * 思想品德成绩表
 */
import * as React from 'react';
import { Form, Input, Select, DatePicker, Card, FormProps } from 'antd';
import { moralScoreList, MoralScoreItem } from '../../config/moral.config';
import FormHeader from '../form-header';
import { FormValue } from '../../types/form';
import { disabledFormCurrentDate, requiredRule, baseFormConf } from '@/config/form';
import FormListSkeleton from '../form-list-skeleton';
import useScoreMap from '../../hooks/use-score-map';
import { useApplicationContext } from '../../context/application.context';
import UploadDragger from '@/components/upload-dragger';
import { UploadFile } from 'antd/lib/upload/interface';

type MoralFormItemValue = {
  level: MoralScoreItem['level'];
  name: string;
  info: string;
  time: string;
  files: UploadFile[];
}

export type MoralFormValue = FormValue<MoralFormItemValue>;

const defaultFormValue: MoralFormValue = {
  list: [
    {
      level: 'school',
      name: '',
      info: '',
      time: '',
      files: [],
    }
  ]
}


interface IProps {
  moralValue?: MoralFormValue;
}

const MoralForm: React.FC<IProps> = (props) => {
  const { moralValue } = props;
  const { moralForm } = useApplicationContext();
  const [score, setScore] = React.useState(0);
  const scoreMap = useScoreMap(moralScoreList, []);

  const options = React.useMemo(() => moralScoreList.map(item => ({
    ...item,
    title: `${item.title}  『分数：${item.score}分』`
  })), []);

  const getScore = (moralList: MoralFormValue['list']) => {
    return moralList.reduce((prev, curr) => {
      if (!curr || !curr.level) return prev;
      prev += (scoreMap.get(curr.level) || 0);
      return prev;
    }, 0);
  };

  const currScore = React.useMemo(() => getScore(moralValue?.list || []), [moralValue]);

  React.useEffect(() => {
    if (currScore !== score) {
      setScore(currScore);
    }
  }, [moralValue]);

  const onValuesChange: FormProps<MoralFormValue>['onValuesChange'] = (_, values) => {
    const currScore = getScore(values.list);
    if (currScore !== score) {
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
        {...baseFormConf}
        initialValues={moralValue}
        onValuesChange={onValuesChange}
        name="moral"
        form={moralForm}
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
                    rules={requiredRule}
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
                    rules={requiredRule}
                  >
                    <Input
                      allowClear
                      placeholder="请输入奖项全名（必填）"
                    />
                  </Form.Item>
                  <Form.Item
                    label="颁布时间"
                    name={[field.name, 'time']}
                    rules={requiredRule}
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
                  <UploadDragger
                    formProps={{
                      label: "文件",
                      name: [field.name, "files"]
                    }}
                  />
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