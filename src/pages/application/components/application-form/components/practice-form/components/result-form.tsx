import * as React from 'react';
import * as C from '../../../config/practice.config';
import * as U from '@/utils';
import { Alert, Button, Card, Col, DatePicker, DatePickerProps, Form, FormItemProps, Input, InputNumber, Row, Select } from 'antd';
import { disabledFormCurrentDate } from '@/config/form';
import { FormListFieldData } from 'antd/lib/form/FormList';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

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
  const { ...resetProps } = props;

  const resultScoreOptions = React.useMemo(() => C.resultScoreList.map(item => ({
    label: `${item.title} 『${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);

  return (
    <Card
      title="实践成果表"
      id="practice-form-result"
    >
      <Alert
        message="实践成果中专利需授权，标准需获批立项。实践成果应明确标注西安邮电大学。"
        type="info"
        showIcon
      />
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
                      <Card
                        title={`成果 ${field.key + 1}`}
                        type="inner"
                      >
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
                      </Card>
                    ))
                  }
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加成果
                    </Button>
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