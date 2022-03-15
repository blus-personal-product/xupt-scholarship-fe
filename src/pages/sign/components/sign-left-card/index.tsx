import * as React from 'react';
import style from '@/pages/sign/style.module.less';
import { HeaderAvatarTitle } from '@/components/header';

const SignLeftCard: React.FC = () => {
  return (
    <React.Fragment>
      <section className={style['sign-left-box']}>
        <div className={style['sign-box-mask']}>
          <div className={style['sign-title-box']}>
            <HeaderAvatarTitle />
          </div>
          <p className={style['sign-info-box']}>
            <span className={style['sign-info-detail']}>追赶时代</span>
            <span className={style['sign-info-detail']}>开创未来</span>
            <span className={style['sign-info-detail']}>服务师生</span>
          </p>
          <p className={style['sign-info-desc']}>
            奖学金申请 / 评定流程管理
            </p>
          <p className={style['sign-info-footer']}>
            版权所有© Copyright 2022 西安邮电大学
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignLeftCard;