import * as React from 'react';
import * as C from '../../../config/practice.config';
import { disabledFormCurrentDate, requiredRule } from '@/config/form';
import { FormItemProps, Form, DatePicker, Cascader, Input, DatePickerProps } from 'antd';
import FormListSkeleton from '../../form-list-skeleton';
import CooperateForm, { CooperateFormValue } from '../../cooperate-form';
import UploadDragger from '@/components/upload-file';
import { UploadFile } from 'antd/lib/upload/interface';
import { FORMAT_DATE } from '@/config/time';
import FmtDatePicker from '@/components/fmt-date-picker';

export interface PracticeCompetitionFormValue extends CooperateFormValue {
  level: [C.CompetitionScoreItem['type'], C.CompetitionLevelScoreItem['level']] | [];
  name: string;
  time: DatePickerProps['value'];
  files: UploadFile[];
}

export const practiceCompetitionDefaultFormValue: PracticeCompetitionFormValue = {
  level: [],
  name: '',
  time: FORMAT_DATE,
  order: 1,
  partners: 1,
  files: []
}

interface IProps extends FormItemProps {

}

const PracticeCompetitionForm: React.FC<IProps> = (props) => {

  const competitionOptions = React.useMemo(() => C.competitionScoreList.map(item => ({
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
      name="competition"
      itemTitle="竞赛"
      title="竞赛信息表"
      listId="practice-form-competition"
      alertMessage={[
        '仅认可互联网+、挑战杯、中国研究生创新实践系列大赛、陕西省研究生创新成果展',
        '研究生创新成果展与省赛同级'
      ]}
    >
      {
        (field) => (
          <React.Fragment>
            <Form.Item
              label="竞赛类型"
              name={[field.name, "level"]}
              rules={requiredRule}
            >
              <Cascader
                placeholder="竞赛类型"
                options={competitionOptions}
              />
            </Form.Item>
            <Form.Item
              label="赛事具名"
              name={[field.name, "name"]}
              rules={requiredRule}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="获奖时间"
              name={[field.name, "time"]}
              rules={requiredRule}
            >
              <FmtDatePicker
                disabledDate={disabledFormCurrentDate}
              />
            </Form.Item>
            <CooperateForm
              field={field}
            />
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

export default PracticeCompetitionForm;