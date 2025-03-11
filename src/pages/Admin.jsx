import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiUser, FiBarChart2 } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { useUserManagement } from '../hooks/useUserManagement';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [activePage, setActivePage] = useState('users');
  const {users} = useUserManagement();
  const {categories} = useCategoryManagement();
  const usercount = users.length;
  const categorycount = categories.length;
  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/users', { replace: true });
    }
    
    if (location.pathname.includes('/admin/users')) {
      setActivePage('users');
    } else if (location.pathname.includes('/admin/categories')) {
      setActivePage('categories');
    }
  }, [location, navigate]);

  const adminNavLinks = [
    { path: '/admin/users', label: 'User Management', icon: <FiUser className="text-xl" /> },
    { path: '/admin/categories', label: 'Category Management', icon: <IoSettingsOutline className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FaUserShield className="text-3xl text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Control Center</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {adminNavLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
                      }`
                    }
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Stats Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-700 flex items-center gap-2 mb-3">
                <FiBarChart2 /> Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-600">Total Users</p>
                  <p className="text-xl font-bold text-green-600">{usercount}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-600">Categories</p>
                  <p className="text-xl font-bold text-green-600">{categorycount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[calc(100vh-4rem)]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;