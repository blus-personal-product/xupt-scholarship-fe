import { IGETApplicationFormRes } from './types';
import http from '@/client';
import { ApplicationValue } from '@/pages/application/pages/application-form';
import { IHandleStatus } from '@/pages/application/pages/application-list/components/history-table/interface';

export type HandleApplicationFormType = 'submit' | 'save';

/**
 * 申请表单 保存 | 提交
 */
export const postApplicationForm = (type: HandleApplicationFormType, formValue: ApplicationValue) => {
  return http.post(`/apply/handle/form/${type}`, formValue);
};

export const putApplicationForm = (type: HandleApplicationFormType, formValue: ApplicationValue, id: number) => {
  return http.put(`/apply/${id}/${type}`, formValue);
}

export const getApplicationStatus = () => {
  return http.get<number>(`/apply`);
}

export const getApplicationForm = (applyId: number) => {
  return http.get<IGETApplicationFormRes>(`/apply/${applyId}`);
};

export type ApplyStep =  {
  comment: string;
  edit_at: string;
  user_id: string;
}

export type ApplyHistory = ApplyStep[];

export type ApplicationItem = {
  id: number;
  edit_at: string;
  create_at: string;
  editable: boolean;
  status: IHandleStatus;
  score_info: ScoreValue;
  score: number;
  user_id: string;
  history: ApplyHistory;
  step: ApplyStep;
}

type GETApplicationListParams = {
  page_count: number;
  page_index: number;
  is_check: IUser['identity'];
  procedure_id: number;
}

export const getApplicationList = (params:GETApplicationListParams) => {
  return http.get<ApplicationItem[]>(`/apply/form/list`, params);
}

export interface ScoreValue {
  moral: number;
  practice: number;
  academic: number;
  sum: number;
  base: number;
};

export const postApplicationScoreList = (id: number,params: ScoreValue) => {
  return http.post<ApplicationItem[]>(`/apply/score/${id}`, params);
}