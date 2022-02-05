import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderNav from 'components/header-nav';

const PageLayout = () => {
  return (
    <div className="base-layout">
      <HeaderNav />
      <Layout.Content
        className="layout-content"
      >
        <Outlet />
      </Layout.Content>
    </div>
  );
};

export default PageLayout;
