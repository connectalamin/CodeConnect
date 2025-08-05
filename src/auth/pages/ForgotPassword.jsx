import { useState } from "react";
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-hot-toast';
import authService from "../../services/authService";
import Logo from '../../assets/CodeConnect.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await authService.forgotPassword(email);
      setEmailSent(true);
      toast.success('Password reset email sent successfully! Please check your inbox.');
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast.error('No account found with this email address.');
            break;
          default:
            toast.error(error.response.data.error || 'Failed to send reset email. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
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
              We've sent a password reset link to your email
            </p>
          </div>

          {/* Email Sent Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-[#7ed957]/10 rounded-full flex items-center justify-center mx-auto">
                <FaEnvelope className="text-[#7ed957] text-2xl" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Reset Link Sent
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We've sent a password reset email to <strong>{email}</strong>. 
                  Please check your inbox and click the reset link to create a new password.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">Important:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Check your spam folder if you don't see the email</li>
                    <li>• The reset link expires in 1 hour</li>
                    <li>• You can only use the link once</li>
                    <li>• If you didn't request this, ignore the email</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <FaEnvelope className="text-sm" />
                  <span>Send Another Email</span>
                </button>

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
          <p className="text-slate-600 font-medium">Sending reset email...</p>
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
              Forgot Password?
            </h1>
            <p className="text-slate-600">
              Enter your email to reset your password
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-300 bg-slate-50/50"
                    placeholder="you@codeconnect.com"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7ed957] text-white font-semibold py-3 px-6 rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FaEnvelope className="text-sm" />
                <span>Send Reset Link</span>
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

export default ForgotPassword; 