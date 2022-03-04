import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import PageNav from '@/components/page-nav';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { PageHeaderProvider } from '@/context/page-header';
import AuthPageHeader from './page-headear';

const PageLayout = () => {
  const [crumbTitle, setCrumbTitle] = React.useState<string[]>([]);
  return (
    <Layout className="base-layout">
      <Header />
      <Layout className="site-layout">
        <PageNav
          updateCrumbTitle={setCrumbTitle}
        />
        <Layout>
          <Layout.Content
            className="layout-content"
          >
            <PageHeaderProvider>
              <AuthPageHeader
                crumbTitle={crumbTitle}
              />
              <Outlet />
            </PageHeaderProvider>
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
