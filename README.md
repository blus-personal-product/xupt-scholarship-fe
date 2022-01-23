# 研究生奖学金前端

## 项目介绍

- 项目依赖管理使用`yarn`而非`npm`;
- 项目采用`Vite`+`React`+`Typescript`+`Less`构建；
- 组件库采用`Ant-Design`；
- 请求管理使用`Axios`并进行自定义封装；
- 项目中的提交加入了`commit lint`检测，提交使用指定的命令行`npm run commit`提交即可；
- 项目中添加了`Less Modules`弥补`React`不支持`style scoped`的缺陷；
- 使用`eslint`和`prettier`进行代码格式化和代码约束


## 项目使用

1. 克隆项目
2. 进入项目根目录安装项目依赖

```shell
yarn
// 这里的安装依赖请使用yarn，避免出现项目依赖版本不一致导致项目无法启动的情况
```

3. 启动项目

```
//以development环境启动项目
yarn dev
// or npm run dev
```

## 项目配置

### 项目路径别名设置

通过下面的配置可以实现便捷路径（路径别名）访问，比如使用`src/app.tsx`可以使用`@/app.tsx`来访问。

```js
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
```

### 项目代理设置

通过配置`proxy`中的`target`可以指定代理的后端地址，详细内容可以参考`vite`官网[**`proxy`配置**](https://cn.vitejs.dev/config/#server-proxy)

```ts
server: {
    host: true,
    port: 3096,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      }
    }
  }
```


### 项目提交规范配置

项目提交规范可以通过修改根目录下的`.cz-config.js`配置文件来修改

### 页面懒加载设置

使用`React Lazy`进行懒加载。

```js
const Home = React.lazy(() => import('pages/home'));
const Login = React.lazy(() => import('pages/login'));

const RoutesCenter: React.FC = () => {
  return (
    <React.Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Suspense>
  );
};
```

### `ESlint`配置

对于Eslint执行自动修复，可以查看对应的`package.json`中的`scripts`命令。

```
//检查src下的文件并且进行自动的格式化
npm run lint:fix
```

### Axios封装

对于Axios进行基于TS的二次封装，并且加入关于错误的`Antd Message`提示。

```js
class http {
  instance: AxiosInstance

  constructor(props?: AxiosRequestConfig) {
    this.instance = axios.create(props);
    this.requestInterceptors();
    this.responseInterceptors();
  }

  cancel() {
    const source = axios.CancelToken.source();
    return source;
  }

  requestInterceptors() {
    this.instance.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        // Do something before request is sent
        return config;
      },
      function (error: AxiosError) {
        // Do something with request error
        return Promise.reject(error);
      });
  }

  responseInterceptors() {
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
      },
      function (error: AxiosError) {
        message.error(error.message);
        return Promise.reject(error);
      });
  }

  get<V>(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.get<V>(url, {
      params: params,
      ...(config ?? {}),
    });
  }
  post<V>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.post<V>(url, {
      data: params,
      ...(config ?? {}),
    });
  }
  put<V>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V>(url, {
      data: params,
      ...(config ?? {}),
    })
  }
  delete<V>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V>(url, {
      data: params,
      ...(config ?? {}),
    })
  }
}
```