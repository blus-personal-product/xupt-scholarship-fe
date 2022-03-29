import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { UserConfigExport } from 'vite';

const config: UserConfigExport = {
  plugins: [
    reactRefresh(),
  ],
  css: {
    modules: {
      generateScopedName: 'xupt_sHs[name]__[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '../src') },
      { find: "components", replacement: path.resolve(__dirname, '../src/components') },
      { find: "pages", replacement: path.resolve(__dirname, '../src/pages') },
      { find: "hooks", replacement: path.resolve(__dirname, '../src/hooks') },
      { find: "types", replacement: path.resolve(__dirname, '../src/types') },
      { find: "utils", replacement: path.resolve(__dirname, '../src/utils') },
      { find: "stores", replacement: path.resolve(__dirname, '../src/stores') },
      { find: "client", replacement: path.resolve(__dirname, '../src/client') },
      { find: "service", replacement: path.resolve(__dirname, '../src/service') },
    ]
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'antd',
      'react-router-dom',
      '@ant-design/icons',
      'moment',
      'echarts',
      'echarts-for-react',
      'xlsx',
      'ahooks',
      'query-string',
      'pinyin',
      'react-text-loop-next',
      'axios',
    ]
  },
  build: {
    reportCompressedSize: false,
    cssCodeSplit: true,
    sourcemap: true,
    assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    host: true,
    port: 3096,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8096/',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, ''),
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      }
    }
  }
};

export default config;