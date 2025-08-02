// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import authService from '../services/authService';
import HashLoader from 'react-spinners/HashLoader';
import Navbar from '../components/Navbar';
import { FaUser, FaEnvelope, FaGraduationCap, FaCalendar, FaUniversity, FaBriefcase, FaCode, FaSave, FaUpload, FaTimes, FaArrowLeft } from 'react-icons/fa';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { profile, refetchProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    classId: '',
    session: '',
    batch: '',
    dept: '',
    university: '',
    occupation: '',
    expertise: [],
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (profile?.user) {
      setFormData({
        name: profile.user.name || '',
        image: null,
        classId: profile.user.classId || '',
        session: profile.user.session || '',
        batch: profile.user.batch || '',
        dept: profile.user.dept || '',
        university: profile.user.university || '',
        occupation: profile.user.occupation || '',
        expertise: profile.user.expertise || [],
      });
    }
  }, [profile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.expertise.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData[key]) {
          updateData.append('image', formData[key]);
        } else if (key === 'expertise' && formData[key].length > 0) {
          updateData.append('expertise', JSON.stringify(formData[key]));
        } else if (formData[key] && key !== 'expertise') {
          updateData.append(key, formData[key]);
        }
      });

      await authService.updateProfile(token, updateData);
      await refetchProfile();

      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 text-slate-600 hover:text-[#7ed957] transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Profile
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-[#7ed957] rounded-2xl mr-4">
                <FaUser className="text-white text-2xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Edit <span className="text-[#7ed957]">Profile</span>
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Update your profile information and personal details
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Image Section */}
              <div className="text-center mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-4 flex items-center justify-center">
                  <FaUpload className="mr-2 text-[#7ed957]" />
                  Profile Image
                </label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-4 ring-[#7ed957]/20">
                    {profile?.user?.image ? (
                      <img src={profile.user.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-3xl text-gray-500" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#7ed957] file:text-white hover:file:bg-[#6cc149] file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                  <FaUser className="mr-2 text-[#7ed957]" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaUser className="mr-2 text-[#7ed957]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaEnvelope className="mr-2 text-[#7ed957]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile?.user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-[#7ed957]" />
                  Academic Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaGraduationCap className="mr-2 text-[#7ed957]" />
                      Class ID
                    </label>
                    <input
                      type="text"
                      value={formData.classId}
                      onChange={(e) => handleInputChange('classId', e.target.value)}
                      placeholder="e.g., CSE-2023"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaCalendar className="mr-2 text-[#7ed957]" />
                      Session
                    </label>
                    <input
                      type="text"
                      value={formData.session}
                      onChange={(e) => handleInputChange('session', e.target.value)}
                      placeholder="e.g., 2020-2025"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaCalendar className="mr-2 text-[#7ed957]" />
                      Batch
                    </label>
                    <input
                      type="text"
                      value={formData.batch}
                      onChange={(e) => handleInputChange('batch', e.target.value)}
                      placeholder="e.g., 2023"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaGraduationCap className="mr-2 text-[#7ed957]" />
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.dept}
                      onChange={(e) => handleInputChange('dept', e.target.value)}
                      placeholder="e.g., Computer Science & Engineering"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaUniversity className="mr-2 text-[#7ed957]" />
                      University
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      placeholder="e.g., Comilla University"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <FaBriefcase className="mr-2 text-[#7ed957]" />
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      placeholder="e.g., Software Developer"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Expertise */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                  <FaCode className="mr-2 text-[#7ed957]" />
                  Skills & Expertise
                </h3>
                
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., React, Node.js)"
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-6 py-3 bg-[#7ed957] text-white rounded-xl hover:bg-[#6cc149] transition-colors font-medium"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Skills List */}
                  {formData.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-[#7ed957]/10 text-[#7ed957] rounded-full text-sm font-medium"
                        >
                          <FaCode className="mr-2 text-xs" />
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-[#7ed957] hover:text-red-500 transition-colors"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <HashLoader size={20} color="#ffffff" className="mr-3" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-3" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;