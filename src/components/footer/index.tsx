import * as React from 'react';
import { Layout } from 'antd';

import style from "./index.module.less";

const Footer: React.FC = () => {
  const isAbsolute = location.pathname === '/sign';
  return (
    <Layout.Footer className={isAbsolute ? style['footer'] : ''}>
      版权所有© Copyright 2022 baiziyu-fe　email:baiziyu-fe@outlook.com
    </Layout.Footer>
  )
};

export default Footer;