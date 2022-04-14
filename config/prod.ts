import { UserConfigExport } from 'vite';
import baseConfig from './base';

const config:UserConfigExport = {
  mode: 'production'
};

export default Object.assign({},baseConfig, config);
