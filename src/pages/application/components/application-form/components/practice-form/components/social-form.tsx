import * as React from 'react';
import * as C from '../../../config/practice.config';
import { disabledFormCurrentDate } from '@/config/form';
import { Form, Card, Cascader, Input, Button, DatePicker, Radio, FormItemProps, Alert } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import moment from 'moment';
import { TextLoop } from 'react-text-loop-next';
import { PlusOutlined } from '@ant-design/icons';

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
      id="practice-form-social"
    >
      <Alert
        style={{
          height: 64
        }}
        message={
          <TextLoop mask noWrap={false}>
            <div>社会工作计分按照学生干部的实际工作情况给分，兼任多项学生工作职务者计最高分，不累加</div>
            <div>因解职、辞职、免职使任职时间不足一届的 2/3 的学生干部不予加分，增补、升任的干部按任职时间在 2/3 以上的职务计分</div>
          </TextLoop>
        }
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
                <section id="practice-form-social-cadre">
                  {
                    fields.map(field => {
                      return (
                        <Card
                          title={`职位 ${field.key + 1}`}
                          type="inner"
                        >
                          <Form.Item
                            label="职位级别"
                            name={[field.name, "level"]}
                          >
                            <Cascader
                              placeholder="职位级别"
                              options={cadreOption}
                            />
                          </Form.Item>
                          <Form.Item
                            label="所属部门"
                            name={[field.name, "department"]}
                          >
                            <Input
                              placeholder="所属组织/部门/学院"
                            />
                          </Form.Item>
                        </Card>
                      );
                    })
                  }
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加职位
                    </Button>
                </section>
              )
            }
          }
        </Form.List>
        <Alert
          message="参加社会活动量化分由学生工作办公室认定"
          type="info"
          showIcon
          style={{
            marginTop: 24
          }}
        />
        <Form.List
          name={["social", "activity"]}
        >
          {
            (fields, { add, remove }) => {
              return (
                <section id="practice-form-social-activity">
                  {
                    fields.map(field => {
                      return (
                        <React.Fragment>
                          <Card
                            title={`活动 ${field.key + 1}`}
                            type="inner"
                          >
                            <Form.Item
                              label="活动类型"
                              name={[field.name, "level"]}
                            >
                              <Radio.Group
                                buttonStyle="solid"
                                options={activityOption}
                                optionType="button"
                              />
                            </Form.Item>
                            <Form.Item
                              label="活动名称"
                              name={[field.name, "name"]}
                            >
                              <Input
                                placeholder="活动名称"
                              />
                            </Form.Item>
                            <Form.Item
                              label="活动时间"
                              name={[field.name, "time"]}
                            >
                              <DatePicker.RangePicker
                                disabledDate={disabledFormCurrentDate}
                                placeholder={["活动开始时间", "活动终止时间"]}
                              />
                            </Form.Item>
                          </Card>
                        </React.Fragment>
                      );
                    })
                  }
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加活动
                    </Button>
                </section>
              )
            }
          }
        </Form.List>
      </Form.Item>
    </Card>
  )
};

export default PracticeSocialForm;