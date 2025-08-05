// filepath: h:\Academic\CodeConnect\CodeConnect_Client\src\auth\pages\Login.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { FaEnvelope, FaLock, FaRocket, FaExclamationTriangle } from 'react-icons/fa';
import Logo from '../../assets/CodeConnect.svg';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setError('');
      setLoading(true);
      const user = await login(credentials);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/feed');
      }
      toast.success('Login successful!');
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error('Invalid email or password');
            break;
          case 403:
            // Email verification required
            if (error.response.data.needsVerification) {
              setNeedsVerification(true);
              setUserEmail(credentials.email);
              toast.error('Please verify your email before logging in');
            } else {
              toast.error('Access denied. Please check your credentials.');
            }
            break;
          case 404:
            toast.error('Account not found');
            break;
          case 500:
            toast.error('Server error. Please try again later');
            break;
          default:
            toast.error(error.response.data.message || 'Login failed. Please try again');
        }
      } else if (error.request) {
        toast.error('Unable to connect to server. Please check your internet connection');
      } else {
        toast.error('An unexpected error occurred. Please try again');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      // Import authService here to avoid circular dependency
      const authService = (await import('../../services/authService')).default;
      await authService.resendVerificationEmail(userEmail);
      toast.success('Verification email sent successfully! Please check your inbox.');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || 'Failed to resend email. Please try again.');
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setNeedsVerification(false);
    setUserEmail('');
    setCredentials({ email: '', password: '' });
  };

  if (needsVerification) {
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
              Please verify your email to continue
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
                  Your account exists but needs email verification. We've sent a verification email to <strong>{userEmail}</strong>. 
                  Please check your inbox and click the verification link.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <FaExclamationTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-1">Important:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• You can't log in until you verify your email</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <HashLoader color="#ffffff" size={20} />
                  ) : (
                    <>
                      <FaEnvelope className="text-sm" />
                      <span>Resend Verification Email</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-2xl hover:bg-slate-200 transition-all duration-300"
                >
                  Back to Login
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb] p-4">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <HashLoader color="#7ed957" loading speedMultiplier={2} />
          <p className="text-slate-600 font-medium">Signing you in...</p>
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
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Sign in to your CodeConnect account
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
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-300 bg-slate-50/50"
                    placeholder="you@codeconnect.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-300 bg-slate-50/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-300"
                  >
                    {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FaRocket className="text-sm" />
                <span>Sign In</span>
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-slate-600 text-sm">
                <Link 
                  to="/forgot-password" 
                  className="text-[#7ed957] font-semibold hover:text-[#6cc149] transition-colors duration-300"
                >
                  Forgot your password?
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

export default Login;