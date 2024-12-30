import { useContext, useState, useEffect } from 'react';
import LeaveContext from '../context/LeaveContext';
import Table from '../components/Table';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoData from '../components/NoData';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const LeaveList = () => {
    const { leaves, deleteLeave } = useContext(LeaveContext); // Use context to get leaves and delete function
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    // Load leaves into filteredLeaves
    useEffect(() => {
        setFilteredLeaves(leaves);
    }, [leaves]);

    // Delete operation (called from context)
    const handleDelete = (id) => {
        deleteLeave(id);
        toast.info('Leave deleted successfully!');
    };

    const columns = [
        { header: 'Employee Name', accessor: (item) => item.employeeName },
        { header: 'Designation', accessor: (item) => item.employeeDesignation },
        { header: 'Leave Type', accessor: (item) => item.leaveType },
        { header: 'Start Leave', accessor: (item) => item.startDate },
        { header: 'End Leave', accessor: (item) => item.endDate },

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
                            <Link to={`/addLeaves/${leave.id}`} className="text-orange-500">
                                <FaRegEdit />
                            </Link>
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
