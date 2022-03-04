import * as React from 'react';

interface PageHeaderState {
  title?: string;
  subTitle?: string;
  extra?: React.ReactNode;
}

interface PageHeaderContext extends PageHeaderState {
  updatePageHeaderState: (state: PageHeaderState) => void;
}

const PageHeaderContext = React.createContext<PageHeaderContext>({} as PageHeaderContext);

export const usePageHeaderContext = () => React.useContext(PageHeaderContext);

export const PageHeaderProvider:React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [pageHeaderState, setPageHeaderState] = React.useState<PageHeaderState>({
    title: '',
    subTitle: '',
    extra: null
  });
  const updatePageHeaderState = (state: PageHeaderState) => {
    setPageHeaderState({
      title: '',
      subTitle: '',
      extra: null,
      ...state,
    })
  }
  return (
    <PageHeaderContext.Provider
      value={{
        ...pageHeaderState,
        updatePageHeaderState,
      }}
    >
      {props.children}
    </PageHeaderContext.Provider>
  )
}