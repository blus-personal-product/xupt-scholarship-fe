import { PageHeaderState, usePageHeaderContext } from '@/context/page-header';
import { useAuth } from '@/routes/auth.context';
import { Descriptions, Tag } from 'antd';
import * as React from 'react';
import DepartmentCard from './components/department-card';
import HandleChartCard from './components/handle-chart.card';
import ProcessInfo from './components/process-info-card';
import QuickStart from './components/quick-start-card';
import style from './style.module.less';

const DashBoard: React.FC = () => {
  const { updatePageHeaderState } = usePageHeaderContext();
  const { user } = useAuth();

  const HeaderProps = React.useMemo<PageHeaderState>(() => ({
    title: user.name,
    avatar: { src: user.avatar, style: { border: '1px solid #aaa' } },
    subTitle: user.student_id + user.manager_id,
    tags: <Tag color="geekblue">{user.identity || '学生'}</Tag>,
    children: (
      <Descriptions>
        <Descriptions.Item label="邮件地址">{user.email}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="所在部门/学院">s</Descriptions.Item>
        <Descriptions.Item label="具体部门/专业">empty</Descriptions.Item>
        <Descriptions.Item label="奖学金状态">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
      </Descriptions>
    ),
  }), [user]);

  React.useEffect(() => {
    updatePageHeaderState(HeaderProps);
    return () => updatePageHeaderState({});
  }, [HeaderProps]);
  
  return (
    <div className={style['dash-page']}>
      <div className={style['left-row']}>
        <ProcessInfo />
        <HandleChartCard />
      </div>
      <div className={style['right-row']}>
        <QuickStart />
        <DepartmentCard />
      </div>
    </div>
  )
};

export default DashBoard;