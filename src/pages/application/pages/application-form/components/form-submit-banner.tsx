import * as React from 'react';
import { Button, Anchor, PageHeader } from 'antd';
import { HEADER_NAV_HEIGHT } from '@/config/header';
import style from '../style/header.module.less';

interface IProps {
  permission: FormPermission;
  submit: () => void;
  save: () => void;
}

const FormSubmitBanner: React.FC<IProps> = (props) => {
  const { submit, save, permission } = props;
  return (
    <Anchor
      className={style['form-header-banner']}
      offsetTop={HEADER_NAV_HEIGHT + 2}
    >
      <PageHeader
        title="申请表单"
        className={style["page-header"]}
        extra={[
          <Button
            key="1"
            onClick={save}
          >保存</Button>,
          <Button
            type="primary"
            key="2"
            onClick={submit}
          >提交</Button>,
        ]}
      ></PageHeader>
    </Anchor>
  )
};

export default FormSubmitBanner;