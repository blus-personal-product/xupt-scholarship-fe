import * as React from 'react';
import { DatePicker } from 'antd';
import { DATE_FORMAT_NORMAL, FORMAT_DATE } from '@/config/time';
import moment from 'moment';

interface IProps extends Record<string, any> {
  type?: 'range' | 'normal';
  className?: string;
}

const FmtDatePicker: React.FC<IProps> = (props) => {
  const { type, className, ...resetProps } = props;
  const value = type === 'normal'
    ? (resetProps.value ? moment(resetProps.value, DATE_FORMAT_NORMAL) : undefined)
    : (
      Array.isArray(resetProps.value)
        ? (
          resetProps.value.length > 0
            ? [
              moment(resetProps.value[0], DATE_FORMAT_NORMAL),
              moment(resetProps.value[1], DATE_FORMAT_NORMAL)
            ]
            : undefined
        )
        : [FORMAT_DATE, FORMAT_DATE]
    );
  return (
    <React.Fragment>
      {
        type === 'normal' ? (
          <DatePicker
            className={className}
            {...resetProps}
            value={value as any}
          />
        ) : (
            <DatePicker.RangePicker
              {...resetProps as any}
              className={className}
              value={value as any}
            />
          )
      }
    </React.Fragment>
  );
};

FmtDatePicker.defaultProps = {
  type: 'normal',
  className: ''
}

export default FmtDatePicker;