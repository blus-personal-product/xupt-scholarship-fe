import * as React from 'react';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Tag, TagProps } from 'antd';

export type ITagStatus = "success" | "processing" | "error" | "default" | "warning" | "stop" | "waiting"

const STATUS_INFO: {
  status: ITagStatus;
  color: TagProps['color'];
  icon: TagProps['icon']
}[] = [
    {
      status: 'success',
      color: 'success',
      icon: <CheckCircleOutlined />
    },
    {
      status: 'processing',
      color: 'processing',
      icon: <SyncOutlined spin />
    },
    {
      icon: < CloseCircleOutlined />,
      status: "error",
      color: "error"
    },
    {
      icon: <ExclamationCircleOutlined />,
      status: "warning",
      color: "warning",
    },
    {
      icon: <ClockCircleOutlined />,
      color: "default",
      status: "waiting"
    },
    {
      icon: <MinusCircleOutlined />,
      color: "default",
      status: "stop"
    }
  ];

interface IProps {
  status: ITagStatus;
  text?: TagProps['children']
}

const StatusTag: React.FC<IProps> = (props) => {
  const { status, text } = props;
  const tagInfo = React.useMemo(() => STATUS_INFO.find(item => item.status === status) ,[status])
  return (
    <Tag icon={tagInfo?.icon} color={tagInfo?.color}>
      {text || tagInfo?.status}
    </Tag>
  );
};

export default StatusTag;
