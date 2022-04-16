import { PageHeaderState, usePageHeaderContext } from '@/context/page-header';
import { useAuth } from '@/context/auth.context';
import { Descriptions, Tag } from 'antd';
import * as React from 'react';
import DepartmentCard from './components/department-card';
import HandleChartCard from './components/handle-chart.card';
import ProcessInfo from './components/process-info-card';
import QuickStart from './components/quick-start-card';
import style from './style.module.less';
import moment from 'moment';


const IdentityMap: Record<IUser['identity'], string> = {
  student: "学生",
  manager: "管理员",
  'student,manager': "学生管理员"
}

const DashBoard: React.FC = () => {
  const { updatePageHeaderState } = usePageHeaderContext();
  const { user } = useAuth();
  const HeaderProps = React.useMemo<PageHeaderState>(() => ({
    title: user.name,
    avatar: { src: user.avatar, style: { border: '1px solid #aaa' } },
    subTitle: user.user_id,
    tags: <Tag color="geekblue">{IdentityMap[user.identity] || "游客"}</Tag>,
    children: (
      <Descriptions>
        <Descriptions.Item label="邮件地址">{user.email}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="所在部门/学院">{user.student?.college || user.manager?.department}</Descriptions.Item>
        <Descriptions.Item label="具体部门/专业">{user.student?.professional || user.manager?.office}</Descriptions.Item>
        <Descriptions.Item label="班级/职位">
          {
            user.identity === 'manager'
              ? (user.manager?.position)
              : (moment(user.student?.grade).format("YYYY") + " 级 " + user.student?.class + "班")
          }
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