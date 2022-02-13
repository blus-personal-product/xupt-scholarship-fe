/**
 * 出版专著量化分表单
 */
import { FormItemProps, Form, Select, Input, DatePicker, InputNumber, Space, DatePickerProps } from 'antd';
import * as C from '../../../config/academic.config';
import * as React from 'react';
import { disabledFormCurrentDate } from '@/config/form';
import FormListSkeleton from '../../form-list-skeleton';
import moment from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';

interface IProps extends FormItemProps {

}

export interface PublishFormValue {
  level: C.PublishScoreItem['level'];
  name: string;
  time: DatePickerProps['value'];
  publish_house_name: string;
  fonts_count: number;
}

export const publishDefaultFormValue: PublishFormValue = {
  level: 'authoritative_press',
  name: '',
  time: moment(),
  fonts_count: 1,
  publish_house_name: ''
};

const PublishForm: React.FC<IProps> = (props) => {

  const scientificOptions = React.useMemo(() => C.publishScoreList.map(item => ({
    label: `${item.title} 『${item.score}分/万字』`,
    value: item.level,
    score: item.score
  })), []);

  return (
    <FormListSkeleton
      title="出版专著"
      name="publish"
      itemTitle="专著"
      listId="academic-form-publish"
      alertMessage={
        [
          '以西安邮电大学为第一署名单位，参与出版本学科专著、教材、编著或者译著 1 部',
          '出版社级别以西邮党发〔2018〕14 号文件为准',
          '本人承担字数不足 1 万字的计分为 0，超过 1 万字的以整数倍计算分数',
          '在书中必须注明个人工作量'
        ]
      }
    >
      {
        (field) => (
          <React.Fragment>
            <Form.Item
              label="出版社级别"
              name={[field.name, "level"]}
            >
              <Select
                options={scientificOptions}
              />
            </Form.Item>
            <Form.Item
              label="出版社名称"
              name={[field.name, "publish_house_name"]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="专著名称"
              name={[field.name, "name"]}
            >
              <Input />
            </Form.Item>
            <Space>
              <Form.Item
                label="出版时间"
                name={[field.name, "time"]}
              >
                <DatePicker
                  disabledDate={disabledFormCurrentDate}
                />
              </Form.Item>
              <Form.Item
                name={[field.name, "fonts_count"]}
              >
                <InputNumber
                  addonBefore="承担字数"
                  addonAfter="万字"
                  min={1}
                />
              </Form.Item>
            </Space>
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  )
};

export default PublishForm;