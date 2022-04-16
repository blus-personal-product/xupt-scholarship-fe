import { useProcess } from "@/context/process-status";

const useDisabled = () => {
  const { createable, editable } = useProcess();
  return (!createable) || (!editable)
}

export default useDisabled;