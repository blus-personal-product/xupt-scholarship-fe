import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default {
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
    modules: ['node_modules'],
    mainFiles: ['index'],
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '/src') },
      { find: "components", replacement: path.resolve(__dirname, '/src/components') },
      { find: "pages", replacement: path.resolve(__dirname, '/src/pages') },
      { find: "hooks", replacement: path.resolve(__dirname, '/src/hooks') },
      { find: "types", replacement: path.resolve(__dirname, '/src/types') },
      { find: "utils", replacement: path.resolve(__dirname, '/src/utils') },
      { find: "store", replacement: path.resolve(__dirname, '/src/store') },
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
        target: 'http://123.56.239.54:8096/',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      }
    }
  }
};