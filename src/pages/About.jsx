import {
  FaReact,
  FaJs,
  FaCss3,
  FaHtml5,
  FaGit,
  FaNodeJs,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiVite,
  SiPrisma,
  SiPostgresql,
  SiExpress,
} from 'react-icons/si';
import Logo from '../assets/CodeConnect.svg';
import aboutgif from '../assets/aboutme.gif';
import Navbar from '../components/Navbar';
import React from 'react';

const About = () => {
  const technologies = [
    { name: 'React', icon: <FaReact className="text-blue-500" size={24} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-500" size={24} /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-500" size={24} /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" size={24} /> },
    { name: 'CSS3', icon: <FaCss3 className="text-blue-400" size={24} /> },
    { name: 'Git', icon: <FaGit className="text-red-500" size={24} /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" size={24} /> },
    { name: 'Vite', icon: <SiVite className="text-purple-500" size={24} /> },
    { name: 'Prisma', icon: <SiPrisma className="text-purple-600" size={24} /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-600" size={24} /> },
    { name: 'Express', icon: <SiExpress className="text-gray-800" size={24} /> },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white to-[#f0f9eb] h-screen overflow-hidden">
        <section className="flex flex-col md:flex-row items-center justify-between py-8 md:py-12 px-4 max-w-6xl mx-auto h-full">
          <div className="w-full md:w-1/2 text-left mb-8 md:mb-0 md:pr-8 overflow-y-auto">
            {/* Logo with modern styling */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-full blur-xl"></div>
              <img
                src={Logo}
                alt="CodeConnect Logo"
                className="relative w-20 h-20 object-contain transform rotate-45 animate-float"
              />
            </div>
            
            {/* Main heading with modern typography */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              About <span className="text-[#7ed957] bg-gradient-to-r from-[#7ed957] to-[#6cc149] bg-clip-text text-transparent">CodeConnect</span>
            </h1>
            
            {/* Description with better typography */}
            <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
              <span className="font-semibold text-[#5caa3b]">CodeConnect</span> is your hub for developer, student, teacher collaboration, designed to help you <span className="text-[#5caa3b] font-semibold">debug smarter, not harder.</span>
            </p>

            {/* Creator section with modern card design */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Made by Alamin <span className="text-sm text-[#5caa3b] font-normal">(Session 2020-2021)</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                Crafted with passion by Alamin as a semester project to empower the developer community of Comilla University.
              </p>
            </div>

            {/* Technologies section with modern styling */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-slate-50 rounded-xl hover:bg-[#7ed957]/10 transition-all duration-300 cursor-pointer group"
                  >
                    {tech.icon}
                    <span className="ml-2 text-xs font-medium text-slate-700 group-hover:text-slate-900">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

 </div>
          {/* Right side image with modern styling */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500"></div>
              <img
                src={aboutgif}
                alt="Developer collaboration"
                className="relative w-full h-auto max-w-md object-contain rounded-3xl shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      </div>

      <style>{styles}</style>
    </>
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

export default About;