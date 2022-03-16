/**
 * 用于组合多个className
 * @param classNames class类名
 */
const cx = function (...classNames: string[]) {
  return classNames.join(' ');
};

export default cx;