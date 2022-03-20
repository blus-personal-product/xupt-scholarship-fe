/**
 * 获奖信息表
 */
import UploadDragger from '@/components/upload-dragger';
import { disabledFormCurrentDate, requiredRule } from '@/config/form';
import { DATE_FORMAT_NORMAL, FORMAT_DATE } from '@/config/time';
import { Cascader, DatePickerProps, Form, Input } from 'antd';
import FmtDatePicker from '@/components/fmt-date-picker';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import * as C from '../../../config/academic.config';
import FormListSkeleton from '../../form-list-skeleton';

export interface AwardFormValue {
  level: [C.AwardScoreItem['type'], C.AwardLevelScoreItem['level']] | [];
  name: string;
  time: DatePickerProps['value'];
  files: UploadFile[];
}

export const awardDefaultFormValue: AwardFormValue = {
  level: [],
  name: '',
  time: FORMAT_DATE,
  files: [],
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
              <FmtDatePicker
                disabledDate={disabledFormCurrentDate}
                format={DATE_FORMAT_NORMAL}
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
  );
};

export default AwardForm;

