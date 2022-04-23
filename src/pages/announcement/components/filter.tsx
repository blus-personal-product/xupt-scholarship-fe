import { Button, Form, Input, Select, Tag } from 'antd';
import style from '../style.module.less';
import * as React from 'react';
import { SearchOutlined } from '@ant-design/icons';

type ITableShowTag = 'only_score' | 'only_course_credit' | 'first' | 'second' | 'third' | 'national' | 'inspirational';

const tagsData: {
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

const AnnouncementFilter: React.FC = () => {
  const [selectTags, setSelectTags] = React.useState<ITableShowTag[]>([]);
  const handleChange = (tag: ITableShowTag, checked: boolean) => {
    if (checked) {
      const addTags = [...selectTags, tag];
      setSelectTags(addTags);
    } else {
      const delTags = selectTags.filter(v => v !== tag);
      setSelectTags(delTags);
    }
  }
  return (
    <div className={style['filter']}>
      <Form
        layout="inline"
        size="small"
        className={style['form']}
      >
        <Form.Item label="按条件筛选">
        </Form.Item>
        <Form.Item >
          <Input placeholder="学生姓名" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="学生学号" />
        </Form.Item>
        <Form.Item>
          <Select placeholder="年级" />
        </Form.Item>
        <Form.Item>
          <Select placeholder="专业" />
        </Form.Item>
        <Form.Item>
          <Select placeholder="班级" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape="round" icon={<SearchOutlined />}>
            查询数据
          </Button>
        </Form.Item>
      </Form>
      <Form.Item label="按标签选择">
        <div className={style['tag-select']}>
          {
            tagsData.map(tag => (
              <Tag.CheckableTag
                key={tag.key}
                checked={selectTags.indexOf(tag.key) > -1}
                onChange={checked => handleChange(tag.key, checked)}
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