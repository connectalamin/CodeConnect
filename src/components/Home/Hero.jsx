import collabgif from '../../assets/collab.gif';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div>
      {/* Hero Section (Desktop Only) */}
      <section className="hidden md:flex flex-row items-center justify-between py-16 px-4 max-w-5xl mx-auto">
        {/* Text and Buttons (Left) */}
        <div className="w-1/2 text-left">
          <h1 className="text-4xl font-bold text-[#7ed957] mb-4">
            CodeConnect
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Debug Smarter, Not Harder.
          </p>
          <div className="flex gap-4">
            <button className="py-2 px-6 text-sm font-medium text-white bg-[#7ed957] rounded-full hover:bg-[#6cc149] transition-all duration-300">
              <Link to="/login">Sign In</Link>
            </button>
            <button className="py-2 px-6 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:text-[#7ed957] hover:border-[#7ed957] transition-all duration-300">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>

        {/* Illustration (Right) */}
        <div className="w-1/2 p-4">
          <img
            src={collabgif}
            alt="Developer working"
            className="w-full h-auto object-contain rounded-lg "
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;