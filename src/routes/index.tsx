import * as React from 'react';
import { AuthProvider, RequireAuth } from './auth.context';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageSpin from '@/components/page-spin';

const ApplicationForm = React.lazy(() => import('pages/application/pages/application-form'));
const ApplicationList = React.lazy(() => import('pages/application/pages/application-list'));
const HandleProcess = React.lazy(() => import('pages/process/pages/handle-process'));
const UploadStudentList = React.lazy(() => import('pages/upload-student-list'));
const InitiateProcess = React.lazy(() => import('@/pages/initiate-process'));
const UserCenter = React.lazy(() => import('pages/user-center'));
const ForgetPassword = React.lazy(() => import('pages/forget-password'));
const Home = React.lazy(() => import('pages/home'));
const Sign = React.lazy(() => import('pages/sign'));
const PageLayout = React.lazy(() => import('@/pages/page-layout'));
const NotFound = React.lazy(() => import('pages/not-found'));

const RoutesCenter: React.FC = () => {

  return (
    <React.Suspense fallback={<PageSpin />}>
      <AuthProvider>
        <Routes>
          {/* 注册登录 */}
          <Route path="sign" element={<Sign />} />
          {/* 忘记密码 */}
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* 首页 */}
          <Route path="/" element={
            <RequireAuth>
              <PageLayout />
            </RequireAuth>
          }>
            <Route index element={<Home />} />
            {/* 用户中心 */}
            <Route path="user" element={<UserCenter />} />
            {/* 申请页面 */}
            <Route path="apply"
            >
              <Route index element={<ApplicationList />} />
              <Route path="form" element={<ApplicationForm />} >
                <Route path=":applyId" element={<ApplicationForm />} />
              </Route>
            </Route>
            <Route path="upload" element={<UploadStudentList />} />
            {/* 评定流程处理 */}
            <Route path="process">
              <Route index element={<HandleProcess />} />
              {/* 发起评定流程 */}
            <Route path="initiate-process" element={<InitiateProcess />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/sign" />} />
        </Routes>
      </AuthProvider>
    </React.Suspense>
  );
};

export default RoutesCenter;