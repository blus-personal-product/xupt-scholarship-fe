import { DatePickerProps, FormItemProps, FormProps } from "antd";
import moment from "moment";

export const validateMessages: FormProps['validateMessages'] = {
  required: "${label}不能为空",
};

export const requiredRule: FormItemProps['rules'] = [
  {
    required: true,
  }
]

export const baseFormConf = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 12 },
  scrollToFirstError: true,
  requiredMark: false,
  labelWrap: true,
  validateMessages,
}

export const disabledFormCurrentDate: DatePickerProps['disabledDate'] = (current) => {
  return current && current > moment().endOf('day');
}

export const disabledFormFeatureDate: DatePickerProps['disabledDate'] = (current) => {
  return current && current < moment().startOf('day');
}