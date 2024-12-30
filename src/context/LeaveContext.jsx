import { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../components/useLocalStorage';

// Reducer function
const leaveReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LEAVE':
      return {
        ...state,
        leaves: [...state.leaves, action.payload],
      };
    case 'UPDATE_LEAVE':
      return {
        ...state,
        leaves: state.leaves.map(leave =>
          leave.id === action.payload.id ? action.payload : leave
        ),
      };
    case 'DELETE_LEAVE':
      return {
        ...state,
        leaves: state.leaves.filter(leave => leave.id !== action.payload),
      };
    default:
      return state;
  }
};

// LeaveContext তৈরি
const LeaveContext = createContext();

// LeaveProvider কম্পোনেন্ট
export const LeaveProvider = ({ children }) => {
  // LocalStorage থেকে leaves এবং tasks স্টেট নিয়ে আসা
  const [leaves, setLeaves] = useLocalStorage('leaves', []);
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // useReducer হুক ব্যবহার করে state এবং dispatch নেওয়া
  const [state, dispatch] = useReducer(leaveReducer, { leaves, tasks });

  // state আপডেট করার জন্য localStorage ব্যবহার করা
  useEffect(() => {
    setLeaves(state.leaves);
    setTasks(state.tasks);
  }, [state.leaves, state.tasks, setLeaves, setTasks]);

  return (
    <LeaveContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveContext;
