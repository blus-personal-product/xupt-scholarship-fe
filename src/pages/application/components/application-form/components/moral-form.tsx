/**
 * 思想品德成绩表
 */
import * as React from 'react';
import { Form, Input, Select, DatePicker, Button, Card } from 'antd';
import { MoralScoreList } from '../config/moral.config';
import { PlusOutlined } from '@ant-design/icons';

const MoralForm: React.FC = () => {
  const options = React.useMemo(() => MoralScoreList.map(item => ({
    ...item,
    label: item.title,
    value: item.level
  })), [])
  return (
    <React.Fragment>
      思想品德计分标准
      <Form
        labelWrap
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        name="moral"
        requiredMark={false}
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
                      <Card
                        title={`奖项${field.key + 1}`}
                        key={field.key}
                        extra={
                          <Button
                            onClick={() => remove(field.name)}
                          >
                            删除
                          </Button>
                        }
                      >
                        <Form.Item
                          label="奖项级别"
                          name={[field.name, 'level']}
                        >
                          <Select
                            placeholder="请选择奖项级别（必填）"
                            options={options}
                          />
                        </Form.Item>
                        <Form.Item
                          label="奖项具名"
                          name={[field.name, 'name']}
                        >
                          <Input
                            allowClear
                            placeholder="请输入奖项全名（必填）"
                          />
                        </Form.Item>
                        <Form.Item
                          label="颁布时间"
                          name={[field.name, 'time']}
                        >
                          <DatePicker
                            allowClear
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
  );
};

export default MoralForm;