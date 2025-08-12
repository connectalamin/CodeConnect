import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaEnvelope, FaArrowLeft, FaUserPlus, FaCode, FaTrophy, FaUsers } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import authService from '../services/authService';
import Logo from '../assets/CodeConnect.svg';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No verification token provided');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 About to call verifyEmail with token:', token);
        const response = await authService.verifyEmail(token);
        console.log('✅ Verification response:', response);
        setSuccess(true);
        toast.success('Email verified successfully! You can now log in to your account.');
      } catch (error) {
        console.error('❌ Verification error:', error);
        if (error.response) {
          console.log('Error response:', error.response);
          setError(error.response.data.error || 'Verification failed');
        } else {
          console.log('Network error:', error.message);
          setError('Network error. Please try again.');
        }
        toast.error('Email verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e8f5e8 30%, #d4f4dd 100%)' }}>
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: '#7ed957', opacity: 0.2 }}></div>
            <img
              src={Logo}
              alt="CodeConnect Logo"
              className="relative w-20 h-20 object-contain mx-auto"
            />
          </div>
          <div className="space-y-2">
            <HashLoader color="#7ed957" loading speedMultiplier={1.5} size={50} />
            <p className="text-slate-700 font-semibold text-lg">Verifying your email...</p>
            <p className="text-slate-500 text-sm">This will only take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e8f5e8 30%, #d4f4dd 100%)' }}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: '#7ed957', opacity: 0.3 }}></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20 group-hover:scale-110 transition-all duration-500">
                <img
                  src={Logo}
                  alt="CodeConnect Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Email Verification
          </h1>
          <p className="text-slate-600 text-lg">
            {success ? 'Welcome to CodeConnect!' : 'Something went wrong'}
          </p>
        </div>

        {/* Verification Result Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-16 translate-x-16" style={{ backgroundColor: '#7ed957', opacity: 0.1 }}></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl translate-y-12 -translate-x-12" style={{ backgroundColor: '#6bc946', opacity: 0.1 }}></div>
          
          <div className="relative z-10">
            {success ? (
              <div className="text-center space-y-8">
                {/* Success Icon */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-2xl" style={{ backgroundColor: '#7ed957' }}>
                    <FaCheckCircle className="text-white text-3xl" />
                  </div>
                  <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: '#7ed957', opacity: 0.2 }}></div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-transparent" style={{ backgroundImage: `linear-gradient(to right, #7ed957, #6bc946)`, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                    Verification Successful!
                  </h2>
                  <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                    Your email address has been successfully verified. You can now log in to your CodeConnect account and start collaborating with other developers.
                  </p>
                </div>

                {/* Next Steps Card */}
                <div className="border rounded-2xl p-6 backdrop-blur-sm" style={{ backgroundColor: '#7ed95710', borderColor: '#7ed95730' }}>
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7ed957' }}>
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <h3 className="font-semibold" style={{ color: '#5fa542' }}>What's next?</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center space-y-2 p-3 bg-white/50 rounded-xl">
                        <FaUserPlus style={{ color: '#7ed957' }} className="text-lg" />
                        <span className="text-xs font-medium" style={{ color: '#5fa542' }}>Complete Profile</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 p-3 bg-white/50 rounded-xl">
                        <FaCode style={{ color: '#7ed957' }} className="text-lg" />
                        <span className="text-xs font-medium" style={{ color: '#5fa542' }}>Share Code</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 p-3 bg-white/50 rounded-xl">
                        <FaUsers style={{ color: '#7ed957' }} className="text-lg" />
                        <span className="text-xs font-medium" style={{ color: '#5fa542' }}>Collaborate</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 p-3 bg-white/50 rounded-xl">
                        <FaTrophy style={{ color: '#7ed957' }} className="text-lg" />
                        <span className="text-xs font-medium" style={{ color: '#5fa542' }}>Earn Karma</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to="/login"
                  className="group w-full text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 relative overflow-hidden"
                  style={{ 
                    backgroundColor: '#7ed957',
                    backgroundImage: 'linear-gradient(135deg, #7ed957 0%, #6bc946 100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundImage = 'linear-gradient(135deg, #6bc946 0%, #5fa542 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundImage = 'linear-gradient(135deg, #7ed957 0%, #6bc946 100%)';
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
                  <FaArrowLeft className="text-lg relative z-10" />
                  <span className="text-lg relative z-10">Go to Login</span>
                </Link>
              </div>
            ) : (
              <div className="text-center space-y-8">
                {/* Error Icon */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <FaExclamationTriangle className="text-white text-3xl" />
                  </div>
                  <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Verification Failed
                  </h2>
                  <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                    {error || 'We couldn\'t verify your email address. This could be due to an expired or invalid verification link.'}
                  </p>
                </div>

                {/* Error Details Card */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200/50 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaExclamationTriangle className="text-white text-sm" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-red-800 mb-2">Possible reasons:</p>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• The verification link has expired (24 hours)</li>
                        <li>• The link was already used</li>
                        <li>• Invalid or corrupted link</li>
                        <li>• Network connectivity issues</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Link
                    to="/signup"
                    className="group w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
                    <FaEnvelope className="text-lg relative z-10" />
                    <span className="text-lg relative z-10">Request New Link</span>
                  </Link>

                  <Link
                    to="/login"
                    className="w-full bg-white/80 backdrop-blur-sm text-slate-700 font-semibold py-4 px-8 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 border border-slate-200"
                  >
                    <FaArrowLeft className="text-lg" />
                    <span className="text-lg">Back to Login</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 