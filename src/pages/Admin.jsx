import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserManagement } from '../hooks/useUserManagement';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
import { 
  Users, 
  Tag, 
  Shield, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  ChevronRight,
  Activity,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [activePage, setActivePage] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { users } = useUserManagement();
  const { categories } = useCategoryManagement();
  const userCount = users.length;
  const categoryCount = categories.length;

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
    { 
      path: '/admin/users', 
      label: 'Users', 
      icon: <Users className="w-4 h-4" />,
      count: userCount
    },
    { 
      path: '/admin/categories', 
      label: 'Categories', 
      icon: <Tag className="w-4 h-4" />,
      count: categoryCount
    },
    {
      path: '/admin/chat-rooms',
      label: 'Chat Rooms',
      icon: <Shield className="w-4 h-4" />,
      count: undefined
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#7ED957] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">Admin</span>
          </div>
            <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
            <Menu className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="flex h-full">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300`}
        >
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#7ED957] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900">Admin</h1>
                <p className="text-xs text-slate-500">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Header */}
          <div className="md:hidden p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#7ED957] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
              </div>
                <span className="font-semibold text-slate-900">Admin</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

            {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {adminNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-[#7ED957] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                  {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${
                    location.pathname === link.path ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    <span className="text-xs font-medium">{link.count}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </NavLink>
              ))}
            </div>
            </nav>

          {/* Stats Cards */}
          <div className="p-4 space-y-3">
            <div className="bg-gradient-to-br from-[#7ED957]/5 to-[#6cc149]/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#7ED957]" />
                  <span className="text-sm font-medium text-slate-700">Overview</span>
                  </div>
                <TrendingUp className="w-4 h-4 text-[#7ED957]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{userCount}</div>
                  <div className="text-xs text-slate-500">Users</div>
                  </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{categoryCount}</div>
                  <div className="text-xs text-slate-500">Categories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full">
          {/* Content Area - Full Height with Scroll */}
          <div className="flex-1 p-4 md:p-8 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full overflow-auto">
            <Outlet />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;