import { cx } from '@/utils';
import { Card, Popover, Tag } from 'antd';
import { PresetColorTypes } from 'antd/lib/_util/colors';
import * as React from 'react';
import style from '../style.module.less';

const DepartmentInfoList: {
  title: string;
  email: string;
  phone: string;
  addr: string;
}[] = (new Array(12).fill({
  title: '校研究生院',
  email: 'test-email@xupt.edu.cn',
  phone: '010-443-445',
  addr: '长安校区东区教学楼D-4443'
})).map(((item, index) => ({
  ...item,
  email: index + item.email,
  title: index * ('99' as any) + item.title
})));

const colors = PresetColorTypes;
const colorsLen = colors.length;

const DepartmentCard: React.FC = () => {
  return (
    <Card
      className={cx(style['info-card'], style['department-card'])}
      title="评审负责部门信息"
    >
      <div className={style['department-list-box']}>
        {
          DepartmentInfoList.map((department, index) => (
            <div key={department.email}>
              <Popover content={
                <div>
                  <p>邮箱：{department.email}</p>
                  <p>电话：{department.phone}</p>
                  <p>地址：{department.addr}</p>
                </div>
              } title="联系方式">
                <Tag
                  color={colors[index % (colorsLen - 1)]}
                  closable
                >
                  {department.title}
                </Tag>
              </Popover>
            </div>
          ))
        }
      </div>
    </Card>
  )
};

export default DepartmentCard;