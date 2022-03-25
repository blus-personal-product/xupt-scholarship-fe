import { Col, Row, Space } from 'antd';
import * as React from 'react';
import HistoryLine from './components/history-line';
import HistoryTable from './components/history-table';

const ApplicationList: React.FC = () => {
  return (
    <React.Fragment>
      <HistoryLine />
      <HistoryTable />
    </React.Fragment>
  );
};

export default ApplicationList;