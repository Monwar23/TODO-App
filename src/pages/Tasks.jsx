import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";
import { useState } from "react";
import NoData from "../components/NoData";

const Tasks = () => {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");


    // delete task
    const deleteTask = (id) => {
        const updateTasks = tasks.filter((task) => task.employeeId !== id);
        setTasks(updateTasks);
        toast.success('Task Deleted Successfully!');

    }

    // toggle complete or incomplete
    const toggleTaskStatus = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.employeeId === id) {
                return {
                    ...task,
                    status: task.status === "Incomplete" ? "Completed" : "Incomplete"
                }
            }
            return task
        });
        setTasks(updatedTasks);
        toast.info("Task Status Updated!");
    }

    // Filter tasks based on selected status and search function
    const filteredTasks = tasks.filter((task) => {
        const statusFilter = filter === "All" || task.status === filter;

        const statusSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.employeeId.toString().includes(searchTerm);

        return statusFilter && statusSearch;

    })
    return (
        <div className="mt-5">
            <h2 className="text-2xl font-medium text-center">
                Task list
            </h2>
            <div className="flex justify-center mt-4">
                <select
                    className="border px-4 py-2 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                </select>
                <input
                    type="text"
                    className="border px-4 py-2 rounded-lg ml-4 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Search tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {filteredTasks.length > 0 ? (
                <table className="table-auto border-collapse mt-4 w-2/3 mx-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 text-orange-500">Task</th>
                            <th className="border px-4 py-2 text-orange-500">Employee</th>
                            <th className="border px-4 py-2 text-orange-500">Status</th>
                            <th className="border px-4 py-2 text-orange-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <tr key={task.employeeId}>

                                <td className="border px-4 py-2 text-center">{task.description}</td>
                                <td className="border px-4 py-2 text-center">{task.employeeName} - {task.employeeDesignation}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => toggleTaskStatus(task.employeeId)} className={`btn px-2 py-1 rounded-lg ${task.status === "Completed"
                                            ? "bg-green-500 text-white"
                                            : "bg-orange-500 text-white"
                                            }`}
                                    >{task.status}</button>
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex justify-center items-center ">
                                        <Link to={`/assignTasks/${task.employeeId}`}
                                            className="text-orange-500 "
                                        >
                                            <FaRegEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteTask(task.employeeId)}
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
               <NoData></NoData>
            )}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Tasks;