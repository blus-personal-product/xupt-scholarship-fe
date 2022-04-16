import { UserConfigExport } from 'vite';
import baseConfig from './base';

const config:UserConfigExport = {
  mode: 'production',
  base: '/xupt-scholarship-fe/'
};

export default Object.assign({},baseConfig, config);
