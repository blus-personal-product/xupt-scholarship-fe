import { ProcessList, ProcessStep } from '@/pages/process/pages/handle-process/process.list';
import { Card, Form, Input, Space, Tag } from 'antd';
import style from '../../../style.module.less';
import * as React from 'react';
import { disabledFormFeatureDate, requiredRule } from '@/config/form';
import UserSelector from '@/components/user-select';
import FmtDatePicker from '@/components/fmt-date-picker';
import { useProcess } from '@/context/process-status';
import useDisabled from '../../../hooks/use-disabled';

interface IProps {
  name: ProcessStep;
  title: string;
  duration: number;
  processIndex: number;
}

const durationColor = ["green", "blue", "purple"]
const currDurationColor = ["geekblue", "volcano", "gold", "lime"];

const CardFormItem: React.FC<IProps> = (props) => {
  const { name, title, duration, processIndex } = props;
  const formDisabled = useDisabled();
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
          shouldUpdate
        >
          {
            ({ getFieldValue }) => {
              let disableDate = disabledFormFeatureDate;
              if (processIndex > 0) {
                let preIndexDate = getFieldValue(ProcessList[processIndex - 1].step).date || [];
                // 学科办审核、复查和年纪公示同时进行
                if (name === 'examination_and_review_of_the_discipline_office') {
                  preIndexDate = getFieldValue(ProcessList[processIndex - 2].step).date || [];
                }
                if (preIndexDate.length > 0) {
                  disableDate = (current) => {
                    return current && current < preIndexDate[1];
                  }
                }
              }
              return (
                <Form.Item
                  name={[name, "date"]}
                  label="起始时间"
                  rules={requiredRule}
                >
                  <FmtDatePicker
                    disabled={formDisabled}
                    type="range"
                    placeholder={["流程开始时间", "流程截止时间"]}
                    disabledDate={disableDate}
                  />
                </Form.Item>
              );
            }
          }
        </Form.Item>
        <Form.Item shouldUpdate={(prev, curr) => prev !== curr}>
          {
            ({ getFieldValue }) => {
              let currDuration = 0;
              const currDurationDate = getFieldValue(name).date || [];
              if (currDurationDate.length > 0) {
                currDuration = currDurationDate[1].diff(currDurationDate[0], 'days') + 1;
              }
              return (
                <Tag color={
                  currDuration > 0
                    ? durationColor[currDuration % durationColor.length]
                    : currDurationColor[duration % currDurationColor.length]
                }>
                  {
                    currDuration > 0
                      ? `当前流程时长『${currDuration}天』`
                      : (duration > 0 ? (
                        `流程预估时长『${duration}天』`
                      ) : `暂无预期时长`)
                  }
                </Tag>
              )
            }
          }
        </Form.Item>
      </Space>
      <Form.Item
        name={[name, "desc"]}
        label="描述信息"
      >
        <Input.TextArea
          disabled={formDisabled}
          placeholder="请输入该流程对应的描述信息以及相关帮助学生或其他管理者了解该流程的描述性文字"
        />
      </Form.Item>
      <Form.Item
        name={[name, "mentions"]}
        label="通知成员"
      >
        <UserSelector disabled={formDisabled} />
      </Form.Item>
    </Card>
  )
};

export default CardFormItem;