import PageSpin from '@/components/page-spin';
import * as api from '@/service/user';
import * as React from 'react';

interface MentionList {
  list: api.IMentionUser[];
}


const MentionListContext = React.createContext<MentionList>({} as MentionList);

export const useMentionListContext = () => React.useContext(MentionListContext);

export const MentionListProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [list, setList] = React.useState<MentionList['list']>([]);
  const [loading, setLoading] = React.useState(false);
  const getMentionOptions = async () => {
    try {
      setLoading(true);
      const list = await api.getMentionUserList();
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
    <MentionListContext.Provider
      value={{
        list: list
      }}
    >
      <PageSpin spinning={loading}>
        {props.children}
      </PageSpin>
    </MentionListContext.Provider>
  )
}