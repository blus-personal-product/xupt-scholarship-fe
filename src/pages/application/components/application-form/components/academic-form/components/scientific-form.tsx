/**
 * 科研项目量化分表单
 */
import { FormItemProps, Form, Select, Input, DatePicker } from 'antd';
import * as C from '../../../config/academic.config';
import * as React from 'react';
import { disabledFormCurrentDate } from '@/config/form';
import FormListSkeleton from '../../form-list-skeleton';
import { TextLoop } from 'react-text-loop-next';

interface IProps extends FormItemProps {

}

const ScientificForm: React.FC<IProps> = (props) => {

  const scientificOptions = React.useMemo(() => C.ScientificScoreList.map(item => ({
    label: `${item.title} 『分数：${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);
  return (
    <FormListSkeleton
      title="科研项目"
      name="scientific"
      itemTitle="项目"
      listId="academic-form-scientific"
      alertMessage={
        ['每名学生参加教师科研项目量化分总计不超过 1 篇 SCI 2 区收录(期刊)的标准',
          '学校提供的配套经费一律不计分']}
    >
      {
        (field) => (
          <React.Fragment>
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
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  )
};

export default ScientificForm;