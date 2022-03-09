import { ProcessStep } from '@/pages/process/pages/handle-process/process.list';
import { Card, DatePicker, Form, Input, Mentions, Space, Tag } from 'antd';
import style from '../../../style.module.less';
import * as React from 'react';
import { disabledFormFeatureDate } from '@/config/form';

interface IProps {
  name: ProcessStep;
  title: string;
  duration: number;
}

const durationColor = ["green", "blue", "purple", "geekblue", "volcano", "gold", "lime"];

const CardFormItem: React.FC<IProps> = (props) => {
  const { name, title, duration } = props;
  return (
    <Card
      type="inner"
      title={title}
      headStyle={{
        fontWeight: 600
      }}
      hoverable
      className={style['initiate-form-item']}
    >
      <Space align="baseline">
        <Form.Item
          name={[name, "date"]}
          label="起始时间"
        >
          <DatePicker.RangePicker
            placeholder={["流程开始时间", "流程截止时间"]}
            disabledDate={disabledFormFeatureDate}
          />
        </Form.Item>
        <Form.Item>
          <Tag color={durationColor[duration % durationColor.length]}>
            {
              duration > 0 ? (
                `流程预估时长『${duration}天』`
              ) : `暂无预期时长`
            }
          </Tag>
        </Form.Item>
      </Space>
      <Form.Item
        name={[name, "desc"]}
        label="描述信息"
      >
        <Input.TextArea
          placeholder="请输入该流程对应的描述信息以及相关帮助学生或其他管理者了解该流程的描述性文字"
        />
      </Form.Item>
      <Form.Item
        name={[name, ",mentions"]}
        label="通知成员"
      >
        <Mentions
          autoSize
          placeholder="通过@来加入通知成员，例如：@张三"
        >
          <Mentions.Option value="sample">
          </Mentions.Option>
        </Mentions>
      </Form.Item>
    </Card>
  )
};

export default CardFormItem;