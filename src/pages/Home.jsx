import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import NoData from "../components/NoData";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";


const Home = () => {
    // state declare
    const [employees, setEmployees] = useLocalStorage('employees', []);
    const [tasks] = useLocalStorage('tasks', []);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    // data load from local Storage
    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    // task count
    const getTaskCount = (employeeId) => {
        return tasks.filter(task => task.employeeId === employeeId && task.status !== 'Completed').length;
    };

     // toggle available or unavailable
     const toggleEmployeeStatus = (id) => {
      const employee = employees.find((emp) => emp.id === id);
    const taskCount = getTaskCount(id);

    if (employee.activeStatus === "Available" && taskCount > 0) {
        toast.error("Please assign your tasks to other employees before marking unavailable!");
        return;
    }
      const updatedEmployee = employees.map((employee) => {
          if (employee.id === id) {
              return {
                  ...employee,
                  activeStatus: employee.activeStatus === "Available" ? "Unavailable" : "Available"
              }
          }
          return employee
      });
      setEmployees(updatedEmployee);
      toast.info("Task Status Updated!");
  }

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
    { header: "Status", accessor: (row) =>(
      <button
          onClick={() => toggleEmployeeStatus(row.id)}
          className={`btn px-2 py-1 rounded-lg ${row.activeStatus === "Available" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
              }`}
      >
          {row.activeStatus}
      </button>
  ) },
  ];

    return (
        <div className="mt-5">
            <h2 className="text-center text-2xl font-medium">Employee List</h2>

            {/* Input box for search*/}
            <SearchBar
             data={employees}
             onFilter={setFilteredEmployees}
             keys={["name", "id", "email", "phone", "designation"]}
             placeholder="Search by ID, Name, Email or Phone"
            />

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
