# 研究生奖学金前端

## 项目介绍

- 项目依赖管理使用`yarn`而非`npm`;
- 项目采用`Vite`+`React`+`Typescript`+`Less`构建；
- 组件库采用`Ant-Design`；
- 请求管理使用`Axios`并进行自定义封装；
- 项目中的提交加入了`commit lint`检测，提交使用指定的命令行`npm run commit`提交即可；
- 项目中添加了`Less Modules`弥补`React`不支持`style scoped`的缺陷；
- 使用`eslint`和`prettier`进行代码格式化和代码约束
- 动态表单使用`Antd`的`Form.List`实现
- 支持带一级子菜单的页面菜单匹配
- 使用媒体查询进行基本的移动端兼容


## 项目接口信息

[Postman 接口集合](https://xupt-bzy.postman.co/workspace/Team-Workspace~a1923cf2-d37d-41c2-8308-68f2fe254a6f/overview)

## 项目使用

1. 克隆项目
2. 进入项目根目录安装项目依赖

```shell
yarn
// 这里的安装依赖请使用yarn，避免出现项目依赖版本不一致导致项目无法启动的情况
// 安装失败考虑换源，本人使用的是npm原生的源，非淘宝源
```

3. 启动项目

```
//以development环境启动项目
yarn dev
// or npm run dev
```

## 项目设计介绍

### 组件一致性

1. 所有组件均来自于`Antd`以及`Antd`推荐的搭配组件
2. 对于所有的组件采取尽可能少的定制话，避免特殊性

### 长表单数据录入配备左侧大纲

奖学金信息表单页面支持展示左侧的表单快捷导航(仅支持PC端)

### 布局思路

1. 所有的页面布局采用居中展示，对于移动端在不遮挡页面主体内容的情况下进行`flex`布局的排列
2. 表单的布局目前存在一些对齐的因素尚未调整，可以作为一个后续支持项。⏳

## 项目表单处理

### 动态表单处理

1. 对于动态表单封装`FormListSkeleton`将动态表单增删功能进行内聚
2. 对于表单间的计分逻辑进行分别处理，避免进行不同的状态模式判断来进行逻辑运算，降低逻辑模块间的耦合。
  2.1 这里存在可以继续拆解的部分⏳
3. 对于表单的验证进行统一化配置
  3.1 这里可以进行组件的提取和规则的拆分⏳

## 项目配置

### 项目路径别名设置

通过下面的配置可以实现便捷路径（路径别名）访问，比如使用`src/app.tsx`可以使用`@/app.tsx`来访问。

```js
alias: [
      { find: '@', replacement: path.resolve(__dirname, '../src') },
      // ……
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

### 项目权限和页面重定向

因为在`React Router V6`中不再支持`<Redirect />`对页面进行路由重定义，所以使用了`React Router`文档推荐的`Context` + `Navigate`的组合方案，需要进行较多的内容自定义和页面跳转。

页面权限采取`sessionid`的方式来进行验证，即每次登录或者新开页面伴随使用`sessionid`来获取用户信息的过程。

> 为什么不做前端持久化存储来实现鉴权
>
> 前端持久化存储存在用户或者非法插件修改的可能，对于需要进行管理员和普通用户区别的软件，采取这样的方法能带来更好的安全保障。


### Axios封装

对于`Axios`进行基于TS的二次封装，支持对于数据的拦截和`cancelToken`的处理。

```ts
class http {
  instance: AxiosInstance

  constructor(props?: AxiosRequestConfig) {
    this.instance = axios.create(props);
    this.requestInterceptors();
    this.responseInterceptors();
  }

  cancel() {
    //……
  }

  requestInterceptors() {
    //……
  }

  responseInterceptors() {
    // ……
  }

  get<V = undefined>(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.get<V>(url, {
      params: params,
      ...(config ?? {}),
    });
  }
  // ……
}
```