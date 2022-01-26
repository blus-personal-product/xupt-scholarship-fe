import * as React from 'react';

/**
 * 设置documentTitle
 * @param title document title
 * @param deps title的更新依赖，默认不更新，可不传
 */
const useDocumentTitle = function (title: string, deps?: any[]) {
  React.useEffect(() => {
    document.title = `西邮研究生奖学金 | ${title}`;
  }, deps ?? []);
};

export default useDocumentTitle;