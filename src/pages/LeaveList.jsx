import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeaveContext from '../context/LeaveContext';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import useLocalStorage from '../components/useLocalStorage';
import NoData from '../components/NoData';

// Utility functions
const isEmployeeOnLeave = (employee, leaves, currentDate) =>
  leaves.some(
    (leave) =>
      leave.employeeId === employee.id &&
      leave.status === 'Approved' &&
      new Date(leave.startDate) <= currentDate &&
      new Date(leave.endDate) >= currentDate
  );

const updateEmployeeStatus = (employees, leaves, currentDate) =>
  employees.map((employee) => ({
    ...employee,
    activeStatus: isEmployeeOnLeave(employee, leaves, currentDate) ? 'Unavailable' : 'Available',
  }));

const LeaveList = () => {
  // context used
  const { state, dispatch } = useContext(LeaveContext);
  
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const navigate = useNavigate();
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [tasks] = useLocalStorage('tasks', []);

  useEffect(() => setFilteredLeaves(state.leaves), [state.leaves]);

  useEffect(() => {
    const currentDate = new Date();
    const updatedEmployees = updateEmployeeStatus(employees, state.leaves, currentDate);
    if (JSON.stringify(updatedEmployees) !== JSON.stringify(employees)) {
      setEmployees(updatedEmployees);
    }
  }, [state.leaves]);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_LEAVE', payload: id });
    toast.info('Leave deleted successfully!');
  };

  const getTaskCount = (employeeId) =>
    tasks.filter((task) => task.employeeId === employeeId && task.status !== 'Completed').length;

  const toggleLeaveStatus = (id) => {
    const leave = state.leaves.find((l) => l.id === id);
    const taskCount = getTaskCount(leave.employeeId);

    if (leave.status === 'Pending' && taskCount > 0) {
      toast.error('Please complete assigned tasks or reassign to another employee before approving leave!');
      setTimeout(() => navigate('/tasks'), 2000);
      return;
    }

    const newLeaveStatus = leave.status === 'Pending' ? 'Approved' : 'Pending';
    const updatedLeave = { ...leave, status: newLeaveStatus };
    dispatch({ type: 'UPDATE_LEAVE', payload: updatedLeave });

    const currentDate = new Date();
    const updatedEmployees = updateEmployeeStatus(employees, [updatedLeave], currentDate);
    setEmployees(updatedEmployees);

    toast.info('Leave status updated!');
  };

  const columns = [
    { header: 'Employee Name', accessor: (item) => item.employeeName },
    { header: 'Designation', accessor: (item) => item.employeeDesignation },
    { header: 'Leave Type', accessor: (item) => item.leaveType },
    { header: 'Start Leave', accessor: (item) => item.startDate },
    { header: 'End Leave', accessor: (item) => item.endDate },
    { header: 'Assigned Tasks', accessor: (item) => getTaskCount(item.employeeId) },
    {
      header: 'Status',
      accessor: (item) => (
        <button
          onClick={() => toggleLeaveStatus(item.id)}
          className={`btn px-2 py-1 rounded-lg ${item.status === 'Pending' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
            }`}
        >
          {item.status}
        </button>
      ),
    },
  ];

  const renderActions = (leave) => (
    <>
      {leave.status !== 'Approved' ? (
        <Link to={`/addLeaves/${leave.id}`} className="text-orange-500">
          <FaRegEdit />
        </Link>
      ) : (
        <span className="text-orange-500 cursor-not-allowed" title="Leave Request is Approved and cannot be edited">
          <FaRegEdit />
        </span>
      )}
      <button onClick={() => handleDelete(leave.id)} className="text-orange-500 ml-2">
        <RiDeleteBin5Fill />
      </button>
    </>
  );

  return (
    <div className="mt-5">
      <div className="flex items-center justify-center">
        <Link to="/addLeaves" className="-ml-64 font-medium">
          <button className="btn border font-medium py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500">
            Add Leave
          </button>
        </Link>
        <h2 className="ml-36 text-center text-2xl font-medium">Leave List</h2>
      </div>

      <SearchBar
        data={state.leaves}
        onFilter={setFilteredLeaves}
        keys={['employeeName', 'employeeDesignation', 'leaveType']}
        placeholder="Search by Name, Designation or Leave Type"
      />

      {filteredLeaves.length > 0 ? (
        <Table columns={columns} data={filteredLeaves} renderActions={renderActions} />
      ) : (
        <NoData />
      )}

      <ToastContainer />
    </div>
  );
};

export default LeaveList;
