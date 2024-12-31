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

//Create LeaveContext 
const LeaveContext = createContext();

// LeaveProvider component
export const LeaveProvider = ({ children }) => {

  const [leaves, setLeaves] = useLocalStorage('leaves', []);

  // Use reducer hook and get state and dispatch
  const [state, dispatch] = useReducer(leaveReducer, { leaves });

  // use localstorage for update state
  useEffect(() => {
    setLeaves(state.leaves);
  }, [state.leaves, setLeaves,]);

  return (
    <LeaveContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveContext;
