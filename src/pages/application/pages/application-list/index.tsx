import { Col, Row, Space } from 'antd';
import * as React from 'react';
import HistoryLine from './components/history-line';
import HistoryTable from './components/history-table';

const ApplicationList: React.FC = () => {
  return (
    <Row>
      <Col span={8}>
        <HistoryLine />
      </Col>
      <Col span={16}>
        <HistoryTable />
      </Col>
    </Row>
  );
};

export default ApplicationList;