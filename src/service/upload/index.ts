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

export const postUploadSingleFile = async (type: UploadFileType,file: UploadFile) => {
  const formData = new FormData();
  formData.append('file', file as any);
  const url:string = await client.postFormData<string>(`/upload/single/${type}`, formData);
  return url.slice(1);
}

/**
 * 头像上传
 */
export const postAvatar = async (file: UploadFile) => {
  return await postUploadSingleFile("avatar", file);
}
