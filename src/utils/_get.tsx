const _get = (source: any, path: string, defaultValue = undefined) => {
  // a[3].b -> a.3.b -> [a,3,b]
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split('.')
  
  let result = source;
  for (const key of paths) {
    result = Object(result)[key];
    if(result === undefined) {
      return defaultValue;
    }
  }
  return result;
}


export default _get;