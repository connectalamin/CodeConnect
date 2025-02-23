import Logo from '../assets/CodeConnect.svg';
import Notfound from '../assets/404.gif'; // Placeholder for illustration, replace with your GIF path

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f0f9eb]">
      <div className="flex flex-col items-center justify-center py-8 px-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        {/* Illustration (Top) */}
        <div className="w-full flex justify-center items-center mb-4">
          <img
            src={Notfound}
            alt="Page not found illustration"
            className="w-full h-auto object-contain "
          />
        </div>

        {/* Text and Message (Bottom) */}
        <div className="w-full text-center">
          <img
            src={Logo}
            alt="CodeConnect Logo"
            className="w-auto h-24 mb-4 object-contain transform rotate-45 mx-auto"
          />
          <h1 className="text-2xl font-bold text-[#7ed957] mb-2">
            Page Not Found
          </h1>
          <p className="text-md text-gray-600 mb-4">
            Sorry, the page you are looking for does not exist.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;