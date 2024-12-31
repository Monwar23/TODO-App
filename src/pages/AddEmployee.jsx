import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';
import FormField from '../components/FormField';


const AddEmployee = () => {
  // state declare
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employees, setEmployees] = useLocalStorage('employees', []);

  // navigate other routes
  const navigate = useNavigate();
  // id from url
  const { id } = useParams();

  // if find id from url then find the data
  useEffect(() => {
    if (id) {
      const employee = employees.find(emp => emp.id === id);
      if (employee) {
        setEmployeeToEdit(employee);
      }
    }
  }, [id, employees])

  const handleSubmit = (data) => {

    const emailExists = employees.some(emp => emp.email === data.email && emp.id !== (employeeToEdit?.id || ''));

    if (emailExists) {
      toast.error('This email is already exist for another employee. Please enter a different email.');
      return;
    }

    let updatedEmployees;
    if (employeeToEdit) {
      updatedEmployees = employees.map((emp) =>
        emp.id === employeeToEdit.id ? { ...data, id: employeeToEdit.id, activeStatus: employeeToEdit.activeStatus } : emp
      );
    } else {
      const newEmployee = { ...data, id: uuidv4(), activeStatus: 'Available' };
      updatedEmployees = [...employees, newEmployee];
    }
    setEmployees(updatedEmployees);
    toast.success(employeeToEdit ? 'Employee updated successfully!' : 'Employee added successfully!');
    setTimeout(() => navigate('/'), 2000);
  }

  // Form fields configuration
  const fields = [
    { label: 'Name*', type: 'text', name: 'name', placeholder: 'Enter Name', required: true },
    { label: 'Designation*', type: 'text', name: 'designation', placeholder: 'Enter Designation', required: true },
    { label: 'Email*', type: 'email', name: 'email', placeholder: 'Enter Email', required: true },
    { label: 'Phone*', type: 'number', name: 'phone', placeholder: 'Enter Phone', required: true },
  ];

  return (
    <div className='p-5 lg:w-2/5 w-3/5 mt-5 mx-auto bg-slate-50 shadow-lg'>
      <h3 className="text-2xl text-center font-medium ">{employeeToEdit ? 'Update Employee Profile' : 'Add New Employee Profile'}</h3>
      <FormField
        fields={fields}
        initialValues={employeeToEdit || {}}
        onSubmit={handleSubmit}
      />
      <ToastContainer />
    </div>

  );
};

export default AddEmployee;
