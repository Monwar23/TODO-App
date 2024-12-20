import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
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
        const newEmployee = { ...formData, id: Date.now().toString() };

        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        const updatedEmployees = [...storedEmployees, newEmployee];

        localStorage.setItem('employees', JSON.stringify(updatedEmployees));

        navigate('/');
    };

    return (
        <div className='p-4 lg:w-3/5 w-4/5 mx-auto'>
        <h3 className="text-xl text-center font-medium mt-5">Add New Employee</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className='grid grid-cols-2 gap-5'>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
              className='border py-1 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none' 
            />
            <input 
              type="text" 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange} 
              placeholder="Designation" 
              required 
              className='border py-1 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none' 
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
              className='border py-1 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none' 
            />
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Phone" 
              required 
              className='border py-1 px-2 rounded-lg border-orange-500 focus:border-orange-500 focus:outline-none' 
            />
          </div>
          <div className='flex justify-center'>
            <button 
              type="submit" 
              className="btn border py-1 px-2 rounded-lg border-orange-500 m-4 hover:bg-orange-500 hover:text-white text-orange-500"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
      
    );
};

export default AddEmployee;
