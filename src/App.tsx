import * as React from 'react';
import PageLayout from './page-layout';
import client from 'client/index';
import './style/main.less';

function App() {
  React.useEffect(() => {
    client
      .get('')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <div className="App">
      <PageLayout />
    </div>
  );
}

export default App;
