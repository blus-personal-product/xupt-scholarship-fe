import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import PageNav from '@/components/page-nav';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { PageHeaderProvider } from '@/context/page-header';
import PageHeader from './page-header';
import style from './style.module.less'

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
              <PageHeader
                crumbTitle={crumbTitle}
              />
              <div className={style['main-content-box']}>
                <Outlet />
              </div>
            </PageHeaderProvider>
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
