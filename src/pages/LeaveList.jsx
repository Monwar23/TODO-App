import { useContext, useState, useEffect } from 'react';
import LeaveContext from '../context/LeaveContext';
import Table from '../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoData from '../components/NoData';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import useLocalStorage from '../components/useLocalStorage';

const LeaveList = () => {
    const { leaves, updateLeave, deleteLeave, tasks } = useContext(LeaveContext);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const navigate = useNavigate()
    const [employees, setEmployees] = useLocalStorage('employees', []);


    // Load leaves into filteredLeaves
    useEffect(() => {
        setFilteredLeaves(leaves);
    }, [leaves]);

    // Delete operation (called from context)
    const handleDelete = (id) => {
        deleteLeave(id);
        toast.info('Leave deleted successfully!');
    };

    // Function to get the count of assigned tasks for each employee
    const getTaskCount = (employeeId) => {
        return tasks.filter(task => task.employeeId === employeeId && task.status !== 'Completed').length;
    };

    // Toggle leave status
    const toggleLeaveStatus = (id) => {
        const leave = leaves.find(l => l.id === id);
        const taskCount = getTaskCount(leave.employeeId);

        if (leave.status === 'Pending' && taskCount > 0) {
            toast.error('Please complete assigned tasks or reassigned other available employee before approving leave!');
            setTimeout(() => navigate("/tasks"), 2000);
            return;
        }
        const newLeaveStatus = leave.status === 'Pending' ? 'Approved' : 'Pending';

        // Update the leave status
        const updatedLeave = { ...leave, status: newLeaveStatus };
        updateLeave(updatedLeave);

        // Update the employee's activeStatus based on the leave status
        const updatedEmployees = employees.map(employee => {
            if (employee.id === leave.employeeId) {
                return {
                    ...employee,
                    activeStatus: newLeaveStatus === 'Pending' ? 'Available' : 'Unavailable',
                };
            }
            return employee;
        });

        setEmployees(updatedEmployees);
        toast.info('Leave status updated!');
    };

    const columns = [
        { header: 'Employee Name', accessor: (item) => item.employeeName },
        { header: 'Designation', accessor: (item) => item.employeeDesignation },
        { header: 'Leave Type', accessor: (item) => item.leaveType },
        { header: 'Start Leave', accessor: (item) => item.startDate },
        { header: 'End Leave', accessor: (item) => item.endDate },
        { header: 'Assigned Tasks', accessor: (item) => getTaskCount(item.employeeId) },
        {
            header: 'Status',
            accessor: (item) => (
                <button
                    onClick={() => toggleLeaveStatus(item.id)}
                    className={`btn px-2 py-1 rounded-lg ${item.status === 'Pending' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}
                >
                    {item.status}
                </button>
            )
        }

    ];

    return (
        <div className='mt-5'>
            <div className='flex items-center justify-center'>
                <Link to="/addLeaves" className="-ml-64 font-medium"><button className='btn border font-medium py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500'>Add Leave</button></Link>

                <h2 className="ml-36 text-center text-2xl font-medium">Leave List</h2>
            </div>

            {/* Search Bar for filtering the leaves */}
            <SearchBar
                data={leaves}
                onFilter={setFilteredLeaves}
                keys={["id", "name", "leaveType"]}
                placeholder="Search by ID, Name, or Leave Type"
            />

            {filteredLeaves.length > 0 ? (
                <Table columns={columns} data={filteredLeaves}
                    renderActions={(leave) => (
                        <>
                            {leave.status !== "Approved" ? (
                                <Link to={`/addLeaves/${leave.id}`} className="text-orange-500">
                                    <FaRegEdit />
                                </Link>
                            ) : (
                                <span className="text-orange-500 cursor-not-allowed" title="Leave Request is Approved and cannot be edited">
                                    <FaRegEdit />
                                </span>
                            )}
                            <button
                                onClick={() => handleDelete(leave.id)}
                                className="text-orange-500 ml-2"
                            >
                                <RiDeleteBin5Fill />
                            </button>
                        </>
                    )}
                />
            ) : (
                <NoData />
            )}

            <ToastContainer />
        </div>
    );
};

export default LeaveList;
