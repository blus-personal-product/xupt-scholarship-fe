# 研究生奖学金前端

## 项目介绍

- 项目依赖管理使用`yarn`而非`npm`;
- 项目采用`Vite`+`React`+`Typescript`+`Less`构建；
- 组件库采用`Arco-Design`；
- 请求管理使用`Axios`并进行自定义封装；
- 项目中的提交加入了`commit lint`检测，提交使用指定的命令行`npm run commit`提交即可；
- 项目中添加了`Less Modules`弥补`React`不支持`style scoped`的缺陷；


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
      { find: '@', replacement: path.resolve(__dirname, '/src') },
      { find: "components", replacement: path.resolve(__dirname, '/src/components') },
      { find: "pages", replacement: path.resolve(__dirname, '/src/pages') },
      { find: "hooks", replacement: path.resolve(__dirname, '/src/hooks') },
      { find: "types", replacement: path.resolve(__dirname, '/src/types') },
      { find: "utils", replacement: path.resolve(__dirname, '/src/utils') },
      { find: "stores", replacement: path.resolve(__dirname, '/src/stores') },
```

### 项目代理设置

通过配置`proxy`中的`target`可以指定代理的后端地址，详细内容可以参考`vite`官网[**`proxy`配置**](https://cn.vitejs.dev/config/#server-proxy)

### 项目提交规范配置

项目提交规范可以通过修改根目录下的`.cz-config.js`配置文件来修改