import * as React from 'react';
import * as C from '../config/practice.config';
import { disabledFormCurrentDate } from '@/config/form';
import { Form, Card, Cascader, Select, Input, Button, DatePicker, Radio, FormItemProps, Alert, Typography } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import moment from 'moment';

const { Paragraph } = Typography;

export interface CadreFormItemValue {
  level: [C.SocialCadreLevel, string] | [];
  department: string;
}

export interface ActivityFormItemValue {
  level: C.SocialActivityLevel;
  name: string;
  time: RangePickerProps<moment.MomentInput>['value'];
}

export interface PracticeSocialFormValue {
  cadre: CadreFormItemValue[];
  activity: ActivityFormItemValue[];
}

export const practiceSocialFormDefaultValue: PracticeSocialFormValue = {
  cadre: [{
    level: [],
    department: '',
  }],
  activity: [{
    level: 'college_activities',
    name: '',
    time: [moment(), moment()]
  }]
}


interface IProps extends FormItemProps {

}

const PracticeSocialForm: React.FC<IProps> = (props) => {
  const { ...resetProps } = props;
  const cadreOption = React.useMemo(
    () => {
      const scoreList = C.SocialScoreList
        .find(item => item.type === 'cadre');
      return scoreList?.children.map(item => {
        return {
          label: `${C.SocialCadreMap[item.level as C.SocialCadreLevel]} 『分数：${item.score}分』`,
          value: item.level,
          score: 30,
          children: (item.title as string[]).map(t => ({
            label: t,
            value: t,
          }))
        }
      });
    }, []);

  const activityOption = React.useMemo(() =>
    C.SocialScoreList
      .find(item => item.type === 'activity')
      ?.children.map(item => ({
        label: `${item.title}『${item.score}分』`,
        value: item.level,
        score: 30,
      }))
    , []);

  return (
    <Card
      title="社会活动表"
    >
      <Alert
        message="因解职、辞职、免职使任职时间不足一届的 2/3 的学生干部不予加分，增补、升任的干部按任职时间在 2/3 以上的职务计分"
        type="info"
        showIcon
      />
      <Form.Item
        {...resetProps}
        noStyle
      >
        <Form.List
          name={["social", "cadre"]}
        >
          {
            (fields, { add, remove }) => {
              return (
                <React.Fragment>
                  {
                    fields.map(field => {
                      return (
                        <React.Fragment>
                          <Form.Item
                            label={`职位 ${field.key + 1}`}
                          >
                            <Form.Item
                              noStyle
                              name={[field.name, "level"]}
                            >
                              <Cascader
                                placeholder="职位级别"
                                options={cadreOption}
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[field.name, "department"]}
                            >
                              <Input
                                placeholder="所属组织/部门/学院"
                              />
                            </Form.Item>
                          </Form.Item>
                        </React.Fragment>
                      );
                    })
                  }
                  <Button onClick={() => add()} >add</Button>
                </React.Fragment>
              )
            }
          }
        </Form.List>
        <Alert
          message="备注："
          description={
            <Typography>
              <Paragraph>
                <ol>
                  <li>
                    社会工作计分按照学生干部的实际工作情况给分，兼任多项学生工作职务者计最高分，不累加
                  </li>
                  <li>
                    参加社会活动量化分由学生工作办公室认定
                  </li>
                </ol>
              </Paragraph>
            </Typography>
          }
          type="info"
          showIcon
        />
        <Form.List
          name={["social", "activity"]}
        >
          {
            (fields, { add, remove }) => {
              return (
                <React.Fragment>
                  {
                    fields.map(field => {
                      return (
                        <React.Fragment>
                          <Form.Item
                            label={`活动 ${field.key + 1}`}
                          >
                            <Form.Item
                              noStyle
                              name={[field.name, "level"]}
                            >
                              <Radio.Group
                                buttonStyle="solid"
                                options={activityOption}
                                optionType="button"
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[field.name, "name"]}
                            >
                              <Input
                                placeholder="活动名称"
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[field.name, "time"]}
                            >
                              <DatePicker.RangePicker
                                disabledDate={disabledFormCurrentDate}
                                placeholder={["活动开始时间", "活动终止时间"]}
                              />
                            </Form.Item>
                          </Form.Item>
                        </React.Fragment>
                      );
                    })
                  }
                  <Button onClick={() => add()} >add Activity</Button>
                </React.Fragment>
              )
            }
          }
        </Form.List>
      </Form.Item>
    </Card>
  )
};

export default PracticeSocialForm;