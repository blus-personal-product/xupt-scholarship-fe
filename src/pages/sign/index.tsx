/**
 * 登录注册页面
 */
import * as React from 'react';
import { Card } from 'antd';
import * as H from '@/hooks';

import SignFrom from './components/sign-form';
import { ISignFormProps } from './components/sign-form';

import style from './index.module.less';
import './index.less';

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

  H.useDocumentTitle(activeTabKey === 'login' ? "登录": "注册", [activeTabKey])

  return (
    <div className={`${style['sign-page']} sign`}>
      <Card
        hoverable
        className={style['sign-tab-card']}
        loading={loading}
        tabList={tabList}
        activeTabKey={activeTabKey}
        tabProps={{centered: true}}
        onTabChange={key => setActiveTabKey(key as ITabKey)}
      >
        <SignFrom
          type={activeTabKey}
          setLoading={setLoading}
        />
      </Card>
    </div>
  )
};

export default Login;