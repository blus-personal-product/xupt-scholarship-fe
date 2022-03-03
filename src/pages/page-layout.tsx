import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import PageNav from '@/components/page-nav';
import Footer from '@/components/footer';
import Header from '@/components/Header';

const PageLayout = () => {
  return (
    <Layout className="base-layout">
      <Header />
      <Layout className="site-layout">
        <Layout.Sider collapsible>
          <PageNav />
        </Layout.Sider>
        <Layout>
          <Layout.Content
            className="layout-content"
          >
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default PageLayout;
