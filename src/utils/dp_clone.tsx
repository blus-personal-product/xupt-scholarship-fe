function deepCopy(obj: any, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return obj;
  }
  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];
  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((e, i) => {
      res[i] = deepCopy(e);
    });

  } else if (typeof obj === 'object' && obj !== null) {

    res = {};

    for (const key in obj) {

      if (Object.hasOwnProperty.call(obj, key)) {
        (res as any)[key] = deepCopy(obj[key]);
      }
    }
    hash.set(obj, res);
  } else {
    res = obj;
  }
  return res;

}


export default deepCopy;