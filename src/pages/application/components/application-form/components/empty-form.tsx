import { Card, Empty } from 'antd';
import * as React from 'react';

interface IProps {
  title: string;
}

const EmptyForm: React.FC<IProps> = (props) => {
  return (
    <Card>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={`无${props.title}`}
      >
      </Empty>
    </Card>
  );
};

export default EmptyForm;