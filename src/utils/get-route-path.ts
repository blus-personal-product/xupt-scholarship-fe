/**
 * 获取完整route path
 * @param path 路径
 * @param args route参数
 */
const getRoutePath = (path: string, ...args: any[]) => {
  return ['',...path.split('/').filter(v => v !== ''), ...args].join('/')
}

export default getRoutePath;