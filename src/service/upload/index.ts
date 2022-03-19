import client from '@/client';
import { StudentItem } from '@/pages/upload-student-list/components/student-edit-table';

export const postUpLoadStudentList = (studentList: StudentItem[]) => {
  return client.post<number[]>("/upload/student/list", studentList);
}
