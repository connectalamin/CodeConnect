import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { Navigate } from "react-router-dom";
import { FaExclamationTriangle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/CodeConnect.svg";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ed957] mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is verified (if the user object has isEmailVerified property)
  if (user.isEmailVerified === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb] p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-full blur-xl"></div>
                <img
                  src={Logo}
                  alt="CodeConnect Logo"
                  className="relative w-16 h-16 object-contain transform rotate-45"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Email Verification Required
            </h1>
            <p className="text-slate-600">
              Please verify your email to access all features
            </p>
          </div>

          {/* Verification Required Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <FaExclamationTriangle className="text-orange-500 text-2xl" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Verify Your Email
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your account needs email verification before you can access all CodeConnect features. 
                  Please check your inbox and click the verification link.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <FaExclamationTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-1">What you can do:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Browse posts and read content</li>
                      <li>• View user profiles</li>
                      <li>• Check the leaderboard</li>
                      <li>• Read notifications</li>
                    </ul>
                    <p className="font-medium mt-2 mb-1">What requires verification:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Create posts and comments</li>
                      <li>• Vote on content</li>
                      <li>• Save posts</li>
                      <li>• Update profile</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/verify-email"
                  className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <FaEnvelope className="text-sm" />
                  <span>Check Verification Status</span>
                </Link>

                <Link
                  to="/feed"
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Feed (Read Only)</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-slate-600 text-sm">
                  Need help? Contact support or{' '}
                  <Link 
                    to="/login" 
                    className="text-[#7ed957] font-semibold hover:text-[#6cc149] transition-colors duration-300"
                  >
                    sign in again
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/feed" replace />;
  }

  return children;
};

export default ProtectedRoute;