import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';
import FormField from '../components/FormField';
import CommonButton from '../components/CommonButton';


const AddEmployee = () => {
  // state declare
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
  });
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
        setFormData(employee);
        setEmployeeToEdit(employee);
      }
    }
  }, [id, employees])

  // update form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit data
  const handleSubmit = (event) => {
    event.preventDefault();

    let updatedEmployees;
    if (employeeToEdit) {
      updatedEmployees = employees.map(emp => emp.id === employeeToEdit.id ? formData : emp);
    } else {
      const newEmployee = { ...formData, id: uuidv4() };
      updatedEmployees = [...employees, newEmployee];
    }

    setEmployees(updatedEmployees)
    toast.success(employeeToEdit ? 'Employee updated successfully!' : 'Employee added successfully!');

    setTimeout(() => navigate('/'), 2000);
  };

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
      <form onSubmit={handleSubmit} className="mt-4 ">
        <FormField fields={fields} formData={formData} onChange={handleChange} />
        <CommonButton>
        {employeeToEdit ? 'Update Employee' : 'Add Employee'}
        </CommonButton>
      </form>
      <ToastContainer />
    </div>

  );
};

export default AddEmployee;
