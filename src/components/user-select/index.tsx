import * as React from 'react';
import style from './style.module.less';
import { Avatar, SelectProps, Select } from 'antd';
import { useUserListContext } from '@/context/user-list';

interface IProps extends SelectProps {
}

const UserSelector: React.FC<IProps> = (props) => {
  const { placeholder, ...resetProps } = props;
  const { list: options } = useUserListContext();
  return (
    <Select
      {...resetProps}
      allowClear
      mode="multiple"
      filterOption={
        (value, option) => {
          return `${option?.value}-${option?.name}`.includes(value.toUpperCase());
        }
      }
      placeholder={placeholder || "选择成员，支持使用Email、姓名进行添加"}
    >
      {
        options.map(option => (
          <Select.Option
            key={option.email}
            value={option.email}
            name={`${option.name}-${option.en}`}
          >
            <div className={style['user-info-box']}>
              <Avatar className={style['user-avatar']} src={option.avatar} />
              <div className={style['user-text-info']}>
                <span className={style['user-name-text']}>{option.name}</span>
                <span className={style['user-email-text']}>{`<${option.email}>`}</span>
              </div>
            </div>
          </Select.Option>
        ))
      }
    </Select>
  )
}

export default UserSelector;