import * as React from 'react';
import * as C from '../../../config/practice.config';
import * as U from '@/utils';
import { DatePicker, DatePickerProps, Form, FormItemProps, Input, Select } from 'antd';
import { disabledFormCurrentDate, requiredRule } from '@/config/form';
import { FormListFieldData } from 'antd/lib/form/FormList';
import moment from 'moment';
import FormListSkeleton from '../../form-list-skeleton';
import CooperateForm, { CooperateFormValue } from '../../cooperate-form';
import UploadDragger from '@/components/upload-dragger';
import { UploadFile } from 'antd/lib/upload/interface';

interface IProps extends FormItemProps {

}

export interface PracticeResultFormValue extends CooperateFormValue {
  level: C.ResultScoreItem['level'];
  time: DatePickerProps['value'];
  name: string;
  order: number;
  partners: number;
  files: UploadFile[];
}

export const practiceResultDefaultFormValue: PracticeResultFormValue = {
  level: 'international',
  time: moment(),
  name: '',
  order: 1,
  partners: 1,
  files: []
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
export const isCooperationLevel = (level: C.ResultScoreItem['level']) => {
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
              rules={requiredRule}
            >
              <Select
                options={resultScoreOptions}
              />
            </Form.Item>
            <Form.Item
              label="获奖时间"
              name={[field.name, "time"]}
              rules={requiredRule}
            >
              <DatePicker
                disabledDate={disabledFormCurrentDate}
              />
            </Form.Item>

            <Form.Item
              label="成果具名"
              name={[field.name, "name"]}
              rules={requiredRule}
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
                    <CooperateForm
                      field={field}
                    />
                  );
                }
              }
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

export default React.memo(PracticeResultForm);