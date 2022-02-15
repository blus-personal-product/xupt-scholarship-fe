import * as React from 'react';

/**
 * 创建map
 */
const useScoreMap = (scoreList: any[], dep: any[] = []): Map<string, number> => {
  const scoreMap = React.useMemo(() => {
    const temp = new Map();
    scoreList.forEach(item => {
      if (item.score) {
        temp.set(item.level, item.score);
      } else if (item.children && Array.isArray(item.children)) {
        (item.children as any[]).map(child => {
          temp.set(`${item.type}-${child.level}`, child.score);
        })
      }
    });
    return temp;
  }, [...dep]);
  return scoreMap;
};

export default useScoreMap;