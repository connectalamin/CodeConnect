import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import authService from '../../services/authService';
import StrongPassword from '../../components/StrongPassword';
import Logo from '../../assets/CodeConnect.svg';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('No reset token provided');
      toast.error('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error('Please enter a new password');
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(token, password);
      setSuccess(true);
      toast.success('Password reset successfully! You can now log in with your new password.');
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError(error.response.data.error || 'Invalid password format');
            toast.error(error.response.data.error || 'Please check your password requirements.');
            break;
          default:
            setError(error.response.data.error || 'Reset failed');
            toast.error('Password reset failed. Please try again.');
        }
      } else {
        setError('Network error. Please try again.');
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb] p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-full blur-xl"></div>
                <div className="relative w-16 h-16 bg-[#7ed957] rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Password Reset Success!
            </h1>
            <p className="text-slate-600">
              Your password has been updated successfully
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-[#7ed957]/10 rounded-full flex items-center justify-center mx-auto">
                <FaCheckCircle className="text-[#7ed957] text-2xl" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Password Updated
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your password has been successfully reset. You can now log in to your CodeConnect account with your new password.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">Security reminder:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Keep your password secure</li>
                      <li>• Don't share your credentials</li>
                      <li>• Log out from shared devices</li>
                      <li>• Consider enabling 2FA if available</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                to="/login"
                className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FaArrowLeft className="text-sm" />
                <span>Go to Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !token) {
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
              Invalid Reset Link
            </h1>
            <p className="text-slate-600">
              The reset link is invalid or has expired
            </p>
          </div>

          {/* Error Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Reset Link Invalid
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The password reset link is invalid, expired, or has already been used. Please request a new password reset.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to="/forgot-password"
                  className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <FaLock className="text-sm" />
                  <span>Request New Reset</span>
                </Link>

                <Link
                  to="/login"
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaArrowLeft className="text-sm" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb] p-4">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <HashLoader color="#7ed957" loading speedMultiplier={2} />
          <p className="text-slate-600 font-medium">Resetting your password...</p>
        </div>
      ) : (
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
              Reset Password
            </h1>
            <p className="text-slate-600">
              Create a new password for your account
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <StrongPassword 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FaLock className="text-sm" />
                <span>Reset Password</span>
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-slate-600 text-sm">
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className="text-[#7ed957] font-semibold hover:text-[#6cc149] transition-colors duration-300"
                >
                  Sign In
                </Link>
              </p>
              <p className="text-slate-600 text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-[#7ed957] font-semibold hover:text-[#6cc149] transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword; 