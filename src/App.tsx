import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesCenter from './routes';
import Footer from 'components/footer';
import './style/main.less';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesCenter />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
