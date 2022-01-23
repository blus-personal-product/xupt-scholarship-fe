import * as React from 'react';
import SignFrom from './components/sign-form';

const Login: React.FC = () => {
  return(
    <React.Fragment>
      <SignFrom type="register" />
    </React.Fragment>
  )
};

export default Login;