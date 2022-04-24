export type IHandleStatus = 'save' | 'submit';
export type IValidateStatus = 'success' | 'failed';
import * as api from '@/service/apply';

/** 历史 Columns */
export interface HistoryTableData {
  handle_state: IHandleStatus;
  create_at: string;
  edit_at: string;
  id: number;
  score_info: api.ScoreValue;
  score: number;
  editable: boolean;
  user_id: string;
}

export const TypesMap: Map<IValidateStatus | IHandleStatus, string> = new Map([
  ['save', '已保存'],
  ['submit', '已提交'],
  ['success', '已验证'],
  ['failed', '未验证']
])