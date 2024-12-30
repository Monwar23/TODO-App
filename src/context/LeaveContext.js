import { createContext } from "react";
import useLocalStorage from "../components/useLocalStorage";

const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useLocalStorage("leaves", []); // Use localStorage hook to persist the leaves

  const addLeave = (newLeave) => {
    setLeaves([...leaves, newLeave]);
  };

  const updateLeave = (updatedLeave) => {
    setLeaves(leaves.map(leave => leave.id === updatedLeave.id ? updatedLeave : leave));
  };

  const deleteLeave = (leaveId) => {
    setLeaves(leaves.filter((leave) => leave.id !== leaveId));
  };
  

  return (
    <LeaveContext.Provider value={{ leaves, addLeave, deleteLeave,updateLeave }}>
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveContext;
