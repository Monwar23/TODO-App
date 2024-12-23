import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";


const Home = () => {
    // state declare
    const [employees, setEmployees] = useLocalStorage('employees', []); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filteredEmployees, setFilteredEmployees] = useState([]); 

// data load from local Storage
useEffect(() => {
    setFilteredEmployees(employees);
}, [employees]);

    // search functionality
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase(); 
        setSearchTerm(term);

        const filtered = employees.filter((emp) =>
            emp.name.toLowerCase().includes(term) || emp.id.toLowerCase().includes(term) || emp.email.toLowerCase().includes(term) || emp.phone.toLowerCase().includes(term)
        );

        setFilteredEmployees(filtered); 
    };

// delete operation
    const deleteEmployee = (id) => {
        const updatedEmployees = employees.filter((emp) => emp.id !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees); 
        toast.success('Employee Deleted successfully!');
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    return (
        <div className="mt-5">
        <h2 className="text-center text-2xl font-medium">Employee List</h2>
        
        {/* Input box for search*/}
        <div className="flex justify-center mt-4">
            <input
                type="text"
                value={searchTerm} 
                onChange={handleSearch} 
                placeholder="Search by ID, Name, Email or Phone"
                className="border py-2 px-4 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
        </div>
    {/* table of employees details */}
        {filteredEmployees.length > 0 ? ( 
            <table className="table-auto border-collapse mt-4 w-2/3 mx-auto">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-orange-500">Name</th>
                        <th className="border px-4 py-2 text-orange-500">ID</th>
                        <th className="border px-4 py-2 text-orange-500">Designation</th>
                        <th className="border px-4 py-2 text-orange-500">Email</th>
                        <th className="border px-4 py-2 text-orange-500">Phone</th>
                        <th className="border px-4 py-2 text-orange-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                           
                            <td className="border px-4 py-2 text-center">{employee.name}</td>
                            <td className="border px-4 py-2 text-center">{employee.id}</td>
                            <td className="border px-4 py-2 text-center">{employee.designation}</td>
                            <td className="border px-4 py-2 text-center">{employee.email}</td>
                            <td className="border px-4 py-2 text-center">{employee.phone}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center items-center ">
                                <Link to={`/addEmployee/${employee.id}`}
                                    className="text-orange-500 "
                                >
                                  <FaRegEdit />
                                </Link>
                                <button
                                    onClick={() => deleteEmployee(employee.id)}
                                    className="text-orange-500 ml-2"
                                >
                                   <RiDeleteBin5Fill />
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div className="flex items-center justify-center " style={{ minHeight: "calc(100vh - 155px)" }}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-center mt-4 text-gray-500">No tasks found.</p>
            </div>
          </div>        )}
        <ToastContainer></ToastContainer>
    </div>
    
    );
};

export default Home;
