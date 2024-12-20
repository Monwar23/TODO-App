import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinks = <>
       <NavLink className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold' : 'font-semibold hover:text-orange-500'
        } to="/">Home</NavLink>

        <NavLink className={({ isActive }) =>
            isActive ? 'text-orange-500  font-semibold' : 'font-semibold hover:text-orange-500'
        } to="/addEmployee">Add Employee</NavLink>

       <NavLink className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold' : 'font-semibold hover:text-orange-500'
        } to="/tasks">Tasks</NavLink>
        
       <NavLink className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold' : 'font-semibold hover:text-orange-500'
        } to="/assignTasks">Assign Tasks</NavLink>
    </>

    return (
         <div className="bg-slate-200 shadow-lg h-12 flex justify-around items-center">
            <h2 className="text-2xl font-semibold"><span className="text-orange-500">TODO</span> App</h2>
        <div className="flex gap-5">{navLinks}</div>
    </div>
    );
};

export default Navbar;