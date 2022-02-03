import * as React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderNav from 'components/header-nav';

const PageLayout = () => {
  return (
    <div className="base-layout">
      <HeaderNav />
      <Outlet />
    </div>
  );
};

export default PageLayout;
