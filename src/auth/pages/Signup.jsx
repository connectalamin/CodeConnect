import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import StrongPassword from "../../components/StrongPassword";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaRocket, FaUsers, FaCheckCircle, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Logo from '../../assets/CodeConnect.svg';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    setUser({
      ...user,
      password: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(user.password)) {
      toast.error('Password does not meet the requirements');
      return;
    }

    // Confirm password validation
    if (user.password !== user.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await authService.register(user);
      
      // Show success message and email verification notice
      toast.success('Account created successfully! Please check your email to verify your account.');
      setEmailSent(true);
      setUserEmail(user.email);
      
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.error || error.response.data.message);
            break;
          case 409:
            toast.error('Email already exists. Please use a different email.');
            break;
          case 422:
            toast.error('Please fill in all required fields.');
            break;
          default:
            toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setLoading(true);
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

  const handleBackToSignup = () => {
    setEmailSent(false);
    setUserEmail('');
    setUser({ name: '', email: '', password: '', confirmPassword: '' });
  };

  if (emailSent) {
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
              Check Your Email
            </h1>
            <p className="text-slate-600">
              We've sent a verification link to your email
            </p>
          </div>

          {/* Email Verification Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-[#7ed957]/10 rounded-full flex items-center justify-center mx-auto">
                <FaEnvelope className="text-[#7ed957] text-2xl" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Verify Your Email Address
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We've sent a verification email to <strong>{userEmail}</strong>. 
                  Please check your inbox and click the verification link to activate your account.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <FaExclamationTriangle className="text-blue-500 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Important:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• You can't log in until you verify your email</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
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
                  onClick={handleBackToSignup}
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-2xl hover:bg-slate-200 transition-all duration-300"
                >
                  Back to Sign Up
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-slate-600 text-sm">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-[#7ed957] font-semibold hover:text-[#6cc149] transition-colors duration-300"
                  >
                    Sign In
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
          <p className="text-slate-600 font-medium">Creating your account...</p>
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
              Join CodeConnect
            </h1>
            <p className="text-slate-600">
              Create your account and start collaborating
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
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-300 bg-slate-50/50"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

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
                    value={user.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-300 bg-slate-50/50"
                    placeholder="you@codeconnect.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <StrongPassword 
                  value={user.password}
                  onChange={handlePasswordChange}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-300 bg-slate-50/50"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-300"
                  >
                    {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                  </button>
                </div>
                {user.confirmPassword && user.password !== user.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
                {user.confirmPassword && user.password === user.confirmPassword && user.password && (
                  <p className="text-green-500 text-xs mt-1">Passwords match ✓</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FaUsers className="text-sm" />
                <span>Create Account</span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#7ed957] font-semibold hover:text-[#6cc149] transition-colors duration-300"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;