import client from '@/client';
import { InitiateFormValue } from '@/pages/process/pages/initiate-process/components/initiate-form';
import { UploadFormValue } from '@/pages/process/pages/initiate-process/components/upload-file';

interface InitProcessValue {
  form: InitiateFormValue;
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
  return client.get(`/process/${id}`);
}