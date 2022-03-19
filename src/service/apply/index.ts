import { IGETApplicationFormRes } from './types';
import http from '@/client';
import { ApplicationValue } from '@/pages/application/pages/application-form';

export type HandleApplicationFormType = 'submit' | 'save';

/**
 * 申请表单 保存 | 提交
 */
export const postApplicationForm = (type: HandleApplicationFormType, formValue: ApplicationValue) => {
    return http.post(`/apply/handle/form/${type}`,formValue);
};


export const getApplicationForm = (applyId: number) => {
  return http.get<IGETApplicationFormRes>(`/apply/form/${applyId}`);
};