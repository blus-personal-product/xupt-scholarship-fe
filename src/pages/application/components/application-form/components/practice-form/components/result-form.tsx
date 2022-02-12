import * as React from 'react';
import * as C from '../../../config/practice.config';
import * as U from '@/utils';
import { DatePicker, DatePickerProps, Form, FormItemProps, Input, InputNumber,Select } from 'antd';
import { disabledFormCurrentDate } from '@/config/form';
import { FormListFieldData } from 'antd/lib/form/FormList';
import moment from 'moment';
import FormListSkeleton from '../../form-list-skeleton';

interface IProps extends FormItemProps {

}

export interface PracticeResultFormValue {
  level: C.ResultScoreItem['level'];
  time: DatePickerProps['value'];
  name: string;
  order: number;
  partners: number;
}

export const practiceResultDefaultFormValue: PracticeResultFormValue = {
  level: 'international',
  time: moment(),
  name: '',
  order: 1,
  partners: 1
}


const isUpdateCooperation = (field: FormListFieldData): FormItemProps['shouldUpdate'] => {
  return (prev, curr) => {
    const depKeyPath = `result[${field.key}].level`;
    return U._get(prev, depKeyPath) !== U._get(curr, depKeyPath);
  }
}

/**
 * 是否是合作成果
 * @param level 成果类型 
 */
const isCooperationLevel = (level: C.ResultScoreItem['level']) => {
  const cooperationLevels: Omit<C.ResultScoreItem['level'], "study_abroad" | "case_library_professional">[]
    = [
      'international',
      'national',
      'industry',
      'invention',
      'utility',
      'software'
    ];
  return cooperationLevels.includes(level);
}

const PracticeResultForm: React.FC<IProps> = (props) => {
  const resultScoreOptions = React.useMemo(() => C.resultScoreList.map(item => ({
    label: `${item.title} 『${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);

  return (
    <FormListSkeleton
      title="实践成果表"
      listId="practice-form-result"
      itemTitle="成果"
      name="result"
      alertMessage=""
    >
      {
        (field) => (
          <React.Fragment>
            <Form.Item
              label="成果类型"
              name={[field.name, "level"]}
            >
              <Select
                options={resultScoreOptions}
              />
            </Form.Item>
            <Form.Item
              label="获奖时间"
              name={[field.name, "time"]}
            >
              <DatePicker
                disabledDate={disabledFormCurrentDate}
              />
            </Form.Item>

            <Form.Item
              label="成果具名"
              name={[field.name, "name"]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={isUpdateCooperation(field)}
            >
              {
                ({ getFieldValue }) => {
                  // 通过确定是否是合作项目来判断是否需要展示合作贡献表单
                  const isShowCooperationFormGroup = isCooperationLevel(getFieldValue(['result', field.name, "level"]));
                  return isShowCooperationFormGroup && (
                    <Form.Item
                      label="合作信息"
                    >
                      <Form.Item
                        noStyle
                        name={[field.name, "order"]}
                      >
                        <InputNumber
                          addonBefore="个人贡献名次"
                          addonAfter="名"
                          min={1}
                        />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, "partners"]}
                        noStyle
                      >
                        <InputNumber
                          addonBefore="团队人数"
                          addonAfter="人"
                          min={1}
                        />
                      </Form.Item>
                    </Form.Item>
                  );
                }
              }
            </Form.Item>
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  );
};

export default React.memo(PracticeResultForm);