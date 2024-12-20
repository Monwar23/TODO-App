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
    <div className='p-5 lg:w-2/5 w-3/5 mt-5 mx-auto bg-slate-50 shadow-lg'>
      <h3 className="text-xl text-center font-medium ">Add New Employee</h3>
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
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:border-orange-500 focus:outline-none'
          />
                    <label htmlFor="name" className="block text-sm mt-5 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:border-orange-500 focus:outline-none'
          />
                    <label htmlFor="id" className="block text-sm mt-5 font-medium text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:border-orange-500 focus:outline-none'
          />
                    <label htmlFor="id" className="block text-sm mt-5 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:border-orange-500 focus:outline-none'
          />
                    <label htmlFor="id" className="block text-sm mt-5 font-medium text-gray-700">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone" min={1}
            required
            className='border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:border-orange-500 focus:outline-none'
          />
       
        
          <button
            type="submit"
            className="btn border py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500"
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
