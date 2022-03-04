import { usePageHeaderContext } from '@/context/page-header';
import { Breadcrumb, PageHeader } from 'antd';
import style from './style.module.less';
import * as React from 'react';

interface IProps {
  crumbTitle: string[];
}

const AuthPageHeader: React.FC<IProps> = (props) => {
  const { crumbTitle } = props;
  const { title, subTitle, extra } = usePageHeaderContext();
  return (
    <PageHeader
      className={style['page-header']}
      title={title}
      breadcrumbRender={() => (
        <Breadcrumb>
          {
            crumbTitle.map(item => (
              <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      )}
      subTitle={subTitle}
      extra={extra}
    />
  );
};

export default AuthPageHeader;