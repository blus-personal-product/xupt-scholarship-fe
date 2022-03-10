import { Spin, SpinProps } from 'antd';
import * as React from 'react';

const PageSpin:React.FC<SpinProps> = (props) => {
  return (
    <Spin
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      {...props}
    >{props.children}</Spin>
  );
};

export default PageSpin;