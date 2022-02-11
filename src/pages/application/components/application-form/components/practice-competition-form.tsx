import * as React from 'react';
import * as C from '../config/practice.config';
import { disabledFormCurrentDate } from '@/config/form';
import { Card, FormItemProps, Form, DatePicker, Cascader, Input, InputNumber, Button, DatePickerProps } from 'antd';

export interface PracticeCompetitionFormValue {
  level: [C.CompetitionScoreItem['type'], C.CompetitionLevelScoreItem['level']];
  name: string;
  time: DatePickerProps['value'];
  order: number;
  partners: number;
}[]

interface IProps extends FormItemProps {

}

const PracticeCompetitionForm: React.FC<IProps> = (props) => {

  const { ...resetProps } = props;
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
    <Card
      title="竞赛信息表"
    >
      <Form.Item {...resetProps} noStyle>
        <Form.List
          name="competition"
        >
          {
            (fields, { add, remove }) => {
              return (
                <React.Fragment>
                  {
                    fields.map(field => (
                      <Form.Item
                        label={`竞赛 ${field.key + 1}`}
                      >
                        <Form.Item
                          noStyle
                          name={[field.name, "level"]}
                        >
                          <Cascader
                            options={competitionOptions}
                          />
                        </Form.Item>
                        <Form.Item
                          noStyle
                          name={[field.name, "name"]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          noStyle
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
                      </Form.Item>
                    ))
                  }
                  <Button onClick={() => add()} >add C</Button>
                </React.Fragment>
              )
            }
          }
        </Form.List>
      </Form.Item>
    </Card>
  );

};

export default PracticeCompetitionForm;