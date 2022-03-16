import { usePageHeaderContext } from '@/context/page-header';
import { Breadcrumb, PageHeader } from 'antd';
import style from './style.module.less';
import * as React from 'react';
import { cx } from '@/utils';

interface IProps {
  crumbTitle: string[];
}

const AuthPageHeader: React.FC<IProps> = (props) => {
  const { crumbTitle } = props;
  const { children, ...resetProps } = usePageHeaderContext();
  return (
    <PageHeader
      className={
        cx(
          style['page-header'],
          children ? '' : style['sticky-header']
        )
      }
      breadcrumbRender={() => (
        <Breadcrumb>
          {
            crumbTitle.map(item => (
              <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      )}
      {...resetProps}
    >{children}</PageHeader>
  );
};

export default AuthPageHeader;