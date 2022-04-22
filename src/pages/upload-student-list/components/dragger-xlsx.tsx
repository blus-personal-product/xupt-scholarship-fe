import * as React from 'react';
import { message, Upload, } from 'antd';
import { DraggerProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { UploadFile } from 'antd/lib/upload/interface';

const draggerProps: DraggerProps = {
  name: 'file',
  accept: '.xlsx,.xls',
  action: "",
};

interface IProps {
  updateStudentData: (data: any[]) => void;
}

const DraggerXlsx: React.FC<IProps> = (props) => {
  const { updateStudentData } = props;
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const updateStatus = (status: UploadFile<any>['status']) => {
    const prevFileList = fileList;
    prevFileList[prevFileList.length - 1].status = status;
    setFileList([...prevFileList]);
  };
  const getXlsxData = (file: UploadFile) => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        updateStatus('uploading');
        const result = event.target?.result;
        const workbook = XLSX.read(result, { type: 'binary' });
        let tempData: any[] = [];
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            tempData = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        tempData.shift();
        const currentYear = (new Date()).getFullYear() + '';
        const studentData = tempData.map((item, index) => ({
          name: item['学生姓名'] || '-',
          student_id: `${item['学号'] || '-'}` ,
          gender: item['性别'] || '-',
          professional: item['专业'] || '-',
          course_credit: +item['学位课加权平均成绩'],
          id: index + 1,
          type: (item['硕士类型'] && (item['硕士类型'] ===  '学硕'? "bachelor_degree" : "profession_degree")) || "bachelor_degree",
          email: item['邮箱'] || (item['学号'] && `${item['学号']}@stu.xiyou.edu.cn`) || '-',
          phone: item['联系方式'] || '-',
          class: (+item['班级']) || 1,
          grade: `${item['年级'] || currentYear}`,
          password: (item['学号'] && `Jxj${item['学号']}`) || 'JxjStudent',
          key: index + 1,
        }));
        updateStudentData(studentData);
        updateStatus('success');
      } catch (e) {
        updateStatus('error');
        message.error('文件类型不正确！');
      }
    };
    fileReader.readAsBinaryString(file as any);
  };

  const onChange: DraggerProps['onChange'] = (info) => {
    const { status } = info.file;
    if (info.file.status === "removed") return;
    setFileList([info.file]);
    // 通过FileReader对象读取文件
    // 以二进制方式打开文件

    if (status !== 'uploading') {
      getXlsxData(info.file.originFileObj);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onRemove: DraggerProps['onRemove'] = (e) => {
    updateStudentData([]);
    setFileList([]);
  }
  return (
    <Upload.Dragger
      fileList={fileList}
      onChange={onChange}
      onRemove={onRemove}
      {...draggerProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
    </p>
    </Upload.Dragger>
  );
}

export default DraggerXlsx;