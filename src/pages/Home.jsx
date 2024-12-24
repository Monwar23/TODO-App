import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import NoData from "../components/NoData";
import Table from "../components/Table";


const Home = () => {
    // state declare
    const [employees, setEmployees] = useLocalStorage('employees', []);
    const [tasks] = useLocalStorage('tasks', []);
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
            ["name", "id", "email", "phone", "designation"].some((key) =>
              emp[key].toLowerCase().includes(term)
            )
          );

        setFilteredEmployees(filtered);
    };
    // task count
    const getTaskCount = (employeeId) => {
        return tasks.filter(task => task.employeeId === employeeId && task.status !== 'Completed').length;
    };


    // delete operation
    const deleteEmployee = (id) => {
        const updatedEmployees = employees.filter((emp) => emp.id !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        toast.success('Employee Deleted successfully!');
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };


  const columns = [
    { header: "Name", accessor: (row) => row.name },
    { header: "Designation", accessor: (row) => row.designation },
    { header: "Email", accessor: (row) => row.email },
    { header: "Phone", accessor: (row) => row.phone },
    { header: "Task Assigned", accessor: (row) => getTaskCount(row.id) },
  ];

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
                <Table
                columns={columns}
                data={filteredEmployees}
                renderActions={(employee) => (
                  <>
                    <Link to={`/addEmployee/${employee.id}`} className="text-orange-500">
                      <FaRegEdit />
                    </Link>
                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="text-orange-500 ml-2"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </>
                )}
              />
            ) : (
                <NoData></NoData>
                )}
            <ToastContainer></ToastContainer>
        </div>

    );
};

export default Home;
