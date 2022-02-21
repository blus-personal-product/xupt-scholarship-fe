import * as React from 'react';
import HistoryLine from './components/history-line';
import HistoryTable from './components/history-table';

const ApplicationList:React.FC= () => {
  return (
    <div>
      <HistoryLine />
      <HistoryTable />
    </div>
  );
};

export default ApplicationList;