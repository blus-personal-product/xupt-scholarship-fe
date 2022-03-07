/**
 * 进度查看页面
 */
import * as React from 'react';
import { Card } from 'antd';
import ApplyProcessSteps from './components/apply-process-steps';

const HandleProcess: React.FC = () => {
  return (
    <React.Fragment>
      <ApplyProcessSteps />
      <Card
        title="当前流程状态"
      ></Card>
      <Card
        title="当前状态描述"
      ></Card>
      <Card
        title="历史处理信息"
      >
      </Card>
    </React.Fragment>
  )
};

export default HandleProcess;