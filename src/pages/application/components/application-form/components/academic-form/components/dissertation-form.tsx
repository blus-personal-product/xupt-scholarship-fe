/**
 * 公开发表论文表单
 */
import { FormItemProps, Form, Select, Input, DatePicker, DatePickerProps } from 'antd';
import * as C from '../../../config/academic.config';
import * as React from 'react';
import { disabledFormCurrentDate } from '@/config/form';
import FormListSkeleton from '../../form-list-skeleton';
import moment from 'moment';

interface IProps extends FormItemProps {

}

export interface DissertationFormValue {
  level: C.DissertationScoreItem['level'];
  name: string;
  id_number: string;
  time: DatePickerProps['value'];
}

export const dissertationDefaultFormValue: DissertationFormValue = {
  level: 'CCF_A',
  name: '',
  time: moment(),
  id_number: ''
};

const DissertationForm: React.FC<IProps> = (props) => {

  const scientificOptions = React.useMemo(() => C.dissertationScoreList.map(item => ({
    label: `${item.title} 『分数：${item.score}分』`,
    value: item.level,
    score: item.score
  })), []);

  return (
    <FormListSkeleton
      title="公开发表论文"
      name="dissertation"
      itemTitle="论文"
      listId="academic-form-dissertation"
      alertMessage={
        [
          '论文要求研究生为第一作者，或者研究生为第二作者，导师为第一作者',
          'SCI 分区以中科院大类分区为准',
          '中文核心期刊以北京大学出版社出版的《中文核心期刊要目总览》最新目录为准',
          '论文指以西安邮电大学为第一单位',
          '同一篇论文不重复计算，只按最高类别计分',
          '论文必须刊载于国内外正式出版物（不含增刊、专刊）',
          '进入 ESI 计算机科学学科领域 ESI 数据库收录期刊目录中的论文，其分区升一级别认定'
        ]
      }
    >
      {
        (field) => (
          <React.Fragment>
            <Form.Item
              label="期刊类型"
              name={[field.name, "level"]}
            >
              <Select
                options={scientificOptions}
              />
            </Form.Item>
            <Form.Item
              label="论文名称"
              name={[field.name, "name"]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="期刊刊号"
              name={[field.name, "id_number"]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="出版时间"
              name={[field.name, "time"]}
            >
              <DatePicker
                disabledDate={disabledFormCurrentDate}
              />
            </Form.Item>
          </React.Fragment>
        )
      }
    </FormListSkeleton>
  )
};

export default DissertationForm;