import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeaveContext from '../context/LeaveContext';
import useLocalStorage from '../components/useLocalStorage';
import FormField from '../components/FormField';
import { v4 as uuidv4 } from 'uuid';

const AddLeave = () => {
  const { state, dispatch } = useContext(LeaveContext);
  const [employees] = useLocalStorage('employees', []);
  const [leaveToEdit, setLeaveToEdit] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const availableEmployees = employees.filter(employee => employee.activeStatus === 'Available');

  useEffect(() => {
    if (id) {
      const leave = state.leaves.find(leave => leave.id === id);
      if (leave) {
        setLeaveToEdit(leave);
      }
    }
  }, [id, state.leaves]);

  const handleSubmit = (data) => {
    const { employeeId, leaveType, startDate, endDate } = data;
    const selectedEmployee = employees.find(emp => emp.id === employeeId);

    if (leaveToEdit) {
      const updatedLeave = {
        ...data,
        employeeName: selectedEmployee.name,
        employeeDesignation: selectedEmployee.designation,
        status: leaveToEdit.status,
        id: leaveToEdit.id,
      };
      dispatch({ type: 'UPDATE_LEAVE', payload: updatedLeave });
      toast.success('Leave updated successfully!');
    } else {
      const newLeave = {
        id: uuidv4(),
        status: 'Pending',
        employeeId,
        employeeName: selectedEmployee.name,
        employeeDesignation: selectedEmployee.designation,
        leaveType,
        startDate,
        endDate,
      };
      dispatch({ type: 'ADD_LEAVE', payload: newLeave });
      toast.success('Leave added successfully!');
    }

    setTimeout(() => navigate('/leaves'), 2000);
  };

  const fields = [
    {
      label: 'Employee*',
      type: 'select',
      name: 'employeeId',
      options: availableEmployees.map(emp => ({
        value: emp.id,
        label: `${emp.name} - ${emp.designation}`,
      })),
      placeholder: 'Select an employee',
      required: true,
    },
    {
      label: 'Leave Type*',
      type: 'select',
      name: 'leaveType',
      options: [
        { value: 'sick', label: 'Sick' },
        { value: 'vacation', label: 'Vacation' },
        { value: 'Annual Leave', label: 'Annual Leave' },
        { value: 'Public Holidays', label: 'Public Holidays' },
      ],
      placeholder: 'Select leave type',
      required: true,
    },
    {
      label: 'Start Date*',
      type: 'date',
      name: 'startDate',
      placeholder: 'Select start date',
      required: true,
    },
    {
      label: 'End Date*',
      type: 'date',
      name: 'endDate',
      placeholder: 'Select end date',
      required: true,
    },
  ];

  return (
    <div className="p-5 lg:w-2/5 w-3/5 mt-5 mx-auto bg-slate-50 shadow-lg rounded-lg">
      <h3 className="text-2xl text-center font-medium text-gray-800">
        {leaveToEdit ? 'Update Leave' : 'Add Leave'}
      </h3>
      <FormField
        fields={fields}
        initialValues={leaveToEdit || {}}
        onSubmit={handleSubmit}
      />
      <ToastContainer />
    </div>
  );
};

export default AddLeave;
