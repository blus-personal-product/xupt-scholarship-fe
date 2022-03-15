/**
 * 登录注册页面
 */
import * as React from 'react';
import { Card } from 'antd';
import * as H from '@/hooks';

import SignFrom from './components/sign-form';
import { ISignFormProps } from './components/sign-form';

import style from './style.module.less';
import SignLeftCard from './components/sign-left-card';

type ITabKey = ISignFormProps['type'];

const tabList = [
  {
    key: 'login',
    tab: '登录',
  },
  {
    key: 'register',
    tab: '注册'
  }
];

const Login: React.FC = () => {

  const [loading, setLoading] = React.useState(false);
  const [activeTabKey, setActiveTabKey] = React.useState<ITabKey>('login');

  H.useDocumentTitle(activeTabKey === 'login' ? "登录" : "注册", [activeTabKey])

  return (
    <div className={style['sign']}>
      <SignLeftCard />
      <div
        className={style['sign-form-page']}
      >
        <div className={style['sign-form-header']}>
          <div> Welcome~ </div>
          <p>Xi'an University of Posts and Telecommunications Graduate Scholarship Evaluation System.</p>
        </div>
        <Card
          hoverable
          className={style['sign-tab-card']}
          loading={loading}
          tabList={tabList}
          activeTabKey={activeTabKey}
          tabProps={{ centered: true }}
          onTabChange={key => setActiveTabKey(key as ITabKey)}
        >
          <SignFrom
            type={activeTabKey}
            setLoading={setLoading}
          />
        </Card>
      </div>
    </div>
  )
};

export default Login;