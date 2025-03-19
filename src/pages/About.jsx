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
      <div className="bg-gradient-to-br from-white to-[#f0f9eb]">
        <section className="flex flex-col md:flex-row items-center justify-between py-8 md:py-16 px-4 max-w-5xl mx-auto">
          <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
            <img
              src={Logo}
              alt="CodeConnect Logo"
              className="w-auto h-24 md:h-32 mb-6 object-contain transform rotate-45 animate-float"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-[#7ed957] mb-4">
              About CodeConnect
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              <span className="font-semibold text-[#5caa3b]">CodeConnect</span> is your hub for developer, student, teacher collaboration, designed to help you <span className="text-[#5caa3b] font-semibold">debug smarter, not harder.</span>
            </p>

            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                Made by Alamin <span className="text-xs text-[#5caa3b]">(Session 2020-2021)</span>
              </h2>
              <p className="text-gray-600">
                Crafted with passion by Alamin as a semester project to empower the developer community of Comilla University.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-4">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-full hover:bg-[#7ed957] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {tech.icon}
                    <span className="text-sm font-medium text-gray-700 hover:text-white">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                As a Semester Project
              </h2>
              <p className="text-gray-600">
                Developed as part of an academic semester, <span className="font-semibold text-[#5caa3b]">CodeConnect</span> showcases innovative solutions for tech collaboration.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={aboutgif}
              alt="Developer collaboration"
              className="w-full h-auto object-contain rounded-lg animate-pulse-slow"
            />
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
  @keyframes pulseSlow {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 1; }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-pulse-slow {
    animation: pulseSlow 4s ease-in-out infinite;
  }
`;

export default About;