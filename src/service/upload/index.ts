import client from '@/client';
import { StudentItem } from '@/pages/upload-student-list/components/student-edit-table';
import { UploadFile } from 'antd/lib/upload/interface';

export const postUpLoadStudentList = (studentList: StudentItem[]) => {
  return client.post<number[]>("/upload/student/list", studentList);
}

export const postUploadApplyFileList = (fileList: UploadFile[]) => {
  const formData = new FormData();
  fileList.forEach(file => {
    formData.append('files[]', file as any);
  })
  return client.postFormData<string[]>("/upload", formData)
}
