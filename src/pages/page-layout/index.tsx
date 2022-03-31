import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Modal } from 'antd';
import PageNav from '@/components/page-nav';
import Footer from '@/components/footer';
import Header from '@/components/header';
import UpdateUserInfo from '@/components/update-user-info';
import { PageHeaderProvider } from '@/context/page-header';
import PageHeader from './page-header';
import style from './style.module.less'
import { UserListProvider } from '@/context/user-list';
import { useAuth } from '@/routes/auth.context';
import ProcessProvider from '@/context/process-status';

const PageLayout = () => {
  const [crumbTitle, setCrumbTitle] = React.useState<string[]>([]);
  const { user } = useAuth();
  return (
    <Layout className="base-layout">
      <Header />
      <Modal
        footer={null}
        title="完善用户信息"
        visible={!user.name}>
        <UpdateUserInfo
          formValue={user}
        />
      </Modal>
      <Layout className="site-layout">
        <PageNav
          updateCrumbTitle={setCrumbTitle}
        />
        <Layout>
          <Layout.Content
            className="layout-content"
          >
            <PageHeaderProvider>
              <UserListProvider>
                <ProcessProvider>
                  <PageHeader
                    crumbTitle={crumbTitle}
                  />
                  <div className={style['main-content-box']}>
                    <Outlet />
                  </div>
                </ProcessProvider>
              </UserListProvider>
            </PageHeaderProvider>
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
