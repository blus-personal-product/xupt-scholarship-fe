import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCenter from './routes';

const PageLayout = () => {
  return (
    <div className="base-layout">
      <BrowserRouter>
        <RoutesCenter />
      </BrowserRouter>
    </div>
  );
};

export default PageLayout;
