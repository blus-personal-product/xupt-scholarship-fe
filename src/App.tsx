import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import RoutesCenter from './routes';
import Footer from 'components/footer';
import './style/main.less';
import FeedBack from './components/feedback';

function App() {
  return (
    <Layout className="app">
      <FeedBack />
      <BrowserRouter>
        <RoutesCenter />
      </BrowserRouter>
      <Footer />
    </Layout>
  );
}

export default App;
