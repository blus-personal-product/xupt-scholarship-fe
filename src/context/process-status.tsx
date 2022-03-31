import { Spin } from 'antd';
import * as React from 'react';
import * as api from '@/service/process';

export interface ProcessStatus {
  status: "not_create" | "pre_start" | "opened";
  process_id: number;
  editable: boolean;
  createable: boolean;
}

const ProcessContext = React.createContext<ProcessStatus>({} as ProcessStatus);

export const useProcess = () => React.useContext(ProcessContext);

interface IProps extends React.PropsWithChildren<{}> {

}

const ProcessProvider: React.FC<IProps> = (props) => {

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
    getProcessStatus();
  }, []);

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