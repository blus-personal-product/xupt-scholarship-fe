import { Badge } from 'antd';
import * as React from 'react';

export type IStatus = 'success' | 'fail' | 'warning' | 'error' | 'finish';

const STATUS_INFO: {
  text: string;
  status: IStatus;
  color: string;
}[] = [
    {
      text: '成功',
      status: 'success',
      color: 'green'
    },
    {
      text: '失败',
      status: 'fail',
      color: '#f5222d'
    },
    {
      text: '注意',
      status: 'warning',
      color: 'volcano'
    },
    {
      text: '错误',
      status: 'error',
      color: 'red'
    },
    {
      text: '完成',
      status: 'finish',
      color: '#aaa'
    }
  ];

interface IProps extends React.PropsWithChildren<{}> {
  status: IStatus;
  text?: string;
}

/**
 * 带有状态的徽标
 */
const StatusBadge: React.FC<IProps> = (props) => {
  const { children, status, text } = props;
  const statusInfo = React.useMemo(() => STATUS_INFO.find(i => i.status === status), [status])
  return (
    <Badge.Ribbon
      text={text || statusInfo?.text}
      color={statusInfo?.color}
      >
      {children}
    </Badge.Ribbon>
  )
};

export default StatusBadge;