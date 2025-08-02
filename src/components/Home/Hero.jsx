import collabgif from '../../assets/collab.gif';
import { Link } from 'react-router-dom';
import { FaRocket, FaCode, FaUsers } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-[#f0f9eb] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/5 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ed957]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ed957]/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <section className="flex flex-col lg:flex-row items-center justify-between py-16 md:py-24 px-4 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-left mb-12 lg:mb-0 lg:pr-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#7ed957]/10 text-[#7ed957] rounded-full text-sm font-medium mb-8 border border-[#7ed957]/20">
              <FaRocket className="mr-2" />
              Welcome to CodeConnect
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Debug Smarter,
              <span className="block text-[#7ed957]">
                Not Harder
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              Join a community of developers, students, and teachers. Share knowledge, 
              solve problems, and grow together in the world of technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/signup"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <FaRocket className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                to="/login"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#7ed957] bg-white border-2 border-[#7ed957] rounded-2xl hover:bg-[#7ed957] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
                <FaUsers className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-3">
                  <div className="p-2 bg-[#7ed957]/10 rounded-lg">
                    <FaUsers className="text-2xl text-[#7ed957]" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Community</h3>
                <p className="text-sm text-slate-600">Connect with developers worldwide</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-3">
                  <div className="p-2 bg-[#7ed957]/10 rounded-lg">
                    <FaCode className="text-2xl text-[#7ed957]" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Collaborate</h3>
                <p className="text-sm text-slate-600">Share knowledge and solve problems</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-3">
                  <div className="p-2 bg-[#7ed957]/10 rounded-lg">
                    <FaRocket className="text-2xl text-[#7ed957]" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Innovate</h3>
                <p className="text-sm text-slate-600">Discover new solutions together</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#7ed957]/10 to-transparent rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500"></div>
              <img
                src={collabgif}
                alt="Developer collaboration"
                className="relative w-full h-auto max-w-lg object-contain rounded-3xl shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;