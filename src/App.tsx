import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCenter from './routes';
import './style/main.less';
import FeedBack from './components/feedback';

function App() {
  return (
    <div className="app">
      <FeedBack />
      <BrowserRouter>
        <RoutesCenter />
      </BrowserRouter>
    </div>
  );
}

export default App;
