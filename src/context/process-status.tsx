import { Spin } from 'antd';
import * as React from 'react';
import * as api from '@/service/process';
import { useAuth } from './auth.context';
import { ProcessStep } from '@/pages/process/pages/handle-process/process.list';

export interface ProcessStatus {
  status: "not_create" | "pre_start" | "opened";
  process_id: number;
  editable: boolean;
  createable: boolean;
  step?: ProcessStep;
}

const ProcessContext = React.createContext<ProcessStatus>({} as ProcessStatus);

export const useProcess = () => React.useContext(ProcessContext);

interface IProps extends React.PropsWithChildren<{}> {

}

const ProcessProvider: React.FC<IProps> = (props) => {
  const { user } = useAuth();
  const [status, setStatus] = React.useState<ProcessStatus>({
    status: 'not_create',
    process_id: -1,
    editable: true,
    createable: true,
  });

  const [loading, setLoading] = React.useState(false);

  const getProcessStatus = async () => {
    try {
      setLoading(true);
      const res = await api.getProcessStatus();
      setStatus(res);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email) {
      getProcessStatus();
    }
  }, [user.email]);

  return (
    <ProcessContext.Provider
      value={status}
    >
      <Spin spinning={loading}>
        {props.children}
      </Spin>
    </ProcessContext.Provider>
  );
};

export default ProcessProvider;