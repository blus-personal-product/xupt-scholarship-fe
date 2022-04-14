import { UserConfigExport } from 'vite';
import baseConfig from './base';

const config:UserConfigExport = {
  base: '/xupt-scholarship-fe/',
  mode: 'production'
};

export default Object.assign({},baseConfig, config);