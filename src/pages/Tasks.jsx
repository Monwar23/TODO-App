import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Tasks = () => {
    const [tasks,setTasks]=useState([]);

    useEffect(()=>{
        const storedTasks=JSON.parse(localStorage.getItem("tasks") || []);
        setTasks(storedTasks);

    },[])
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
                            <td className="border px-4 py-2 text-center">{task.status}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center items-center ">
                                <Link to={`/addEmployee/${task.employeeId}`}
                                    className="text-orange-500 "
                                >
                                  <FaRegEdit />
                                </Link>
                                <button
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
        </div>
    );
};

export default Tasks;