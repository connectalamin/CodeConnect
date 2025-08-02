import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import StrongPassword from "../../components/StrongPassword";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaRocket, FaUsers } from 'react-icons/fa';
import Logo from '../../assets/CodeConnect.svg';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation
    if (!user.name || !user.email || !user.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await authService.register(user);
      // After registration, login with credentials
      await login({
        email: user.email,
        password: user.password
      });
      toast.success('Registration successful!');
      navigate('/feed'); // Navigate after successful login
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
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <StrongPassword 
                  value={user.password}
                  onChange={handleChange}
                />
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