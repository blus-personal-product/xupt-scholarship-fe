/**
 * 科研项目量化分表单
 */
import { Card, FormItemProps, Form, Select, Input, Button, DatePicker } from 'antd';
import * as C from '../../../config/academic.config';
import * as React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { disabledFormCurrentDate } from '@/config/form';

interface IProps extends FormItemProps {

}

const ScientificForm: React.FC<IProps> = (props) => {
  const { ...resetProps } = props;
  const scientificOptions = React.useMemo(() => C.ScientificScoreList.map(item => ({
    label: `${item.title} 『分数：${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);
  return (
    <Card
      title="科研项目"
    >
      <Form.Item
        noStyle
        {...resetProps}
      >
        <Form.List
          name="scientific"
        >
          {
            (fields, { add, remove }) => {
              return (
                <React.Fragment>
                  {
                    fields.map(field => (
                      <Card
                        title={`项目 ${field.name + 1}`}
                        type="inner"
                        extra={
                          <Button
                            type="primary"
                            danger
                            shape="circle"
                            onClick={() => remove(field.name)}
                            icon={<DeleteOutlined />}
                            size="small"
                          />
                        }

                      >
                        <Form.Item
                          label="项目类型"
                          name={[field.name, "level"]}
                        >
                          <Select
                            options={scientificOptions}
                          />
                        </Form.Item>
                        <Form.Item
                          label="项目名称"
                          name={[field.name, "name"]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="项目时间"
                          name={[field.name, "time"]}
                        >
                          <DatePicker.RangePicker
                            disabledDate={disabledFormCurrentDate}
                          />
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
                    添加项目
                    </Button>
                </React.Fragment>
              )
            }
          }
        </Form.List>
      </Form.Item >
    </Card >
  );
};

export default ScientificForm;