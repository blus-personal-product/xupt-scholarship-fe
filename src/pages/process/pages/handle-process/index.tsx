/**
 * 进度查看页面
 */
import * as React from 'react';
import { Card, Space } from 'antd';
import ApplyProcessSteps from './components/apply-process-steps';
import ProcessStepInfo from './components/process-step-info';
import style from './style.module.less';

const HandleProcess: React.FC = () => {
  return (
    <Space
      direction="vertical"
      className={style['process-card-space']}
      size="large"
    >
      <ProcessStepInfo
        title="当前流程状态"
      ></ProcessStepInfo>
      <ApplyProcessSteps
        title="评定总流程"
      />

      {/* <Card
        title="当前状态描述"
      ></Card>
      <Card
        title="历史处理信息"
      >
      </Card> */}
    </Space>
  )
};

export default HandleProcess;