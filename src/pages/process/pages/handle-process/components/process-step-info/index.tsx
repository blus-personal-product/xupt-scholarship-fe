import { Avatar, Card, Descriptions, DescriptionsProps, Empty, message, Tag, Tooltip } from 'antd';
import * as React from 'react';
import * as api from '@/service/process';
import { ProcessStep, CurrentDate, ProcessList } from '../../process.list';
import style from '../../style.module.less';
import { useProcess } from '@/context/process-status';
import { useAuth } from '@/context/auth.context';
import { useUserListContext } from '@/context/user-list';

interface IProps extends DescriptionsProps {
  title: string;
}

export interface ProcessInfo {
  responsible_department: string[];
  title: string;
  step: ProcessStep;
  date: [string, string];
  manager: {
    name: string;
    email: string;
    avatar: string;
  }[];
  processingRatio: string;
  dailyProcessingRate: number;
  desc: string[];
}

const defaultProcessInfoList: ProcessInfo[] = [
  {
    responsible_department: [],
    title: '尚未开始',
    step: 'deployment_mobilization_phase',
    date: CurrentDate,
    manager: [{
      name: '-',
      email: '-',
      avatar: '-',
    }],
    processingRatio: '0/0',
    dailyProcessingRate: 0,
    desc: [],
  }
]

const ProcessStepInfo: React.FC<IProps> = (props) => {
  const { title, ...resetProps } = props;
  const { list } = useUserListContext();
  const { process_id, step } = useProcess();
  const [processInfoList, setProcessInfoList] = React.useState<ProcessInfo[]>(defaultProcessInfoList);
  const [loading, setLoading] = React.useState(false);
  const getUserInfo = (email: string) => {
    return list.find(item => item.email === email) || {};
  }
  const getProcessInfo = (step: string) => (ProcessList.find(item => item.name === step) || {} as any);

  const getProcess = async () => {
    try {
      setLoading(true);
      const { form } = await api.getProcessData(process_id);
      const initValue = form.form.filter((v) => v.step === step).map(v => {
        const info = getProcessInfo(v.step);
        return {
          ...info,
          ...v,
          desc: [v.desc, info?.desc || ''].filter(v => !!v),
          manager: v.mentions?.map(t => getUserInfo(t))
        }
      }) as ProcessInfo[];
      setProcessInfoList(initValue);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getProcess();
  }, [process_id, step]);

  return (
    <Card
      className={style['process-step-card']}
      loading={loading}
      title={
        <div
          className={style['card-box-title']}
        >{
            !!processInfoList.length ? "当前处理流程" : null
          }</div>
      }
    >
      {
        !processInfoList.length
          ? <Empty />
          : processInfoList.map(info => (
            <Descriptions
              key={info.step}
              title={
                <div
                  className={style['card-title']}
                >{title}</div>
              }
              bordered
              {...resetProps}
            >
              <Descriptions.Item label="当前流程">{info.title}</Descriptions.Item>
              <Descriptions.Item label="开始时间">{info.date[0]}</Descriptions.Item>
              <Descriptions.Item label="预期处理截至时间">{info.date[1]}</Descriptions.Item>
              <Descriptions.Item label="处理人">
                <Avatar.Group>
                  {info.manager.map(m => (
                    <Tooltip key={m.email} title={`${m.name} | ${m.email}`} placement="top">
                      <Avatar src={m.avatar} />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </Descriptions.Item>
              <Descriptions.Item label="主体成员">{
                info.responsible_department.map(item => (
                  <Tag key={item} color="geekblue">{item}</Tag>
                ))
              }</Descriptions.Item>
              <Descriptions.Item label="流程描述">
                {
                  info.desc.map(item => (
                    <span key={item}>{item}</span>
                  ))
                }
              </Descriptions.Item>
            </Descriptions>
          ))
      }
    </Card>
  );
};

ProcessStepInfo.defaultProps = {
}

export default ProcessStepInfo;