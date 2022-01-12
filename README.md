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