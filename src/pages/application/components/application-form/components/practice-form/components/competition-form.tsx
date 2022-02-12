import * as React from 'react';
import * as C from '../../../config/practice.config';
import { disabledFormCurrentDate } from '@/config/form';
import { FormItemProps, Form, DatePicker, Cascader, Input, InputNumber, DatePickerProps } from 'antd';
import moment from 'moment';
import FormListSkeleton from '../../form-list-skeleton';

export interface PracticeCompetitionFormValue {
  level: [C.CompetitionScoreItem['type'], C.CompetitionLevelScoreItem['level']] | [];
  name: string;
  time: DatePickerProps['value'];
  order: number;
  partners: number;
}

export const practiceCompetitionDefaultFormValue: PracticeCompetitionFormValue = {
  level: [],
  name: '',
  time: moment(),
  order: 1,
  partners: 1
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
      alertMessage="仅认可互联网+、挑战杯、中国研究生创新实践系列大赛、陕西省研究生创新成果展。研究生创新成果展与省赛同级"
    >
      {
        (field) => (
          <React.Fragment>
            <Form.Item
              label="竞赛类型"
              name={[field.name, "level"]}
            >
              <Cascader
                placeholder="竞赛类型"
                options={competitionOptions}
              />
            </Form.Item>
            <Form.Item
              label="赛事具名"
              name={[field.name, "name"]}
            >
              <Input />
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
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  );

};

export default PracticeCompetitionForm;