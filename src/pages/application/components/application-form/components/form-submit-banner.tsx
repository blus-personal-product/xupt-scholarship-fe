import * as React from 'react';
import { Button, Anchor, PageHeader } from 'antd';

const FormSubmitBanner: React.FC = () => {
  return (
    <Anchor>
      <PageHeader
        className="site-page-header"
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="1">保存</Button>,
          <Button key="2">提交</Button>,
        ]}
      ></PageHeader>
    </Anchor>
  )
};

export default FormSubmitBanner;