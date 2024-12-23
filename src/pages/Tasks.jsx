import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "../components/useLocalStorage";

const Tasks = () => {
    const [tasks, setTasks] = useLocalStorage("tasks", []);

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

    return (
        <div className="mt-5">
            <h2 className="text-2xl font-medium text-center">
                Task list
            </h2>
            {tasks.length > 0 ? (
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
                        {tasks.map((task) => (
                            <tr key={task.employeeId}>

                                <td className="border px-4 py-2 text-center">{task.description}</td>
                                <td className="border px-4 py-2 text-center">{task.employeeId} - {task.employeeName}</td>
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
                <p className="text-center mt-4 text-gray-500">No tasks found.</p>
            )}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Tasks;