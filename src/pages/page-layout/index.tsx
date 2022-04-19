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
import { useAuth } from '@/context/auth.context';

const PageLayout = () => {
  const [crumbTitle, setCrumbTitle] = React.useState<string[]>([]);
  const { user } = useAuth();
  const showModal = React.useMemo(() => [
    !user.user_id,
    !user.name,
    !user.phone,
    user.identity === 'student' && ((!user.student) || !(user.student as IStudentInfo).type)
  ].some(v => v), [user]);
  return (
    <Layout className="base-layout">
      <Header />
      <Modal
        footer={null}
        title="完善用户信息"
        visible={showModal}>
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
                <PageHeader
                  crumbTitle={crumbTitle}
                />
                <div className={style['main-content-box']}>
                  <Outlet />
                </div>
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
