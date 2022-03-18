import { cx } from '@/utils';
import { Button, Card, Col, Form, FormProps, Input, Row, Select, SelectProps } from 'antd';
import * as React from 'react';
import style from '@/pages/upload-student-list/style.module.less';

interface IProps {
  data: FilterFormValue;
  updateRules: (value: FilterFormValue) => void;
  options: SelectProps['options'];
}

export interface FilterFormValue {
  name?: string;
  student_id?: string;
  professional: string;
}

const Filter: React.FC<IProps> = (props) => {
  const { data, updateRules } = props;
  const [form] = Form.useForm<FilterFormValue>();
  const options = React.useMemo(() => [{ label: '全部', value: 'all' }, ...(props.options || [])], [props.options]);

  const onValuesChange: FormProps['onValuesChange'] = (_, values) => {
    updateRules(values as any);
  }

  return (
    <Card
      title="筛选信息"
      className={style['filter-card']}
    >
      <Form
        form={form}
        initialValues={data}
        onValuesChange={onValuesChange}
        className={cx("ant-advanced-search-form", style['filter-area'])}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              name="name"
              label="姓名"
            >
              <Input
                placeholder="可查询多个姓名，使用空格进行分隔"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="student_id"
              label="学号"
            >
              <Input
                placeholder="可查询多个学号，使用空格进行分隔"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="professional"
              label="专业"
            >
              <Select
                options={options}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button
              onClick={() => {
                form.setFieldsValue({
                  name: '',
                  student_id: '',
                  professional: 'all',
                });
              }}
            >
              清空
          </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Filter;