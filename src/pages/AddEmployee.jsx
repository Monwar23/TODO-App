import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
  });
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employees, setEmployees] = useLocalStorage('employees', []);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const employee = employees.find(emp => emp.id === id);
      if (employee) {
        setFormData(employee);
        setEmployeeToEdit(employee);
      }
    }
  }, [id,employees])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isDuplicate = employees.some((employee) => employee.id === formData.id && employee.id !== employeeToEdit?.id);

    if (isDuplicate) {
      toast.error('Employee ID already exists!');
    } else {
      let updatedEmployees;
      if (employeeToEdit) {
        updatedEmployees = employees.map(emp => emp.id === employeeToEdit.id ? formData : emp);
      } else {
        updatedEmployees = [...employees, formData];
      }

     setEmployees(updatedEmployees)
      toast.success(employeeToEdit ? 'Employee updated successfully!' : 'Employee added successfully!');

      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className='p-5 lg:w-2/5 w-3/5 mt-5 mx-auto bg-slate-50 shadow-lg'>
      <h3 className="text-2xl text-center font-medium ">{employeeToEdit ? 'Update Employee Profile' : 'Add New Employee Profile'}</h3>
      <form onSubmit={handleSubmit} className="mt-4 ">
        <div className='grid grid-cols-1'>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Employee ID"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none'
          />
          <label htmlFor="name" className="block text-sm mt-5 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none'
          />
          <label htmlFor="id" className="block text-sm mt-5 font-medium text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none'
          />
          <label htmlFor="id" className="block text-sm mt-5 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none'
          />
          <label htmlFor="id" className="block text-sm mt-5 font-medium text-gray-700">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone" min={1}
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none'
          />


          <button
            type="submit"
            className="btn border py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500"
          >
            {employeeToEdit ? 'Update Employee' : 'Add Employee'}          </button>
        </div>
      </form>
      <ToastContainer />
    </div>

  );
};

export default AddEmployee;
