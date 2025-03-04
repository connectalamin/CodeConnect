import Navbar from '../components/Navbar';
import { useProfile } from '../hooks/useProfile';

const ranks = [
  { 
    threshold: 25000, 
    rank: 'Field Marshal', 
    color: 'from-blue-600 via-blue-800 to-blue-900', 
    glow: 'shadow-lg shadow-blue-400/60 hover:shadow-xl hover:shadow-blue-500/80' 
  },
  { 
    threshold: 10000, 
    rank: 'Marshal', 
    color: 'from-purple-600 via-purple-800 to-purple-900', 
    glow: 'shadow-lg shadow-purple-400/60 hover:shadow-xl hover:shadow-purple-500/80' 
  },
  { 
    threshold: 7000, 
    rank: 'General', 
    color: 'from-teal-600 via-teal-800 to-teal-900', 
    glow: 'shadow-lg shadow-teal-400/60 hover:shadow-xl hover:shadow-teal-500/80' 
  },
  { 
    threshold: 5000, 
    rank: 'Lieutenant General', 
    color: 'from-indigo-600 via-indigo-800 to-indigo-900', 
    glow: 'shadow-lg shadow-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/80' 
  },
  { 
    threshold: 3000, 
    rank: 'Major General', 
    color: 'from-cyan-600 via-cyan-800 to-cyan-900', 
    glow: 'shadow-lg shadow-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/80' 
  },
  { 
    threshold: 2000, 
    rank: 'Brigadier General', 
    color: 'from-emerald-600 via-emerald-800 to-emerald-900', 
    glow: 'shadow-lg shadow-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/80' 
  },
  { 
    threshold: 1300, 
    rank: 'Colonel', 
    color: 'from-gray-600 via-gray-800 to-gray-900', 
    glow: 'shadow-lg shadow-gray-400/60 hover:shadow-xl hover:shadow-gray-500/80' 
  },
  { 
    threshold: 800, 
    rank: 'Lieutenant Colonel', 
    color: 'from-slate-600 via-slate-800 to-slate-900', 
    glow: 'shadow-lg shadow-slate-400/60 hover:shadow-xl hover:shadow-slate-500/80' 
  },
  { 
    threshold: 400, 
    rank: 'Major', 
    color: 'from-stone-600 via-stone-800 to-stone-900', 
    glow: 'shadow-lg shadow-stone-400/60 hover:shadow-xl hover:shadow-stone-500/80' 
  },
  { 
    threshold: 200, 
    rank: 'Captain', 
    color: 'from-amber-600 via-amber-800 to-amber-900', 
    glow: 'shadow-lg shadow-amber-400/60 hover:shadow-xl hover:shadow-amber-500/80' 
  },
  { 
    threshold: 100, 
    rank: 'Lieutenant', 
    color: 'from-lime-600 via-lime-800 to-lime-900', 
    glow: 'shadow-lg shadow-lime-400/60 hover:shadow-xl hover:shadow-lime-500/80' 
  },
  { 
    threshold: 50, 
    rank: 'Sergeant', 
    color: 'from-yellow-600 via-yellow-800 to-yellow-900', 
    glow: 'shadow-lg shadow-yellow-400/60 hover:shadow-xl hover:shadow-yellow-500/80' 
  },
  { 
    threshold: 10, 
    rank: 'Corporal', 
    color: 'from-orange-600 via-orange-800 to-orange-900', 
    glow: 'shadow-lg shadow-orange-400/60 hover:shadow-xl hover:shadow-orange-500/80' 
  },
  { 
    threshold: 0, 
    rank: 'Private', 
    color: 'from-gray-500 via-gray-700 to-gray-800', 
    glow: 'shadow-lg shadow-gray-400/60 hover:shadow-xl hover:shadow-gray-500/80' 
  },
];
const getRank = (karmaPoints) => {
  const points = Number(karmaPoints) || 0;
  return ranks.find(rank => points >= rank.threshold) || ranks[ranks.length - 1];
};

const UserProfile = () => {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-center">
            <p className="font-semibold text-lg mb-2">Error Loading Profile</p>
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile?.user) return null;

  const userRank = getRank(profile.user.karmaPoints);
  const { user } = profile;

  return (
    <>
      <Navbar  />
      <section className="flex flex-col items-center py-16 px-4 max-w-5xl mx-auto bg-gradient-to-br from-white to-[#f0f9eb] text-black relative overflow-hidden">
        <div className="relative z-10 w-full md:flex md:justify-between md:items-start">
          <div className="w-full md:w-1/2">
           
            <div className="flex items-center gap-6 mb-6">
              <img
                src={user.image || 'https://i.pravatar.cc/150?img=4'}
                alt={`${user.name}'s profile`}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-blue-400">{user.name}</h1>
                <p className="text-lg text-gray-600">@{user.name.toLowerCase().replace(/\s+/g, '-')}</p>
              </div>
            </div>

            {/* User Rank */}
            <div className={`relative p-6 rounded-lg transition-all duration-300 bg-gradient-to-r ${userRank.color} ${userRank.glow} hover:scale-105 hover:brightness-105`}>
  <h2 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">Rank: {userRank.rank}</h2>
  <p className="text-gray-200 drop-shadow-sm text-sm">Earned with {user.karmaPoints || 0} Karma Points</p>
</div>

            {/* User Details */}
            <div className="mt-8 space-y-4 text-gray-700">
              <div>
                <p className="font-medium">Email:</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-medium">Class ID:</p>
                <p>{user.classId || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">Session:</p>
                <p>{user.session || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">Batch:</p>
                <p>{user.batch || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">Department:</p>
                <p>{user.dept || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">University:</p>
                <p>{user.university || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">Occupation:</p>
                <p>{user.occupation || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">Expertise:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.expertise && user.expertise.length > 0 ? (
                    user.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="py-1 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-[#7ed957] hover:text-white transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
              <div>
                <p className="font-medium">Member Since:</p>
                <p>{user.timeJoined || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium">Karma Points:</p>
                <p>{user.karmaPoints || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;