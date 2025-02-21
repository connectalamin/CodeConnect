import Logo from '../../assets/CodeConnect.svg';
import categoriesgif from '../../assets/categories.gif';

const CodeConnectCategories = () => {
  const articleCategories = [
    'Coding',
    'AI & Machine Learning',
    'DevOps',
    'Web Development',
    'Mobile Apps',
    'Cybersecurity',
    'Data Science',
    'Cloud Computing',
  ];

  const jobCategories = [
    'Software Engineering',
    'Business Development',
    'DevOps',
    'Data Analysis',
    'Frontend Development',
    'Backend Development',
    'Product Management',
    'QA Engineering',
  ];

  return (
    <section className="hidden md:flex flex-row items-center justify-between py-16 px-4 max-w-5xl mx-auto">
      {/* Text and Categories (Left) */}
      <div className="w-1/2 text-left">
        <img
          src={Logo}
          alt="CodeConnect Logo"
          className="w-auto h-32 mb-6 object-contain transform rotate-45 animate-float"
        />
        <h1 className="text-3xl font-bold text-[#7ed957] mb-4">
          Explore CodeConnect Categories
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Connect with developers, explore insights, and find opportunities in tech.
        </p>

        {/* Collaborative Articles */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Collaborative Articles
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {articleCategories.map((category) => (
              <button
                key={category}
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-[#7ED957] hover:text-[#ffffff] transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Job Opportunities */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Job Opportunities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {jobCategories.map((category) => (
              <button
                key={category}
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-[#7ED957] hover:text-[#ffffff] transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Illustration (Right) */}
      <div className="w-1/2 flex justify-center items-center relative">
        <img
          src={categoriesgif}
          alt="Developer working"
          className="w-full h-auto object-contain rounded-lg absolute top-0 "
        />
      </div>
       {/* Inject styles */}
       <style>{styles}</style>
    </section>
  );
};

const styles = `
  @keyframes float {
    0% { transform: translateY(0) rotate(45deg); }
    50% { transform: translateY(-10px) rotate(45deg); }
    100% { transform: translateY(0) rotate(45deg); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

export default CodeConnectCategories;