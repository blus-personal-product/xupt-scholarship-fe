import { ApplicationValue } from "@/pages/application/pages/application-form";
import { ScoreValue } from ".";

// /application/form/${applyId}`
export interface IGETApplicationFormRes {
  form: ApplicationValue;
  editable: boolean;
  create_at: string;
  edit_at: string;
  score_info: ScoreValue
}