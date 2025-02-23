import Logo from '../assets/CodeConnect.svg';
import emptygif from '../assets/no_result.gif'; // Placeholder for illustration, replace with your GIF path

const Error = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f0f9eb]">
      <div className="flex flex-col md:flex-row items-center justify-between py-16 px-4 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Text and Message (Left) */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <img
            src={Logo}
            alt="CodeConnect Logo"
            className="w-auto h-32 mb-6 object-contain transform rotate-45 mx-auto md:mx-0"
          />
          <h1 className="text-3xl font-bold text-[#7ed957] mb-4">
            Result Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Whoops ... this information is not available for a moment.
          </p>
        </div>

        {/* Illustration (Right) */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={emptygif}
            alt="Empty result illustration"
            className="w-full h-auto object-contain "
          />
        </div>
      </div>
    </section>
  );
};

export default Error;