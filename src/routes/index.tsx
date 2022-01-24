import * as React from 'react';
import { Spin } from 'antd';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('pages/home'));
const Sign = React.lazy(() => import('@/pages/sign'));

const RoutesCenter: React.FC = () => {
  return (
    <React.Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </React.Suspense>
  );
};

export default RoutesCenter;