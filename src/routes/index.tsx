import * as React from 'react';
import { Spin } from 'antd';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('pages/home'));
const Login = React.lazy(() => import('pages/login'));

const RoutesCenter: React.FC = () => {
  return (
    <React.Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Suspense>
  );
};

export default RoutesCenter;