import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignTasks = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Filter employees who do not have an assigned task
        const availableEmployees = storedEmployees.filter(employee =>
            !storedTasks.some(task => task.employee === employee.id)
        );
        setEmployees(availableEmployees);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedEmployee) {
            toast.error('Please select an employee.');
            return;
        }
        if (!taskDescription) {
            toast.error('Please enter a task description.');
            return;
        }
        const newTask = {
            employee: selectedEmployee,
            description: taskDescription,
        };

        // Save task in localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        existingTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        toast.success('Task assigned successfully!');

        // Reset form state
        setSelectedEmployee('');
        setTaskDescription('');

        setTimeout(() => navigate('/tasks'), 2000);
    };

    return (
        <div className="p-5 lg:w-2/5 w-3/5 mt-5 mx-auto bg-slate-50 shadow-lg rounded-lg">
            <h3 className="text-2xl text-center font-medium text-gray-800">Assign Task</h3>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
                            Employee
                        </label>
                        <select
                            id="employee"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            required
                            className="w-full border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        >
                            <option value="">Select an employee</option>
                            {employees.map((employee, index) => (
                                <option key={index} value={employee.id}>
                                    {employee.id} - {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="task" className="block text-sm font-medium text-gray-700">
                            Task Description
                        </label>
                        <input
                            type="text"
                            id="task"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Enter task description"
                            required
                            className="w-full border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn w-full border py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500"
                        >
                            Assign Task
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AssignTasks;
