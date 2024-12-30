import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import NoData from "../components/NoData";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import useDeleteItem from "../components/useDeleteItem";


const Home = () => {
    // state declare
    const [employees, setEmployees] = useLocalStorage('employees', []);
    const [tasks] = useLocalStorage('tasks', []);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const deleteItem = useDeleteItem();
    const navigate=useNavigate()

    // data load from local Storage
    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);
 
    // task count
    const getTaskCount = (employeeId) => {
        return tasks.filter(task => task.employeeId === employeeId && task.status !== 'Completed').length;
    };

     // Redirect to Leave List when toggling
    const redirectToLeaveList = () => {
      toast.info('Manage employee status in the Leave List.');
      setTimeout(() => navigate('/leaves'), 2000);
  };

    // delete operation
    const deleteEmployee = (id) => {
      const updatedEmployees = deleteItem(employees, setEmployees, id, "employees", "Employee Deleted Successfully!");
      setFilteredEmployees(updatedEmployees); 
    };


  const columns = [
    { header: "Name", accessor: (row) => row.name },
    { header: "Designation", accessor: (row) => row.designation },
    { header: "Email", accessor: (row) => row.email },
    { header: "Phone", accessor: (row) => row.phone },
    { header: "Task Assigned", accessor: (row) => getTaskCount(row.id) },
    { header: "Status", accessor: (row) =>(
      <button
          onClick={redirectToLeaveList}
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
