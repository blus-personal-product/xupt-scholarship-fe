import { UserConfigExport } from 'vite';
import baseConfig from './base';

const config:UserConfigExport = {
  mode: 'development',
};

export default Object.assign({}, baseConfig, config);