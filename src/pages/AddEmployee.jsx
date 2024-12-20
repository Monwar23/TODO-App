import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const isDuplicate = storedEmployees.some((employee) => employee.id === formData.id);

    if (isDuplicate) {
      toast.error('Employee ID already exists!');
    } else {
      const newEmployee = { ...formData };

      const updatedEmployees = [...storedEmployees, newEmployee];
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));

      toast.success('Employee added successfully!');
      setTimeout(() => navigate('/'), 2000); 
    }
  };

  return (
    <div className='p-4 lg:w-2/5 w-3/5 mx-auto'>
      <h3 className="text-xl text-center font-medium mt-5">Add New Employee</h3>
      <form onSubmit={handleSubmit} className="mt-4 ">
        <div className='grid grid-cols-1 gap-6'>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Employee ID"
            required
            className='border py-2 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none'
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className='border py-2 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none'
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
            className='border py-2 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none'
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className='border py-2 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none'
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className='border py-2 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none'
          />
       
        
          <button
            type="submit"
            className="btn border py-2 px-2 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500"
          >
            Add Employee
          </button>
          </div>
      </form>
      <ToastContainer />
    </div>

  );
};

export default AddEmployee;
