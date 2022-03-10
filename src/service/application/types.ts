import { ApplicationValue } from "@/pages/application/pages/application-form";

// /application/form/${applyId}`
export interface IGETApplicationFormRes {
  form: ApplicationValue;
  permission: FormPermission;
}