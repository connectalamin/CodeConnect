import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import {
  MdLaptopMac,
  MdOutlineArrowRightAlt,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5"; // Profile circle icon
import Logo from "../assets/CodeConnect.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMegaMenuCollapse, setIsMegaMenuCollapse] = useState(false);
  const [megaMenuSubItemsOpen, setMegaMenuSubItemsOpen] = useState("");
  const { isAuthenticated, logout } = useAuth(); // Get auth status, logout, and user data
  const navigate = useNavigate();
  const {profile,loading} = useProfile();

  // Handle logout and redirect to login
  const handleLogout = async () => {
    await logout(); // Wait for logout to complete
    setAccountMenuOpen(false); // Close dropdown on logout
    navigate("/", { replace: true }); // Close dropdown on logout
  };


  return (
    <nav className="flex items-center justify-between w-full relative px-4 max-w-[1440px] mx-auto">
      {/* Logo */}
      <img
        src={Logo}
        alt="CodeConnect Logo"
        className="w-[55px] object-contain transform rotate-45" // Rotated logo, matching your branding
      />

      {/* Nav Links (Desktop) */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        {/* Product Mega Menu */}
        <li
          className={`${
            isProductHover
              ? "text-[#3B9DF8]"
              : "dark:text-[#abc2d3] text-gray-600"
          } flex items-center gap-[5px] cursor-pointer`}
          onMouseEnter={() => setIsProductHover(true)}
          onMouseLeave={() => setIsProductHover(false)}
        >
          <MdLaptopMac className="text-[1.1rem]" />
          Products
          <IoIosArrowUp
            className={`${
              isProductHover ? "rotate-0" : "rotate-[-180deg]"
            } transition-all duration-300`}
          />
          {/* Mega Menu */}
          <div
            className={`${
              isProductHover
                ? "translate-y-0 opacity-100 z-30"
                : "translate-y-[20px] opacity-0 z-[-1]"
            } bg-white rounded-md w-full absolute top-[40px] left-0 p-[30px] transition-all duration-300 boxShadow flex flex-wrap gap-[30px]`}
          >
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[1.2rem] text-gray-500 font-[500]">
                  More Products
                </h3>
                <div className="flex float-start gap-[10px] group">
                  <img
                    src="https://i.ibb.co/LQBDJGD/icon-logo-container.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                  />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      Demo App
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                    <button className="text-[#FF5E5E] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                      Call to action
                      <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                    </button>
                  </div>
                </div>
                <div className="flex float-start gap-[10px] group">
                  <img
                    src="https://i.ibb.co/Y8cRWRj/icon-logo-container-1.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                  />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      CRM
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                    <button className="text-[#FE9239] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                      Call to action
                      <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                    </button>
                  </div>
                </div>
                <div className="flex float-start gap-[10px] group">
                  <img
                    src="https://i.ibb.co/6bGWgp6/icon-logo-container-2.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                  />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      CMS
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                    <button className="text-[#8B5CF6] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                      Call to action
                      <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[1.2rem] text-gray-500 font-[500]">
                  Ecosystem
                </h3>
                <div className="flex float-start gap-[10px]">
                  <BsBuildings className="text-[1.4rem] text-gray-600" />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      Directory
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                  </div>
                </div>
                <div className="flex float-start gap-[10px]">
                  <BsCalendar2Date className="text-[1.4rem] text-gray-600" />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      Bookings
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                  </div>
                </div>
                <div className="flex float-start gap-[10px]">
                  <TbUsersGroup className="text-[1.4rem] text-gray-600" />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      User Feedback
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                  </div>
                </div>
                <div className="flex float-start gap-[10px]">
                  <FaTasks className="text-[1.4rem] text-gray-600" />
                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      Task Manager
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Lorem ipsum dolor sit amet, consect adipiscing elit
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px] bg-gray-50 rounded-md p-[20px] w-full">
              <div className="flex float-start gap-[10px] group">
                <img
                  src="https://i.ibb.co/VTqw5rY/img-container.png"
                  alt="image"
                  className="w-[100px]"
                />
                <div>
                  <div className="mb-2 flex items-center gap-[5px]">
                    <h1 className="text-[1rem] text-gray-600 font-[500]">
                      Check the new app
                    </h1>
                    <p className="py-[3px] px-[8px] text-[0.6rem] text-gray-500 border border-gray-300 rounded-full text-center">
                      Featured
                    </p>
                  </div>
                  <p className="text-[0.9rem] text-gray-400 font-[300]">
                    Lorem ipsum dolor sit amet, consect adipiscing elit
                  </p>
                  <button className="text-[#FF5E5E] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                    Call to action
                    <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                  </button>
                </div>
              </div>
              <div className="flex float-start gap-[10px] group">
                <img
                  src="https://i.ibb.co/V2b5xnK/img-container-1.png"
                  alt="image"
                  className="w-[100px]"
                />
                <div>
                  <h1 className="text-[1rem] text-gray-600 font-[500]">
                    Check our newsletter
                  </h1>
                  <p className="text-[0.9rem] text-gray-400 font-[300]">
                    Lorem ipsum dolor sit amet, consect adipiscing elit
                  </p>
                  <button className="text-[#FF5E5E] mt-2 flex items-center gap-[5px] text-[0.9rem]">
                    Call to action
                    <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="flex items-center hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
          <AiOutlineFire className="text-[1.1rem] group-hover:text-[#3B9DF8] text-gray-600" />
          <NavLink to={isAuthenticated() ? "/feed" : "/"}>
            {isAuthenticated() ? "Feed" : "Home"}
          </NavLink>
        </li>

        <li className="flex items-center hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
          <IoInformationCircleOutline className="text-[1.1rem] group-hover:text-[#3B9DF8] text-gray-600" />
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>

      {/* User Account (Desktop) */}
      <div className="flex items-center gap-[15px]">
    {isAuthenticated() ? (
      <div
        className="flex items-center gap-[10px] cursor-pointer relative"
        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
      >
        <NavLink to="/profile">
          <div className="relative">
            {!loading && profile?.user?.image ? (
              <img
                src={profile.user.image}
                alt={`${profile.user.name}'s profile`}
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
            ) : (
              <IoPersonCircle
                size={35}
                className="text-gray-600 cursor-pointer hover:text-[#7ed957] transition-colors duration-300"
              />
            )}
            <div 
              className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"
              title="Online"
            />
          </div>
        </NavLink>
        
        {profile?.user?.name && (
          <h1 className="text-[1rem]  text-gray-600 font-semibold
           sm:block hidden">
            {profile.user.name.split(" ")[0]}
          </h1>
        )}
        <IoIosArrowUp
          className={`${
            accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
          } transition-all duration-300 text-gray-600 sm:block hidden`}
        />

            {/* Dropdown Menu */}
            <div
              className={`${
                accountMenuOpen
                  ? "translate-y-0 opacity-100 z-[1]"
                  : "translate-y-[10px] opacity-0 z-[-1]"
              } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] shadow-md`}
            >
              <NavLink
                to="/profile"
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50 hover:text-[#7ed957] transition-all duration-300"
                onClick={() => setAccountMenuOpen(false)}
              >
                <FiUser />
                View Profile
              </NavLink>
              <NavLink
                to="/edit-profile"
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50 hover:text-[#7ed957] transition-all duration-300"
                onClick={() => setAccountMenuOpen(false)}
              >
                <IoSettingsOutline />
                Update Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              >
                <TbLogout2 />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[15px]">
            <NavLink
              to="/login"
              className="py-2 px-4 text-sm font-semibold text-gray-700 rounded-full hover:text-[#7ed957] transition-all duration-300"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="py-2 px-4 text-sm font-medium text-white bg-[#7ed957] rounded-full hover:bg-[#6cc149] transition-all duration-300"
            >
              Sign Up
            </NavLink>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-[1.8rem] text-[#424242] cursor-pointer md:hidden flex"
        />
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1]"
        } md:hidden bg-white p-4 text-center absolute top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300 shadow-md`}
      >
        <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li
            onClick={() => setIsMegaMenuCollapse(!isMegaMenuCollapse)}
            className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]"
          >
            Products
            <IoIosArrowDown
              className={`${
                isMegaMenuCollapse ? "rotate-0" : "rotate-[180deg]"
              } text-gray-600 group-hover:text-[#3B9DF8] transition-all duration-300`}
            />
          </li>

          {/* Product Mega Menu */}
          <div
            onClick={() => setMegaMenuSubItemsOpen("more_product")}
            className={`${
              isMegaMenuCollapse ? "hidden" : "block"
            } group font-[500] ml-6`}
          >
            <h4 className="text-left flex items-center gap-[5px]">
              More Products
              <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
            </h4>
            <ul
              className={`${
                megaMenuSubItemsOpen === "more_product" ? "flex" : "hidden"
              } pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}
            >
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/products/demo">Demo App</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/products/crm">CRM</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/products/cms">CMS</NavLink>
              </li>
            </ul>
          </div>

          <div
            onClick={() => setMegaMenuSubItemsOpen("ecosystem")}
            className={`${
              isMegaMenuCollapse ? "hidden" : "block"
            } font-[500] ml-6`}
          >
            <h4 className="text-left flex items-center gap-[5px]">
              Ecosystem
              <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
            </h4>
            <ul
              className={`${
                megaMenuSubItemsOpen === "ecosystem" ? "flex" : "hidden"
              } pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}
            >
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/ecosystem/directory">Directory</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/ecosystem/bookings">Bookings</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/ecosystem/feedback">User Feedback</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/ecosystem/tasks">Task Manager</NavLink>
              </li>
            </ul>
          </div>

          {isAuthenticated() ? (
            <>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/">Feed</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/profile">View Profile</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li
                onClick={handleLogout}
                className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[5px]"
              >
                <TbLogout2 /> Logout
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/">Feed</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/login">Sign In</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
