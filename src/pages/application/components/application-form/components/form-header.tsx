import { PageHeader, PageHeaderProps, Statistic } from 'antd';
import * as React from 'react';

interface IProps extends PageHeaderProps {
  title: string;
  score: number;
}

const FormHeader: React.FC<IProps> = (props) => {
  const { title, score, ...resetProps } = props;
  return (
    <PageHeader
      {...resetProps}
      title={title}
      extra={[
        <Statistic
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