import Logo from '../../assets/CodeConnect.svg';
import categoriesgif from '../../assets/categories.gif';
import { FaBookOpen, FaBriefcase, FaSearch, FaRocket } from 'react-icons/fa';

const CodeConnectCategories = () => {
  const articleCategories = [
    { name: 'Coding', icon: '💻' },
    { name: 'AI & Machine Learning', icon: '🤖' },
    { name: 'DevOps', icon: '⚙️' },
    { name: 'Web Development', icon: '🌐' },
    { name: 'Mobile Apps', icon: '📱' },
    { name: 'Cybersecurity', icon: '🔒' },
    { name: 'Data Science', icon: '📊' },
    { name: 'Cloud Computing', icon: '☁️' },
  ];

  const jobCategories = [
    { name: 'Software Engineering', icon: '👨‍💻' },
    { name: 'Business Development', icon: '📈' },
    { name: 'DevOps', icon: '🔧' },
    { name: 'Data Analysis', icon: '📊' },
    { name: 'Frontend Development', icon: '🎨' },
    { name: 'Backend Development', icon: '⚙️' },
    { name: 'Product Management', icon: '📋' },
    { name: 'QA Engineering', icon: '🔍' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-white to-[#f0f9eb] py-20 -mt-1">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-full blur-xl"></div>
              <img
                src={Logo}
                alt="CodeConnect Logo"
                className="relative w-20 h-20 object-contain transform rotate-45 animate-float"
              />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Explore Our Community
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Connect with developers, explore insights, and find opportunities in tech. 
            Join thousands of professionals sharing knowledge and growing together.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Article Categories Card */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#7ed957] rounded-2xl mr-4">
                  <FaBookOpen className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Collaborative Articles</h3>
                  <p className="text-slate-600">Explore and contribute to articles across various technology domains</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {articleCategories.map((category, index) => (
                  <button
                    key={index}
                    className={`group flex items-center p-4 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-[#7ed957]`}
                  >
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Job Categories Card */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#7ed957] rounded-2xl mr-4">
                  <FaBriefcase className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Job Opportunities</h3>
                  <p className="text-slate-600">Discover career opportunities in the tech industry</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {jobCategories.map((category, index) => (
                  <button
                    key={index}
                    className={`group flex items-center p-4 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-[#7ed957]`}
                  >
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#7ed957]/10 to-transparent rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500"></div>
              <img
                src={categoriesgif}
                alt="Technology categories"
                className="relative w-full h-auto max-w-lg object-contain rounded-3xl shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{styles}</style>
    </div>
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