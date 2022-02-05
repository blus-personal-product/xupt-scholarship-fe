/**
 * 思想品德成绩表
 */
import * as React from 'react';
import { Form, Input, Select, DatePicker, Button, Card, PageHeader, Statistic, FormProps, notification } from 'antd';
import { moralScoreList, MoralScoreItem } from '../config/moral.config';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { validateMessages, disabledFormCurrentDate } from '@/config/form';

type MoralFormItemValue = {
  level: MoralScoreItem['level'];
  name: string;
  info: string;
  time: string;
}

interface MoralFormValue {
  list: MoralFormItemValue[];
}

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

const MoralForm: React.FC = () => {

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

  const onValuesChange: FormProps<MoralFormValue>['onValuesChange'] = (value, values) => {
    const currScore = values.list.reduce((prev, curr) => {
      if (!curr || !curr.level) return prev;
      prev += scoreMap.get(curr.level);
      return prev;
    }, 0);
    if (currScore !== score) {
      notification.open({
        message: `最新估算成绩为：${currScore}分`,
        description: '这个成绩仅为依靠当前表单计算得出结果，并不代表最终评审过后的分数',
      });
      setScore(currScore);
    }
  }
  return (
    <PageHeader
      title="思想品德得分"
      extra={[
        <Statistic
          title="估算得分"
          value={score}
        />
      ]}
    >
      <Form
        initialValues={defaultFormValue}
        labelWrap
        onValuesChange={onValuesChange}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        name="moral"
        requiredMark={false}
        validateMessages={validateMessages}
      >
        <Form.List
          name="list"
        >
          {
            (fields, { add, remove }) => {
              return (
                <React.Fragment>
                  {
                    fields.map(field => (
                      <React.Fragment key={field.key}>
                        <Card
                          title={`奖项${field.key + 1}`}
                          key={field.key}
                          extra={
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => remove(field.name)}
                            >
                              删除
                          </Button>
                          }
                        >
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
                        </Card>
                      </React.Fragment>
                    ))
                  }
                  <Form.Item
                    noStyle
                  >
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加获奖
                    </Button>
                  </Form.Item>
                </React.Fragment>
              );
            }
          }
        </Form.List>
      </Form>
    </PageHeader>
  );
};

export default MoralForm;