import { CiMenuFries } from "react-icons/ci";
import Logo from '../assets/CodeConnect.svg';
import { NavLink } from "react-router-dom";
const ResponsiveNavbar = () => {
  return (
    <div className="flex justify-center w-full py-4">
      <nav className="flex items-center justify-between w-full max-w-5xl bg-white shadow-md rounded-full px-4 py-2 border border-gray-100">
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="CodeConnect Logo"
            className="w-auto h-auto object-contain md:w-[55px] transform rotate-45" // Rotated logo
          />
          <h2 className="text-xl font-bold text-[#7ed957] ml-1">CodeConnect</h2>
        </div>

        {/* Action Buttons and Icons (Desktop + Mobile) */}
        <div className="flex items-center gap-3">
        <NavLink to="/" className="hidden sm:flex py-2 px-4 text-sm font-medium text-gray-700 rounded-full hover:text-[#7ed957] transition-all duration-300">
            Home
          </NavLink>
          <NavLink to="/about" className="hidden sm:flex py-2 px-4 text-sm font-medium text-gray-700 rounded-full hover:text-[#7ed957] transition-all duration-300">
            About
          </NavLink>
          <button className="hidden sm:flex py-2 px-4 text-sm font-extrabold text-gray-700 rounded-full hover:text-[#7ed957] transition-all duration-300">
            <NavLink to="/login"> Sign In</NavLink>
          </button>
          <button className="hidden sm:flex py-2 px-4 text-sm font-medium text-white bg-[#7ed957] rounded-full hover:bg-[#6cc149] transition-all duration-300">
          <NavLink to="/signup"> Sign Up</NavLink>
          </button>
          <CiMenuFries
            size={24}
            className="text-gray-600 cursor-pointer md:hidden flex hover:text-[#7ed957] transition-colors duration-300"
          />
        </div>

      </nav>
    </div>
  );
};

export default ResponsiveNavbar;