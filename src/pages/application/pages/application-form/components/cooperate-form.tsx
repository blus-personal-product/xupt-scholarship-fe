/**
 * 合作信息表单
 */
import * as React from 'react';
import { Form, InputNumber, Space, Statistic, Tag } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';
import { getCooperationScore } from '../utils';
import * as U from '@/utils';
import { requiredRule } from '@/config/form';

interface IProps {
  field: FormListFieldData;
}

export interface CooperateFormValue {
  order: number;
  partners: number;
}

const CooperateForm: React.FC<IProps> = (props) => {
  const { field, ...resetProps } = props;
  const [cooperateValue, setCooperateValue] = React.useState<CooperateFormValue>({
    order: 1,
    partners: 1,
  })

  const proportion = React.useMemo(() =>
    getCooperationScore(cooperateValue.order, cooperateValue.partners),
    [cooperateValue])

  const updateCooperateValue = (key: keyof CooperateFormValue, value: number) => {
    const prev: CooperateFormValue = U.clone(cooperateValue);
    prev[key] = value;
    setCooperateValue(prev);
  }

  return (
    <Form.Item
      label="合作信息"
      {...resetProps}
    >
      <Space wrap>

        <Form.Item
          noStyle
          name={[field.name, "order"]}
          rules={requiredRule}
        >
          <InputNumber
            addonBefore="个人贡献名次"
            addonAfter="名"
            min={1}
            onChange={(v) => updateCooperateValue('order', v)}
          />
        </Form.Item>
        <Form.Item
          name={[field.name, "partners"]}
          noStyle
          rules={requiredRule}
        >
          <InputNumber
            addonBefore="团队人数"
            addonAfter="人"
            min={1}
            onChange={(v) => updateCooperateValue('partners', v)}
          />
        </Form.Item>
        <Statistic value={proportion * 100} suffix="%" precision={2} />
      </Space>
    </Form.Item>
  );
};

export default CooperateForm;