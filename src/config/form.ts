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

export const baseFormLayout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 12 }
}

export const disabledFormCurrentDate: DatePickerProps['disabledDate'] = (current) => {
  return current && current > moment().endOf('day');
}