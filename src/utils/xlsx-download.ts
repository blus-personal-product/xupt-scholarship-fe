import ExportJsonExcel from 'js-export-excel';

interface IOptions {
  sheetName: string;
  fileName: string;
  sheetData: any[];
  sheetFilter: string[];
  sheetHeader: string[];
}

const downloadFileToExcel = (options: IOptions) => {
  const option: any = {};
  const { sheetData, sheetName, sheetFilter, sheetHeader } = options;
  option.fileName = options.fileName;  //excel文件名称
  option.datas = [
    {
      sheetData: sheetData,
      sheetName: sheetName,
      sheetFilter: sheetFilter,  //excel文件中需显示的列数据
      sheetHeader: sheetHeader,  //excel文件中每列的表头名称
    }
  ];
  let toExcel = new ExportJsonExcel(option);  //生成excel文件
  toExcel.saveExcel();  //下载excel文件
};

export default downloadFileToExcel;