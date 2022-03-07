import { PageHeader, PageHeaderProps, Statistic } from 'antd';
import * as React from 'react';
import style from '../style/header.module.less';

interface IProps extends PageHeaderProps {
  title: string;
  score: number;
}

const FormHeader: React.FC<IProps> = (props) => {
  const { title, score, ...resetProps } = props;
  return (
    <PageHeader
      {...resetProps}
      className={style['form-score-header']}
      title={title}
      extra={[
        <Statistic
          key="score"
          title="估算得分"
          value={score}
        />
      ]}
    />
  );
};

FormHeader.defaultProps = {
  score: 0
};

export default FormHeader;