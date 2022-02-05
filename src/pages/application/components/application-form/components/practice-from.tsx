/**
 * 实践活动表
 */
import * as React from 'react';
import { FormValue } from '../types/form';
import FormHeader from './form-header';
import * as C from '../config/practice.config';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { disabledFormCurrentDate } from '@/config/form';

interface PracticeFormItemValue {
  category: 'social' | 'competition' | 'result';
  list: {
    info: string;
    name: string;
    type: C.CompetitionScoreItem['type'] | C.ResultScoreItem['level'] | C.SocialScoreItem['type'];
    list: {
      info: string;
      name: string;
      level: C.SocialLevelScoreItem['level'] | C.CompetitionLevelScoreItem['level']
    }[];
  }[];
}

type PracticeFormValue = FormValue<PracticeFormItemValue>;

interface IProps {
  practiceValue?: PracticeFormValue;
}

const defaultFormValue: PracticeFormValue = {
  list: [
    {
      category: 'result',
      list: [
        {
          type: 'international',
          info: '',
          name: '',
          list: []
        }
      ],
    }
  ]
}

const PracticeForm: React.FC<IProps> = (props) => {
  const { practiceValue } = props;
  return (
    <React.Fragment>
      <FormHeader
        title="实践活动成绩"
        score={0}
      />
      <Form
        name="practice"
        initialValues={practiceValue}
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
                              options={[]}
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
    </React.Fragment>
  )
};

PracticeForm.defaultProps = {
  practiceValue: defaultFormValue
}

export default PracticeForm;