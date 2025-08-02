import Navbar from '../components/Navbar';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Users, 
  Building, 
  Briefcase, 
  Award, 
  Star,
  Trophy,
  Crown,
  Shield,
  Medal,
  Target,
  Zap,
  Bookmark
} from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const ranks = [
  {
    threshold: 25000,
    rank: 'Field Marshal',
    icon: <Crown className="w-6 h-6" />,
    color: 'from-yellow-400 via-orange-500 to-red-600',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    description: 'Supreme Commander'
  },
  {
    threshold: 10000,
    rank: 'Marshal',
    icon: <Trophy className="w-6 h-6" />,
    color: 'from-purple-400 via-purple-500 to-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    description: 'Elite Leader'
  },
  {
    threshold: 7000,
    rank: 'General',
    icon: <Star className="w-6 h-6" />,
    color: 'from-blue-400 via-blue-500 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    description: 'Senior Commander'
  },
  {
    threshold: 5000,
    rank: 'Lieutenant General',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-indigo-400 via-indigo-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-800',
    description: 'Strategic Leader'
  },
  {
    threshold: 3000,
    rank: 'Major General',
    icon: <Medal className="w-6 h-6" />,
    color: 'from-cyan-400 via-cyan-500 to-cyan-600',
    bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-800',
    description: 'Tactical Expert'
  },
  {
    threshold: 2000,
    rank: 'Brigadier General',
    icon: <Target className="w-6 h-6" />,
    color: 'from-emerald-400 via-emerald-500 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-800',
    description: 'Field Commander'
  },
  {
    threshold: 1300,
    rank: 'Colonel',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-gray-400 via-gray-500 to-gray-600',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-800',
    description: 'Unit Leader'
  },
  {
    threshold: 800,
    rank: 'Lieutenant Colonel',
    icon: <Award className="w-6 h-6" />,
    color: 'from-slate-400 via-slate-500 to-slate-600',
    bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-800',
    description: 'Deputy Commander'
  },
  {
    threshold: 400,
    rank: 'Major',
    icon: <Star className="w-5 h-5" />,
    color: 'from-stone-400 via-stone-500 to-stone-600',
    bgColor: 'bg-gradient-to-br from-stone-50 to-stone-100',
    borderColor: 'border-stone-200',
    textColor: 'text-stone-800',
    description: 'Section Leader'
  },
  {
    threshold: 200,
    rank: 'Captain',
    icon: <Shield className="w-5 h-5" />,
    color: 'from-amber-400 via-amber-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    description: 'Team Leader'
  },
  {
    threshold: 100,
    rank: 'Lieutenant',
    icon: <Target className="w-5 h-5" />,
    color: 'from-lime-400 via-lime-500 to-lime-600',
    bgColor: 'bg-gradient-to-br from-lime-50 to-lime-100',
    borderColor: 'border-lime-200',
    textColor: 'text-lime-800',
    description: 'Squad Leader'
  },
  {
    threshold: 50,
    rank: 'Sergeant',
    icon: <Medal className="w-5 h-5" />,
    color: 'from-yellow-400 via-yellow-500 to-yellow-600',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    description: 'Group Leader'
  },
  {
    threshold: 10,
    rank: 'Corporal',
    icon: <Award className="w-5 h-5" />,
    color: 'from-orange-400 via-orange-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800',
    description: 'Assistant Leader'
  },
  {
    threshold: 0,
    rank: 'Private',
    icon: <User className="w-5 h-5" />,
    color: 'from-gray-400 via-gray-500 to-gray-600',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-800',
    description: 'New Recruit'
  },
];

const getRank = (karmaPoints) => {
  const points = Number(karmaPoints) || 0;
  return (
    ranks.find((rank) => points >= rank.threshold) || ranks[ranks.length - 1]
  );
};

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { user: currentUser } = useAuth();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7ed957]"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Profile</h3>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile?.user) return null;

  const userRank = getRank(profile.user.karmaPoints);
  const { user } = profile;
  const isOwnProfile = String(currentUser?.id) === String(user.id);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ed957]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ed957]/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user.image || 'https://i.pravatar.cc/150?img=4'}
                  alt={`${user.name}'s profile`}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#7ED957] rounded-full flex items-center justify-center border-2 border-white">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">
                      {user.name}
                    </h1>
                    <p className="text-slate-600 flex items-center gap-2">
                      <span>@{user.name.toLowerCase().replace(/\s+/g, '-')}</span>
                      {isOwnProfile && (
                        <span className="px-2 py-1 bg-[#7ED957]/10 text-slate-800 text-xs font-medium rounded-full">
                          You
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Rank Badge */}
                <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border ${userRank.borderColor} ${userRank.bgColor} ${userRank.textColor}`}>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${userRank.color} text-white`}>
                    {userRank.icon}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{userRank.rank}</div>
                  </div>
                </div>
              </div>

              {/* Karma Points */}
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{user.karmaPoints || 0}</div>
                <div className="text-sm text-slate-600">Karma Points</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#7ED957]" />
                Personal Information
              </h2>
              <div className="space-y-4">
                {isOwnProfile && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">Email</div>
                      <div className="text-slate-900">{user.email || 'N/A'}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">Class ID</div>
                    <div className="text-slate-900">{user.classId || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">Session</div>
                    <div className="text-slate-900">{user.session || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Users className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">Batch</div>
                    <div className="text-slate-900">{user.batch || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#7ED957]" />
                Academic Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Building className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">Department</div>
                    <div className="text-slate-900">{user.dept || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">University</div>
                    <div className="text-slate-900">{user.university || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">Occupation</div>
                    <div className="text-slate-900">{user.occupation || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-600">Member Since</div>
                    <div className="text-slate-900">{user.timeJoined || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#7ED957]" />
              Expertise & Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {user.expertise && user.expertise.length > 0 ? (
                user.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-[#7ED957]/10 to-[#6cc149]/10 text-slate-800 font-medium rounded-full border border-[#7ED957]/20 hover:bg-gradient-to-r hover:from-[#7ED957]/20 hover:to-[#6cc149]/20 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <div className="text-slate-500 italic">No expertise listed</div>
              )}
            </div>
          </div>

          {/* Saved Posts Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#7ED957]" />
              Saved Posts
            </h2>
            <Link 
              to="/saved-posts"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-[#7ED957]/5 to-[#6cc149]/5 rounded-xl border border-[#7ED957]/20 hover:bg-gradient-to-r hover:from-[#7ED957]/10 hover:to-[#6cc149]/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7ED957]/20 rounded-full flex items-center justify-center group-hover:bg-[#7ED957]/30 transition-colors duration-200">
                  <Bookmark className="w-5 h-5 text-[#7ED957]" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-[#7ED957] transition-colors duration-200">
                    View Saved Posts
                  </div>
                  <div className="text-sm text-slate-600">
                    Access your bookmarked posts and collections
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  0 saved
                </span>
                <div className="w-6 h-6 bg-[#7ED957] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
