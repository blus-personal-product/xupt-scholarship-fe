import * as React from 'react';
import * as C from '../config/practice.config';
import { disabledFormCurrentDate } from '@/config/form';
import { Form, Card, Cascader, Select, Input, Button, DatePicker, Radio } from 'antd';

const PracticeSocialForm: React.FC = () => {

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
    , [])

  return (
    <Card
      title="社会活动表"
    >
      <Form.List
        name="cadre"
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
                              options={cadreOption}
                            />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            name={[field.name, "position"]}
                          >
                            <Input
                              placeholder="职位名称"
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
      <Form.List
        name="activity"
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
                            valuePropName="checked"
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
    </Card>
  )
};

export default PracticeSocialForm;