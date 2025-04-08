import React from "react";
import { Link } from "react-router-dom";
// import Icon from '../assets/twogether-high-resolution-logo.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background shadow-2xl shadow-secondary">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-primary font-bold font-display">
        Home
        </Link>

        <div className="flex gap-6">
          <Link to="/register" className="text-secondary font-bold font-display hover:text-primary transition">
            Register
          </Link>
          <Link to="/login" className="text-secondary font-bold font-display hover:text-primary transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
