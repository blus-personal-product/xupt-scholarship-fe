import PageSpin from '@/components/page-spin';
import * as api from '@/service/user';
import * as React from 'react';
import pinyin from 'pinyin';

interface UserSelect {
  list: api.IUserItem[];
}


const UserListContext = React.createContext<UserSelect>({} as UserSelect);

export const useUserListContext = () => React.useContext(UserListContext);

export const UserListProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [list, setList] = React.useState<UserSelect['list']>([]);
  const [loading, setLoading] = React.useState(false);
  const getMentionOptions = async () => {
    try {
      setLoading(true);
      const resList = await api.getMentionUserList();
      const list: UserSelect['list'] = resList.map(item => ({
        ...item,
        en: pinyin(item.name, {
          style: pinyin.STYLE_NORMAL
        }).flat(3).join('').toUpperCase()
      }));
      setList(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    getMentionOptions();
  }, []);
  return (
    <UserListContext.Provider
      value={{
        list: list
      }}
    >
      <PageSpin spinning={loading}>
        {props.children}
      </PageSpin>
    </UserListContext.Provider>
  )
}