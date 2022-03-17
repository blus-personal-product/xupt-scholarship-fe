import { cx } from '@/utils';
import { Card } from 'antd';
import * as React from 'react';
import style from '../style.module.less';
import ReactEcharts from 'echarts-for-react';

const HandleChartCard: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: true, title: "展示数据" },
        magicType: { show: true, type: ['line', 'bar']},
        saveAsImage: { show: true, title: "保存为图片" }
      }
    },
    legend: {
      data: ['水量', '降雨量', '温度']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '降雨量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: '水量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: string) {
            return value + ' ml';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: '降雨量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: string) {
            return value + ' ml';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: '温度',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: string) {
            return value + ' °C';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };
  return (
    <Card
      className={cx(style['info-card'], style['chart-card'])}
      title="日处理速率"
    >
      <ReactEcharts
        option={option}
      />
    </Card>
  )
};

export default HandleChartCard;