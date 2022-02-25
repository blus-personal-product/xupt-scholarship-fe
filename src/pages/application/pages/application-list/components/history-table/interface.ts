export type IHandleStatus = 'saved' | 'submitted';
export type IValidateStatus = 'success' | 'failed';

/** 历史 Columns */
export interface HistoryTableData {
  handle_state: IHandleStatus;
  validate_state: IValidateStatus;
  time: string;
  id: number;
  permission: FormPermission;
}

export const TypesMap: Map<IValidateStatus | IHandleStatus, string> = new Map([
  ['saved', '已保存'],
  ['submitted', '已提交'],
  ['success', '已验证'],
  ['failed', '未验证']
])