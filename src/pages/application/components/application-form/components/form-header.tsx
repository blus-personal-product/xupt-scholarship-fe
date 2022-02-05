import { PageHeader, Statistic } from 'antd';
import * as React from 'react';

interface IProps {
  title: string;
  score: number;
}

const FormHeader: React.FC<IProps> = (props) => {
  const { title, score } = props;
  return (
    <PageHeader
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