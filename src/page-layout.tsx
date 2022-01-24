import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCenter from './routes';
import Footer from 'components/footer';

const PageLayout = () => {
  return (
    <div className="base-layout">
      <BrowserRouter>
        <RoutesCenter />
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default PageLayout;
