function deepCopy(obj: any) {
  return  JSON.parse(JSON.stringify(obj)) as typeof obj;
}


export default deepCopy;