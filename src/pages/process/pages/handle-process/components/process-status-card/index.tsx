import { Card } from 'antd';
import * as React from 'react';

interface IProps {
  title: string;
  desc: string;
}

const ProcessStatusCard:React.FC<IProps> = (props) => {
  const {title, desc} = props;
  return (
    <Card title={title} >
      <p>{desc}</p>
    </Card>
  );
};

export default ProcessStatusCard;