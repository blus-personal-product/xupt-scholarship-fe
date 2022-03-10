import Mentions, { MentionProps } from 'antd/lib/mentions';
import * as api from '@/service/user';
import * as React from 'react';
import style from './style.module.less';
import { Avatar } from 'antd';
import { useMentionListContext } from '@/context/mention-list';

interface IProps extends MentionProps {
}

const MentionUser: React.FC<IProps> = (props) => {
  const { placeholder, ...resetProps } = props;
  const { list: options } = useMentionListContext();
  return (
    <Mentions
      {...resetProps}
      autoSize
      placeholder={placeholder || "通过@来加入通知成员，并采用英文空格来划分，例如：@张三"}
      filterOption={(_, option) => {
        return !(resetProps.value || '').split(' ').includes('@' + option.value);
      }}
    >
      {
        options.map(option => (
          <Mentions.Option
            key={option.email}
            value={`${option.name}-${option.email}`}
          >
            <div className={style['user-info-box']}>
              <Avatar className={style['user-avatar']} src={option.avatar} />
              <div className={style['user-text-info']}>
                <span className={style['user-name-text']}>{option.name}</span>
                <span className={style['user-email-text']}>{`<${option.email}>`}</span>
              </div>
            </div>
          </Mentions.Option>
        ))
      }
    </Mentions>
  )
}

export default MentionUser;