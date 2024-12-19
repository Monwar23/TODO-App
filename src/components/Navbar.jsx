import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinks = <>
       <NavLink className={({ isActive }) =>
            isActive ? 'text-green-500 font-semibold' : 'font-semibold hover:text-green-500'
        } to="/">Home</NavLink>

        <NavLink className={({ isActive }) =>
            isActive ? 'text-green-500  font-semibold' : 'font-semibold hover:text-green-500'
        } to="/petListing">Add Employee</NavLink>

       <NavLink className={({ isActive }) =>
            isActive ? 'text-green-500 font-semibold' : 'font-semibold hover:text-green-500'
        } to="/donationCampaigns">Tasks</NavLink>
    </>

    return (
        <div className="bg-slate-200 shadow-lg h-12 flex justify-center items-center">
        <div className="flex gap-5">{navLinks}</div>
    </div>
    );
};

export default Navbar;