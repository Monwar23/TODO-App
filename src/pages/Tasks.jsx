import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import { useState } from "react";
import NoData from "../components/NoData";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import useDeleteItem from "../components/useDeleteItem";

const Tasks = () => {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [filter, setFilter] = useState("All");
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const deleteItem = useDeleteItem();



    // delete task
    const deleteTask = (id) => {
        const updatedTasks = deleteItem(tasks, setTasks, id, "tasks", "Task Deleted Successfully!");
        setFilteredTasks(updatedTasks); 
    }

    // toggle complete or incomplete
    const toggleTaskStatus = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: task.status === "Incomplete" ? "Completed" : "Incomplete"
                }
            }
            return task
        });
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        toast.info("Task Status Updated!");
    }

    const filteredByStatus = (filter === "All") 
    ? filteredTasks 
    : filteredTasks.filter(task => task.status === filter);

    // table data details

    const columns = [
        { header: "Task", accessor: (row) => row.description },
        { header: "Employee", accessor: (row) => `${row.employeeName} - ${row.employeeDesignation}` },
        { header: "Estimate Time", accessor: (row) => `${row.duration}` },
        {
            header: "Status", accessor: (row) => (
                <button
                    onClick={() => toggleTaskStatus(row.id)}
                    className={`btn px-2 py-1 rounded-lg ${row.status === "Completed" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                        }`}
                >
                    {row.status}
                </button>
            )
        },
    ];

    return (
        <div className="mt-5">
            <h2 className="text-2xl font-medium text-center">
                Task list
            </h2>
            <div className="flex justify-center ">
                <select
                    className="border px-4 mt-4 mr-4 max-h-12 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                </select>
                <SearchBar
                data={tasks}
                onFilter={setFilteredTasks}
                keys={["description", "employeeName", "employeeId"]}
                placeholder="Search tasks"
            />
            </div>
            {filteredByStatus.length > 0 ? (
                <Table
                    columns={columns}
                    data={filteredByStatus}
                    renderActions={(task) => (
                        <>
                            {task.status !== "Completed" ? (
                                <Link to={`/assignTasks/${task.id}`} className="text-orange-500">
                                    <FaRegEdit />
                                </Link>
                            ) : (
                                <span className="text-orange-500 cursor-not-allowed" title="Task is completed and cannot be edited">
                                    <FaRegEdit />
                                </span>
                            )}
                            <button
                                onClick={() => deleteTask(task.id)}
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

export default Tasks;