import * as React from 'react';
import { AuthProvider, RequireAuth } from './auth.context';
import { Spin } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';

const Application = React.lazy(() => import('pages/application'));
const Home = React.lazy(() => import('pages/home'));
const Sign = React.lazy(() => import('pages/sign'));
const PageLayout = React.lazy(() => import('pages/page-layout'));
const NotFound = React.lazy(() => import('pages/not-found'));

const RoutesCenter: React.FC = () => {

  return (
    <React.Suspense fallback={<Spin />}>
      <AuthProvider>
        <Routes>
          {/* 注册登录 */}
          <Route path="/sign" element={<Sign />} />

          {/* 首页 */}
          <Route path="/" element={
            <RequireAuth>
              <PageLayout />
            </RequireAuth>
          }>
            <Route index element={<Home />} />
            {/* 申请页面 */}
            <Route path="apply"
              element={<Application />}
            />
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