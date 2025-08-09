import { ChevronDown, Menu, X, LogOut, User, Settings, Shield, Home, FileText, MessageSquare, Info, Trophy, Users, MessageCircle, Bookmark, HelpCircle } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import Logo from "../assets/CodeConnect.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useCurrentUserProfile } from "../hooks/useCurrentUserProfile";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myContentMenuOpen, setMyContentMenuOpen] = useState(false);
  const { isAuthenticated, logout, role: authRole } = useAuth();
  const navigate = useNavigate();
  const { profile, loading } = useCurrentUserProfile();

  const isAdmin = authRole === 'ADMIN';

  const handleLogout = async () => {
    await logout();
    setAccountMenuOpen(false);
    setAdminMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/", { replace: true });
  };

  const adminMenuItems = [
    { path: "/admin/users", label: "User Management", icon: <User className="w-4 h-4" /> },
    { path: "/admin/categories", label: "Category Management", icon: <Settings className="w-4 h-4" /> },
  { path: "/admin/chat-rooms", label: "Chat Room Management", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const userMenuItems = [
    { path: "/profile", label: "View Profile", icon: <User className="w-4 h-4" /> },
    { path: "/edit-profile", label: "Update Profile", icon: <Settings className="w-4 h-4" /> },
    { path: "/about", label: "About the Site", icon: <Info className="w-4 h-4" /> },
    { path: "/faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const myContentItems = [
    { path: "/my-posts", label: "My Posts", icon: <FileText className="w-4 h-4" /> },
    { path: "/my-comments", label: "My Comments", icon: <MessageSquare className="w-4 h-4" /> },
    { path: "/saved-posts", label: "Saved Posts", icon: <Bookmark className="w-4 h-4" /> },
  ];

  const navigationItems = [
    { path: isAuthenticated() ? "/feed" : "/", label: isAuthenticated() ? "Feed" : "Home", icon: <Home className="w-4 h-4" /> },
    ...(isAuthenticated() ? [
      { path: "/leaderboard", label: "Leaderboard", icon: <Trophy className="w-4 h-4" /> },
      { path: "/chat-rooms", label: "Chat Rooms", icon: <MessageCircle className="w-4 h-4" /> },
    ] : []),
    ...(isAuthenticated() ? [] : [
      { path: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
      { path: "/faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> }
    ]),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="CodeConnect Logo"
              className="w-8 h-8 object-contain transform rotate-45"
            />
            <span className="text-xl font-bold text-slate-900">CodeConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#7ED957] bg-[#7ED957]/10"
                      : "text-slate-600 hover:text-[#7ED957] hover:bg-slate-50"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}

            {/* My Content Menu */}
            {isAuthenticated() && (
              <div className="relative">
                <button
                  onClick={() => setMyContentMenuOpen(!myContentMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    myContentMenuOpen
                      ? "text-[#7ED957] bg-[#7ED957]/10"
                      : "text-slate-600 hover:text-[#7ED957] hover:bg-slate-50"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>My Content</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${myContentMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {myContentMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    {myContentItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#7ED957] transition-colors duration-200"
                        onClick={() => setMyContentMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Admin Menu */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    adminMenuOpen
                      ? "text-[#7ED957] bg-[#7ED957]/10"
                      : "text-slate-600 hover:text-[#7ED957] hover:bg-slate-50"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${adminMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    {adminMenuItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#7ED957] transition-colors duration-200"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() && (
              <NotificationDropdown />
            )}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="relative">
                    {!loading && profile?.user?.image ? (
                      <img
                        src={profile.user.image}
                        alt={`${profile.user.name}'s profile`}
                        className="w-8 h-8 rounded-full object-cover border-2 border-slate-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#7ED957] rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {profile?.user?.name ? profile.user.name.split(" ")[0] : "User"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${accountMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    {userMenuItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#7ED957] transition-colors duration-200"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                    <div className="border-t border-slate-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#7ED957] transition-colors duration-200"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#7ED957] rounded-lg hover:bg-[#6cc149] transition-colors duration-200"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[#7ED957] bg-[#7ED957]/10"
                        : "text-slate-600 hover:text-[#7ED957] hover:bg-slate-50"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}

              {/* Mobile Admin Menu */}
              {isAdmin && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Admin
                  </div>
                  {adminMenuItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-slate-600 hover:text-[#7ED957] hover:bg-slate-50 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </>
              )}

              {/* Mobile User Menu */}
              {isAuthenticated() ? (
                <>
                  <div className="border-t border-slate-200 my-2"></div>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    My Content
                  </div>
                  {myContentItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-slate-600 hover:text-[#7ED957] hover:bg-slate-50 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                  
                  <div className="border-t border-slate-200 my-2"></div>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Account
                  </div>
                  {userMenuItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-slate-600 hover:text-[#7ED957] hover:bg-slate-50 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-slate-200 my-2"></div>
                  <div className="flex flex-col space-y-2 px-4">
                    <NavLink
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#7ED957] transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="px-4 py-2 text-sm font-medium text-white bg-[#7ED957] rounded-lg hover:bg-[#6cc149] transition-colors duration-200 text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;