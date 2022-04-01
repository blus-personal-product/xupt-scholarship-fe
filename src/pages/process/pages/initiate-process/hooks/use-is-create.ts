import { useProcess } from "@/context/process-status";

const useIsCreate = () => {
  const { process_id } = useProcess();
  const isCreate = process_id === -1;
  return isCreate;
};

export default useIsCreate;