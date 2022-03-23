import * as React from 'react';
import { Typography, Divider, Card } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import style from '../../style.module.less';
import { ProcessList } from '../../../handle-process/process.list';
import { ApplyProcessCharts } from '../../../handle-process/components/apply-process-steps';

const textCenter = style['text-center'];
const textIndent = style['text-indent'];

const ConfirmProcess: React.FC = () => {
  const processSteps = React.useMemo(() => ProcessList.map(item => item.title).join('，'), [])
  return (
    <Card
      style={{
        marginBottom: 30
      }}
      headStyle={{
        fontWeight: 600
      }}
      bodyStyle={{
        padding: '100px 120px'
      }}
      hoverable
    >
      <Typography>
        <Title className={textCenter} level={3}>《奖学金流程发起说明书》</Title>
        <Paragraph>
          <Text className={textCenter}>
            本说明书仅用于使用该系统发起研究生奖学金评定流程以及后续的流程管理，对于说明书中相关内容存疑可以致电对应研究生院办公室电话进行咨询。
          </Text>
        </Paragraph>
        <Title level={4}>
          1. 流程发起说明
        </Title>
        <Typography className={textIndent}>
          流程包含12个阶段，分别是{processSteps}。
          流程顺序执行如下图，当前支持同时执行学科办审核、复查和年级公示两个部分同时进行进行。
        </Typography>
        <ApplyProcessCharts title="" currentStep="deployment_mobilization_phase" />
        <Title level={4}>
          2. 流程进行说明
        </Title>
        <Typography className={textIndent}>
          流程在开始前会陆续向下一流程的参与人员（管理人员以及研究生）发送邮件通知，并且告知对应的操作方式。
          流程在进行至个人申请阶段后开放个人申请奖学金通道（申请奖学金→发起申请），支持研究生按照个人实际情况进行填写和完善对应的申请信息。
          <Text strong>在其他非自评阶段，不会开启申请奖学金通道。</Text>
        </Typography>
        <Title level={4}>
          3. 奖学金审核、复查
        </Title>
        <Typography>
          奖学金审核、复查包括个人自评时在评定流程中流程管理进行审批和处理，对于存疑的信息进行异常处理，通知对应的研究生处理。
        </Typography>
        <Title level={4}>
          4. 流程修改说明
        </Title>
        <Paragraph className={textIndent} >
          在确认创建奖学金评定流程后，流程距离进入第一阶段（部署动员阶段）的24小时之前，可以进行流程的修改和撤销。
          <Text mark>在流程创建后进行对应的修改和撤销操作，都会被认为当前的操作是一种风险操作。</Text>
        </Paragraph>
      </Typography>
      <Typography className={textIndent}>
        <Text strong>
          在本系统的所有流程管理以及对应的通知，都是采用邮件进行通知和反馈，希望对应的参与人员在流程开始后能及时核对个人奖学金信息。
          对于存疑的个人信息可进入用户中心进行修改和反馈。
        </Text>
      </Typography>
    </Card>
  );
};

export default ConfirmProcess;