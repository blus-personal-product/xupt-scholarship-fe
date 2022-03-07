import * as React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { LinksProcessList, ProcessItem, getProcessList, ProcessStep, StepStatusInfo } from './process.list';
import style from './style.module.less';
import ProcessStatusCard from '../process-status-card';
import ReactDOM from 'react-dom';


interface IProps {
  currentStep: ProcessStep;
}

/**
 * 渲染tooltip模板
 */
const renderToolTipHtml = (data: ProcessItem) => {
  const tagStyle = [
    {
      color: "#08979c",
      background: "#e6fffb",
      borderColor: "#87e8de",
    },
    {
      color: "#096dd9",
      background: "#e6f7ff",
      borderColor: "#91d5ff"
    },
    {
      color: "#531dab",
      background: "#f9f0ff",
      borderColor: "#d3adf7",
    }
  ];
  return `
    <div style="width: 320px;">
      <div style="display:flex;">
        <h4 style="font-weight: 600;">${data.title}</h4>
        <h5
        style="box-shadow:1px 1px 4px #aaa;font-weight: 550;background: ${StepStatusInfo[data.status].color};border: 1px solid ${StepStatusInfo[data.status].border};padding: 0px 4px;margin-left: 8px;border-radius: 2px;"
        >${StepStatusInfo[data.status].text}</h5>
      </div>
      <div style="display: flex;justify-content: space-between;border-bottom: 1px solid #aaa;padding-bottom: 8px;margin: 4px 0;">
        <span>时间：${data.date[0]}~${data.date[1]}</span>
        <ul style="list-style: none;display: flex;">
          ${data.responsible_department.map((item, index) => `
            <li
              style="margin: 0 4px;background: ${tagStyle[index % 3].background};color: ${tagStyle[index % 3].color};border-radius: 2px;box-shadow:1px 1px 4px #ccc;border: 1px solid ${tagStyle[index % 3].borderColor};width: fit-content;padding: 0px 4px;"
              key="${item}-${index}"
            >
              ${item}
            </li>
          `).join('\n')
    }
        </ul>
      </div>
      <p style="width: 100%;white-space: normal;">${data.desc}</p>   
    </div>
  `;
}


const ApplyProcessSteps: React.FC<IProps> = (props) => {
  const processList = React.useMemo(() => getProcessList(), []);
  const chartOptions = React.useMemo(() => ({
    title: {
      text: '奖学金流程'
    },
    tooltip: {
      formatter: (params: any) => {
        const { data } = params;
        return renderToolTipHtml(data);
      }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 64,
        label: {
          show: true,
          overflow: 'breakAll',
          width: 56,
          formatter: (params: any) => {
            return params.data.title;
          }
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: processList,
        links: LinksProcessList,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    ]
  }), [])
  return (
    <Card className={style['process-step-card']}>
      <ReactECharts
        option={chartOptions}
      >
      </ReactECharts>
    </Card>
  );
};

ApplyProcessSteps.defaultProps = {
  currentStep: 'deployment_mobilization_phase'
}

export default ApplyProcessSteps;