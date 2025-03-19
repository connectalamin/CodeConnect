import { IoIosArrowUp } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { Group } from "@mantine/core";
import { AiOutlineComment, AiOutlineFire, AiOutlineInbox } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import Logo from "../assets/CodeConnect.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useCurrentUserProfile } from "../hooks/useCurrentUserProfile";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isAuthenticated, logout, role: authRole } = useAuth();
  const navigate = useNavigate();
  const { profile, loading } = useCurrentUserProfile();

  const isAdmin = (profile?.user?.role?.toUpperCase() === "ADMIN") || 
                  (authRole?.toUpperCase() === "ADMIN");

  const handleLogout = async () => {
    await logout();
    setAccountMenuOpen(false);
    setAdminMenuOpen(false);
    navigate("/", { replace: true });
  };

  const adminMenuItems = [
    { path: "/admin/users", label: "User Management", icon: <FiUser /> },
    { path: "/admin/categories", label: "Category Management", icon: <IoSettingsOutline /> },
  ];

  const userMenuItems = [
    { path: "/profile", label: "View Profile", icon: <FiUser /> },
    { path: "/edit-profile", label: "Update Profile", icon: <IoSettingsOutline /> },
  ];

  return (
    <nav className="flex items-center justify-between w-full relative px-4 max-w-[1440px] mx-auto bg-white shadow-md py-2">
      <Group className="flex items-center">
        <img
          src={Logo}
          alt="CodeConnect Logo"
          className="w-12 md:w-14 object-contain transform rotate-45"
        />
        <h1 className="text-xl md:text-2xl font-bold text-[#7ed957]">CodeConnect</h1>
      </Group>

      <ul className="hidden md:flex items-center gap-5 text-base text-[#424242]">
        <li className="flex items-center hover:text-[#3B9DF8] group gap-2 cursor-pointer">
          <AiOutlineFire className="text-lg group-hover:text-[#3B9DF8] text-gray-600" />
          <NavLink to={isAuthenticated() ? "/feed" : "/"}>
            {isAuthenticated() ? "Feed" : "Home"}
          </NavLink>
        </li>
        {isAuthenticated() && (
          <>
            <li className="flex items-center hover:text-[#3B9DF8] group gap-2 cursor-pointer">
              <AiOutlineInbox className="text-lg group-hover:text-[#3B9DF8] text-gray-600" />
              <NavLink to="/my-posts">My Posts</NavLink>
            </li>
            <li className="flex items-center hover:text-[#3B9DF8] group gap-2 cursor-pointer">
              <AiOutlineComment className="text-lg group-hover:text-[#3B9DF8] text-gray-600" />
              <NavLink to="/my-comments">My Comments</NavLink>
            </li>
          </>
        )}
        <li className="flex items-center hover:text-[#3B9DF8] group gap-2 cursor-pointer">
          <IoInformationCircleOutline className="text-lg group-hover:text-[#3B9DF8] text-gray-600" />
          <NavLink to="/about">About</NavLink>
        </li>
        {isAdmin && (
          <li className="relative flex items-center group">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[#3B9DF8]"
              onClick={() => setAdminMenuOpen(!adminMenuOpen)}
            >
              <FaUserShield className="text-lg group-hover:text-[#3B9DF8] text-gray-600" />
              <span>Admin</span>
              <IoIosArrowUp
                className={`${adminMenuOpen ? "rotate-0" : "rotate-180"} transition-all duration-300 text-gray-600`}
              />
            </div>
            <div
              className={`${
                adminMenuOpen ? "translate-y-0 opacity-100 z-10" : "translate-y-2 opacity-0 z-[-1]"
              } bg-white w-max rounded-md absolute top-10 left-0 p-2 flex flex-col transition-all duration-300 gap-1 shadow-md border border-gray-100`}
            >
              {adminMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 rounded-md p-2 text-base text-gray-600 hover:bg-gray-50 hover:text-[#7ed957] transition-all duration-300 whitespace-nowrap"
                  onClick={() => setAdminMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated() ? (
          <div className="relative hidden md:flex items-center gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            >
              <div className="relative">
                {!loading && profile?.user?.image ? (
                  <img
                    src={profile.user.image}
                    alt={`${profile.user.name}'s profile`}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircle
                    size={36}
                    className="text-gray-600 cursor-pointer hover:text-[#7ed957] transition-colors duration-300"
                  />
                )}
                <div
                  className="w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-white"
                  title="Online"
                />
              </div>
              {profile?.user?.name && (
                <h1 className="text-base text-gray-600 font-semibold">
                  {profile.user.name.split(" ")[0]}
                </h1>
              )}
              <IoIosArrowUp
                className={`${accountMenuOpen ? "rotate-0" : "rotate-180"} transition-all duration-300 text-gray-600`}
              />
            </div>
            <div
              className={`${
                accountMenuOpen ? "translate-y-0 opacity-100 z-10" : "translate-y-2 opacity-0 z-[-1]"
              } bg-white w-max rounded-md absolute top-12 right-0 p-2 flex flex-col transition-all duration-300 gap-1 shadow-md border border-gray-100`}
            >
              {userMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 rounded-md p-2 text-base text-gray-600 hover:bg-gray-50 hover:text-[#7ed957] transition-all duration-300 whitespace-nowrap"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md p-2 text-base text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 w-full text-left"
              >
                <TbLogout2 />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
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
        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-2xl text-[#424242] cursor-pointer md:hidden flex"
        />
      </div>

      <aside
        className={`${
          mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-full opacity-0 z-[-1]"
        } md:hidden bg-white p-4 absolute top-14 right-0 w-full sm:w-72 rounded-md transition-all duration-300 shadow-md border border-gray-100`}
      >
        <ul className="flex flex-col items-start gap-2 text-base text-gray-600">
          {isAuthenticated() ? (
            <>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/feed" className="block py-2 px-4">Feed</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/my-posts" className="block py-2 px-4">My Posts</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/my-comments" className="block py-2 px-4">My Comments</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/about" className="block py-2 px-4">About</NavLink>
              </li>
              {isAdmin && (
                <>
                  <li className="text-xs uppercase text-gray-400 font-bold mt-2 mb-1 px-4">Admin</li>
                  {adminMenuItems.map((item) => (
                    <li
                      key={item.path}
                      className="hover:text-[#3B9DF8] transition-all duration-300"
                    >
                      <NavLink to={item.path} className="block py-2 px-4">{item.label}</NavLink>
                    </li>
                  ))}
                </>
              )}
              {userMenuItems.map((item) => (
                <li
                  key={item.path}
                  className="hover:text-[#3B9DF8] transition-all duration-300"
                >
                  <NavLink to={item.path} className="block py-2 px-4">{item.label}</NavLink>
                </li>
              ))}
              <li
                onClick={handleLogout}
                className="hover:text-red-600 transition-all duration-300 flex items-center gap-2 py-2 px-4 cursor-pointer"
              >
                <TbLogout2 /> Logout
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/" className="block py-2 px-4">Home</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/about" className="block py-2 px-4">About</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/login" className="block py-2 px-4">Sign In</NavLink>
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-300">
                <NavLink to="/signup" className="block py-2 px-4">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;