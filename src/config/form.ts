import { DatePickerProps, FormProps } from "antd";
import moment from "moment";

export const validateMessages: FormProps['validateMessages'] = {
  required: "${label}不能为空",
};

export const disabledFormCurrentDate: DatePickerProps['disabledDate'] = (current) =>  {
  return current && current > moment().endOf('day');
}