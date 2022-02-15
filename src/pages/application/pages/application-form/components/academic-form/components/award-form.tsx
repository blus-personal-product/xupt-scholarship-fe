/**
 * 获奖信息表
 */
import { disabledFormCurrentDate, requiredRule } from '@/config/form';
import { Cascader, DatePicker, DatePickerProps, Form, Input, Select } from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as C from '../../../config/academic.config';
import FormListSkeleton from '../../form-list-skeleton';

export interface AwardFormValue {
  level: [C.AwardScoreItem['type'], C.AwardLevelScoreItem['level']] | [];
  name: string;
  time: DatePickerProps['value'];
}

export const awardDefaultFormValue: AwardFormValue = {
  level: [],
  name: '',
  time: moment(),
}

const AwardForm: React.FC = () => {

  const awardOptions = React.useMemo(() => C.awardScoreList.map(item => ({
    label: item.title,
    value: item.type,
    children: item.children.map(item => ({
      label: `${item.title} 『${item.score}分』`,
      value: item.level,
      score: item.score
    }))
  })), []);

  return (
    <FormListSkeleton
      name="award"
      title="荣获奖项"
      itemTitle="奖项"
      listId="academic-form-award"
      alertMessage={[
        '社会力量奖以国家科学技术奖励办公室的公告为准',
        '具有国家级成果奖励申报资格的权威协会获奖，按相应的省部级奖励对待'
      ]}
    >
      {
        field => (
          <React.Fragment>
            <Form.Item
              label="奖项类别"
              rules={requiredRule}
              name={[field.name, "level"]}
            >
              <Cascader
                options={awardOptions}
              />
            </Form.Item>
            <Form.Item
              label="奖项具名"
              rules={requiredRule}
              name={[field.name, "name"]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="获奖时间"
              rules={requiredRule}
              name={[field.name, "time"]}
            >
              <DatePicker
                disabledDate={disabledFormCurrentDate}
              />
            </Form.Item>
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  );
};

export default AwardForm;

