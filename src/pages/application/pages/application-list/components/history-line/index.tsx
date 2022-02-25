import * as React from 'react';
import { Card, Empty, Timeline } from 'antd';

interface ITimeLine {
  time: number;
  info: string;
}

const HistoryLine: React.FC = () => {
  const [timeLines, setTimeLines] = React.useState<ITimeLine[]>([]);
  return (
    <Card>
      {
        !timeLines.length ? (
          <Empty />
        ) : (
            <Timeline mode="left">
              {
                timeLines.map(item => {
                  return (
                    <Timeline.Item
                      key={item.time}
                      label={item.time}
                    >{item.info}</Timeline.Item>
                  );
                })
              }
            </Timeline>
          )
      }
    </Card>
  );
}
export default HistoryLine;