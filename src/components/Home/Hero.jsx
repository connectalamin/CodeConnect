import collabgif from '../../assets/collab.gif';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between py-8 md:py-16 px-4 max-w-5xl mx-auto">
        <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7ed957] mb-4 text-center sm:text-left">
            CodeConnect
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 text-center sm:text-left">
            Debug Smarter, Not Harder.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="w-full md:w-auto py-2 px-6 text-sm font-medium text-white bg-[#7ed957] rounded-full hover:bg-[#6cc149] transition-all duration-300">
              <Link to="/login">Sign In</Link>
            </button>
            <button className="w-full md:w-auto py-2 px-6 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:text-[#7ed957] hover:border-[#7ed957] transition-all duration-300">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <img
            src={collabgif}
            alt="Developer working"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;