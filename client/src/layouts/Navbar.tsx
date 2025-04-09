import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/logoutService";
import { useNavigate } from "react-router-dom";
// import Icon from '../assets/twogether-high-resolution-logo.svg';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

    const handleLogout = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await logoutUser();
        navigate("/");
      } catch (err: any) {
        console.error(err.response?.data || err.message);
      }
    };

  return (
    <nav className="bg-background shadow-2xl shadow-secondary">
      <div className="max-w-7xl mx-auto h-13 px-8 py-3 flex justify-between items-center">
        <Link to="/" className="relative group flex h-full transition-transform duration-150 hover:scale-105 text-secondary font-bold font-display hover:text-primary">
          Home
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
        </Link>

        <div className="h-full">
          <div className="flex h-full gap-8">
            <Link to="/register" className="relative group transition-transform duration-150 hover:scale-105 text-secondary font-bold font-display  hover:text-primary">
              Username
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
            </Link>
            <Link to={"/"} onClick={handleLogout} className="relative group transition-transform duration-150 hover:scale-105 text-secondary font-bold font-display hover:text-primary">
              Logout
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
            </Link>
          </div>
          <div className="hidden h-full gap-8">
            <Link to="/register" className="relative group transition-transform duration-150 hover:scale-105 text-secondary font-bold font-display hover:text-primary">
              Register
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
            </Link>
            <Link to="/register" className="relative group transition-transform duration-150 hover:scale-105 text-secondary font-bold font-display hover:text-primary">
              Login
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-bottom-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
