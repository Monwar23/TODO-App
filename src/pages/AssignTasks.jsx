import { useEffect, useState } from "react";
import useLocalStorage from "../components/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FormField from "../components/FormField";
import { v4 as uuidv4 } from 'uuid';

const AssignTasks = () => {
    // state declare
    const [employees] = useLocalStorage('employees', []);
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // navigate

    const navigate = useNavigate();

    // find id from url
    const { id } = useParams();

    // load data by id
    useEffect(() => {
        if (id) {
            const task = tasks.find(task => task.id === id);
            if (task) {
                setTaskToEdit(task);
            }
        }
    }, [id, tasks]);

    // check available employee

    const availableEmployees = employees.filter(employee =>
        employee.activeStatus === 'Available'
    )
    // if for edit then push 
    if (taskToEdit) {
        const currentEmployee = employees.find(employee => employee.id === taskToEdit.employeeId);
        if (currentEmployee && !availableEmployees.some(emp => emp.id === currentEmployee.id)) {
            availableEmployees.push(currentEmployee);
        }
    }

    const handleSubmit = (data) => {
        const { employeeId, description, duration } = data;
        const selectedEmployeeData = employees.find((emp) => emp.id === employeeId);

        if (taskToEdit) {
            const updatedTasks = tasks.map((task) =>
                task.id === taskToEdit.id
                    ? { ...task, employeeId, employeeName: selectedEmployeeData.name, description, duration }
                    : task
            );
            setTasks(updatedTasks);
            toast.success('Task updated successfully!');
        } else {
            const newTask = {
                employeeId,
                employeeName: selectedEmployeeData.name,
                employeeDesignation: selectedEmployeeData.designation,
                description,
                status: 'Incomplete',
                id: uuidv4(),
                duration,
            };
            setTasks([...tasks, newTask]);
            toast.success('Task assigned successfully!');
        }

        setTimeout(() => navigate('/tasks'), 2000);
    }

    const fields = [
        {
            label: 'Employee*',
            type: 'select',
            name: 'employeeId',
            options: availableEmployees.map(emp => ({
                value: emp.id,
                label: `${emp.name} - ${emp.designation}`,
            })),
            placeholder: 'Select an employee',
            required: true,
        },
        {
            label: 'Task Description*',
            type: 'text',
            name: 'description',
            placeholder: 'Enter task description',
            required: true,
        },
        {
            label: 'Duration*',
            type: 'text',
            name: 'duration',
            placeholder: 'Enter task duration',
            required: true,
        },
    ];

    return (
        <div className="p-5 lg:w-2/5 w-3/5 mt-5 mx-auto bg-slate-50 shadow-lg rounded-lg">
            <h3 className="text-2xl text-center font-medium text-gray-800">
                {taskToEdit ? 'Update Task' : 'Assign Task'}
            </h3>
            <FormField
                fields={fields}
                initialValues={taskToEdit || {}}
                onSubmit={handleSubmit}
            />
            <ToastContainer />
        </div>
    );
};

export default AssignTasks;
