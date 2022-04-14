import { PageHeader, PageHeaderProps, Statistic, Tooltip } from 'antd';
import * as React from 'react';
import style from '../style/header.module.less';

interface IProps extends PageHeaderProps {
  title: string;
  expectScore: number;
}

const FormHeader: React.FC<IProps> = (props) => {
  const { title, expectScore: score, ...resetProps } = props;
  return (
    <PageHeader
      {...resetProps}
      className={style['form-score-header']}
      title={title}
      extra={[
        <Tooltip title="估算得分不代表最终得分">
          <Statistic
            key="score"
            title="估算得分"
            value={score}
          />
        </Tooltip>,
      ]}
    />
  );
};

FormHeader.defaultProps = {
  expectScore: 0
};

export default FormHeader;