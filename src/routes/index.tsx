import * as React from 'react';
import { AuthProvider, RequireAuth } from './auth.context';
import { Spin } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('pages/home'));
const Sign = React.lazy(() => import('@/pages/sign'));

const RoutesCenter: React.FC = () => {

  return (
    <React.Suspense fallback={<Spin />}>
      <AuthProvider>
        <Routes>
          <Route path="/sign" element={<Sign />} />

          <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="*" element={<Navigate to="/sign" />} />
        </Routes>
      </AuthProvider>
    </React.Suspense>
  );
};

export default RoutesCenter;