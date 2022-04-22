import client from '@/client';
import { ProcessStatus } from '@/context/process-status';
import { IProcessValue } from '@/pages/process/pages/initiate-process/components/initiate-form';
import { UploadFormValue } from '@/pages/process/pages/initiate-process/components/upload-file';

interface InitProcessValue {
  form: IProcessValue;
  upload: UploadFormValue;
}

/**
 * 发起评定流程
 */
export const postInitProcess = (params: InitProcessValue) => {
  return client.post("/process", params);
};


export const putUpdateProcess = (
  id: number,
  processType: keyof InitProcessValue,
  value: InitProcessValue[keyof InitProcessValue]
) => {
  return client.put(`/process/${id}`, {
    [processType]: value,
  });
};

/**
 * 获取process信息
 */
export const getProcessData = (id: number) => {
  return client.get<{
    form: InitProcessValue,
    id: number;
    create_at: string;
    edit_at: string;
    user_id: string;
  }>(`/process/${id}`);
}

/**
 * 获取process状态
 */
export const getProcessStatus = () => {
  return client.get<ProcessStatus>("/process");
}

export const getProcessHistory = () => {
  return client.get("/process/step");
}