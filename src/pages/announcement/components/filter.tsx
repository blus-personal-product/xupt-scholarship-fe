import { Button, Form, FormInstance, Input, Select, Space, Tag } from 'antd';
import style from '../style.module.less';
import * as React from 'react';
import { FileExcelOutlined, SearchOutlined } from '@ant-design/icons';
import { IFilterSelectOptions } from '..';

export type IShipType = 'first' | 'second' | 'third' | 'national' | 'inspirational'
export type ITableShowTag = 'only_score' | 'only_course_credit' | IShipType;

export const tagsData: {
  label: string;
  key: ITableShowTag;
}[] = [
    {
      label: '只看总成绩',
      key: 'only_score',
    },
    {
      label: '只看学位课成绩',
      key: 'only_course_credit'
    },
    {
      label: '一等奖',
      key: 'first',
    },
    {
      label: '二等奖',
      key: 'second',
    },
    {
      label: '三等奖',
      key: 'third',
    },
    {
      label: '国家奖学金',
      key: 'national',
    },
    {
      label: '励志奖学金',
      key: 'inspirational',
    },
  ];


interface IProps {
  filter: () => void;
  formRef: FormInstance;
  download: () => void
  filterOpt: IFilterSelectOptions;
  tagChange: (tag: ITableShowTag, checked: boolean) => void;
  selectTags: ITableShowTag[];
}

const AnnouncementFilter: React.FC<IProps> = (props) => {
  const { filter, formRef, filterOpt, selectTags, tagChange, download } = props;

  return (
    <div className={style['filter']}>
      <Form
        form={formRef}
        layout="inline"
        size="small"
        className={style['form']}
      >
        <Form.Item label="按条件筛选">
        </Form.Item>
        <Form.Item name="name" >
          <Input placeholder="学生姓名" />
        </Form.Item>
        <Form.Item name="student_id">
          <Input placeholder="学生学号" />
        </Form.Item>
        <Form.Item name="grade">
          <Select allowClear options={filterOpt.grade} className={style['select-value']} placeholder="年级" />
        </Form.Item>
        <Form.Item name="professional">
          <Select allowClear options={filterOpt.professional} className={style['select-value']} placeholder="专业" />
        </Form.Item>
        <Form.Item name="class">
          <Select allowClear options={filterOpt.class} className={style['select-value']} placeholder="班级" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={filter} type="primary" shape="round" icon={<SearchOutlined />}>
              查询数据
          </Button>
            <Button onClick={download} type="default" icon={<FileExcelOutlined />}>
              下载数据
          </Button>
          </Space>
        </Form.Item>
      </Form>
      <Form.Item label="按标签选择">
        <div className={style['tag-select']}>
          {
            tagsData.map(tag => (
              <Tag.CheckableTag
                key={tag.key}
                checked={selectTags.indexOf(tag.key) > -1}
                onChange={checked => tagChange(tag.key, checked)}
              >
                {tag.label}
              </Tag.CheckableTag>
            ))
          }
        </div>
      </Form.Item>
    </div>
  )
};

export default AnnouncementFilter;