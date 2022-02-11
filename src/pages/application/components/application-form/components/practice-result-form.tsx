import * as React from 'react';
import * as C from '../config/practice.config';
import * as U from '@/utils';
import { Button, Card, Col, DatePicker, Form, FormItemProps, Input, InputNumber, Row, Select } from 'antd';
import { disabledFormCurrentDate } from '@/config/form';
import { FormListFieldData } from 'antd/lib/form/FormList';

interface IProps extends FormItemProps {

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
  const { ...resetProps } = props;

  const resultScoreOptions = React.useMemo(() => C.resultScoreList.map(item => ({
    label: `${item.title} 『${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);

  return (
    <Card
      title="实践成果表"
    >
      <Form.Item {...resetProps} noStyle>
        <Form.List
          name="result"
        >
          {
            (fields, { add, remove }) => {
              return (
                <React.Fragment>
                  {
                    fields.map(field => (
                      <Form.Item
                        label={`成果 ${field.key + 1}`}
                      >
                        <Row>
                          <Col span={16}>
                            <Form.Item
                              noStyle
                              name={[field.name, "level"]}
                            >
                              <Select
                                options={resultScoreOptions}
                              />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              noStyle
                              name={[field.name, "time"]}
                            >
                              <DatePicker
                                disabledDate={disabledFormCurrentDate}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item
                          noStyle
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
                      </Form.Item>
                    ))
                  }
                  <Button onClick={() => add()} >add R</Button>
                </React.Fragment>
              )
            }
          }
        </Form.List>
      </Form.Item>
    </Card>
  );
};

export default React.memo(PracticeResultForm);