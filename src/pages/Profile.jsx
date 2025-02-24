import Navbar from '../components/Navbar';
import { useProfile } from '../hooks/useProfile';

const ranks = [
  { threshold: 50000, rank: 'Field Marshal', color: 'from-blue-800 to-blue-950', glow: 'shadow-blue-500/50' },
  { threshold: 25000, rank: 'Marshal', color: 'from-purple-800 to-purple-950', glow: 'shadow-purple-500/50' },
  { threshold: 10000, rank: 'General', color: 'from-teal-800 to-teal-950', glow: 'shadow-teal-500/50' },
  { threshold: 6000, rank: 'Lieutenant General', color: 'from-indigo-800 to-indigo-950', glow: 'shadow-indigo-500/50' },
  { threshold: 4000, rank: 'Major General', color: 'from-cyan-800 to-cyan-950', glow: 'shadow-cyan-500/50' },
  { threshold: 2500, rank: 'Brigadier General', color: 'from-emerald-800 to-emerald-950', glow: 'shadow-emerald-500/50' },
  { threshold: 1500, rank: 'Colonel', color: 'from-gray-800 to-gray-950', glow: 'shadow-gray-500/50' },
  { threshold: 0, rank: 'Private', color: 'from-gray-700 to-gray-800', glow: 'shadow-gray-500/50' },
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
            <div className={`relative p-6 rounded-lg shadow-md border-2 border-opacity-50 transition-all duration-300 bg-gradient-to-r ${userRank.color} ${userRank.glow}`}>
              <h2 className="text-2xl font-bold text-white">Rank: {userRank.rank}</h2>
              <p className="text-gray-300">Earned with {user.karmaPoints || 0} Karma Points</p>
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