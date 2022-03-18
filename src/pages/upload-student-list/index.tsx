import * as React from 'react'
import DraggerXlsx from './components/dragger-xlsx';
import StudentEditTable from './components/student-edit-table';

const UploadStudentList: React.FC = () => {

  const [data, setData] = React.useState<any[]>([]);


  return (
    <React.Fragment>
      <DraggerXlsx
        updateStudentData={setData}
      />
      <StudentEditTable
        tableData={data}
        updateStudentData={setData}
      />
    </React.Fragment>
  );
};

export default UploadStudentList;