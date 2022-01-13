import * as React from 'react';
import { BrowserRouter } from "react-router-dom";
import RoutesCenter from './routes';

const PageLayout = () => {
  return (
    <BrowserRouter>
      <RoutesCenter />
    </BrowserRouter>
  );
};

export default PageLayout;