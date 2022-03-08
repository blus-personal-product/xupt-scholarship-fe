import { Card, Descriptions } from 'antd';
import * as React from 'react';
import { ProcessStep, CurrentDate } from '../../process.list';
import style from '../../style.module.less';

interface IProps {
  title: string;
  processInfoList: ProcessInfo[];
}

interface ProcessInfo {
  step: ProcessStep;
  date: [string, string];
  manager: {
    name: string;
    email: string;
    avatar: string;
  }[];
  processingRatio: string;
  dailyProcessingRate: number;
  desc: string;
}

const ProcessStepInfo: React.FC<IProps> = (props) => {
  const { title, processInfoList } = props;
  return (
    <Card
      className={style['process-step-card']}
    >
      {
        processInfoList.map(info => (
          <Descriptions
            key={info.step}
            title={
              <div
                className={style['card-title']}
              >{title}</div>
            }
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="当前流程">{info.step}</Descriptions.Item>
            <Descriptions.Item label="处理时长">{info.date[0]}</Descriptions.Item>
            <Descriptions.Item label="处理人">{info.manager.map(m => m.name).join(',')}</Descriptions.Item>
            <Descriptions.Item label="预期处理截至时间">{info.date[1]}</Descriptions.Item>
            <Descriptions.Item label="当前处理比例">{info.processingRatio}</Descriptions.Item>
            <Descriptions.Item label="日处理速率">{info.dailyProcessingRate}</Descriptions.Item>
            <Descriptions.Item label="流程描述">{info.desc}</Descriptions.Item>
          </Descriptions>
        ))
      }
    </Card>
  );
};

ProcessStepInfo.defaultProps = {
  processInfoList: [
    {
      step: 'deployment_mobilization_phase',
      date: CurrentDate,
      manager: [{
        name: '-',
        email: '-',
        avatar: '-',
      }],
      processingRatio: '0/0',
      dailyProcessingRate: 0,
      desc: ''
    }
  ]
}

export default ProcessStepInfo;