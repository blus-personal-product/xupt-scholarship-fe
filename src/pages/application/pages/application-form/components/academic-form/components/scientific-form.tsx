/**
 * 科研项目量化分表单
 */
import { FormItemProps, Form, Select, Input, DatePicker, Space, InputNumber } from 'antd';
import * as C from '../../../config/academic.config';
import * as React from 'react';
import { disabledFormCurrentDate, requiredRule } from '@/config/form';
import FormListSkeleton from '../../form-list-skeleton';
import moment from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import CooperateForm, { CooperateFormValue } from '../../cooperate-form';

interface IProps extends FormItemProps {

}

export interface ScientificFormValue extends CooperateFormValue {
  level: C.ScientificScoreItem['level'];
  name: string;
  time: RangePickerProps<moment.MomentInput>['value'];
  funds_actually_received: number;
  funds_due: number;
  distribute: number;
}

export const scientificDefaultFormValue: ScientificFormValue = {
  level: 'bureau',
  name: '',
  time: [moment(), moment()],
  order: 1,
  partners: 1,
  distribute: 0,
  funds_due: 0,
  funds_actually_received: 0
};

/**
 * 是否是经费项目
 */
const isPaymentProject = (level: C.ScientificScoreItem['level']) =>
  ["national", "provincial", "bureau"].includes(level);



const ScientificForm: React.FC<IProps> = (props) => {

  const scientificOptions = React.useMemo(() => C.scientificScoreList.map(item => ({
    label: `${item.title} 『分数：${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);

  return (
    <FormListSkeleton
      title="科研项目"
      name="scientific"
      itemTitle="项目"
      listId="academic-form-scientific"
      alertMessage={
        [
          '每名学生参加教师科研项目量化分总计不超过 1 篇 SCI 2 区收录(期刊)的标准',
          '学校提供的配套经费一律不计分',
          '西安邮电大学研究生创新基金项目，研究生必须为主持人（参与人不计分）'
        ]
      }
    >
      {
        (field) => (
          <React.Fragment>
            <Form.Item
              label="项目类型"
              name={[field.name, "level"]}
              rules={requiredRule}
            >
              <Select
                options={scientificOptions}
              />
            </Form.Item>
            <Form.Item
              label="项目名称"
              name={[field.name, "name"]}
              rules={requiredRule}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="项目时间"
              name={[field.name, "time"]}
              rules={requiredRule}
            >
              <DatePicker.RangePicker
                disabledDate={disabledFormCurrentDate}
              />
            </Form.Item>
            <Form.Item
              label="项目经费"
            >
              <Space wrap>
                <Form.Item
                  noStyle
                  name={[field.name, "funds_actually_received"]}
                  rules={requiredRule}
                >
                  <InputNumber
                    addonBefore="实到经费"
                    addonAfter="万元"
                    placeholder="实际到款"
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  noStyle
                  name={[field.name, "funds_due"]}
                  rules={requiredRule}
                >
                  <InputNumber
                    addonBefore="应到经费"
                    addonAfter="万元"
                    placeholder="预期到款"
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  name={[field.name, "distribute"]}
                  noStyle
                  rules={requiredRule}
                >
                  <InputNumber
                    addonBefore="本人分配"
                    addonAfter="万元"
                    min={0}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <CooperateForm
              field={field}
            />
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  )
};

export default ScientificForm;