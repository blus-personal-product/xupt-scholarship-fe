import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCenter from './routes';
import './style/main.less';
import { Provider } from 'react-redux';
import FeedBack from './components/feedback';
import { GlobalStore } from '@/stores';

function App() {
  return (
    <div className="app">
      <Provider store={GlobalStore}>
        <FeedBack />
        <BrowserRouter>
          <RoutesCenter />
        </BrowserRouter>
      </Provider>
      ?
    </div>
  );
}

export default App;
