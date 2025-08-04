import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeaderboard, useLeaderboardStats, useMyLeaderboardPosition } from '../hooks/useLeaderboard';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { 
  FaTrophy, 
  FaMedal, 
  FaAward, 
  FaUser, 
  FaComment, 
  FaThumbsUp, 
  FaCalendar,
  FaFilter,
  FaCrown,
  FaStar,
  FaChartBar,
  FaRocket
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ranks = [
  { threshold: 25000, rank: "Field Marshal", badge: "bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 text-white border-amber-600 shadow-lg shadow-amber-500/25", icon: <FaCrown /> },
  { threshold: 10000, rank: "Marshal", badge: "bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 text-white border-yellow-600 shadow-lg shadow-yellow-500/25", icon: <FaTrophy /> },
  { threshold: 7000, rank: "General", badge: "bg-gradient-to-r from-orange-600 via-yellow-500 to-amber-500 text-white border-orange-600 shadow-lg shadow-orange-500/25", icon: <FaTrophy /> },
  { threshold: 5000, rank: "Lieutenant General", badge: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white border-red-600 shadow-lg shadow-red-500/25", icon: <FaMedal /> },
  { threshold: 3000, rank: "Major General", badge: "bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/25", icon: <FaMedal /> },
  { threshold: 2000, rank: "Brigadier General", badge: "bg-gradient-to-r from-teal-600 via-emerald-500 to-green-500 text-white border-teal-600 shadow-lg shadow-teal-500/25", icon: <FaAward /> },
  { threshold: 1300, rank: "Colonel", badge: "bg-gradient-to-r from-green-600 via-teal-500 to-emerald-500 text-white border-green-600 shadow-lg shadow-green-500/25", icon: <FaAward /> },
  { threshold: 800, rank: "Lieutenant Colonel", badge: "bg-gradient-to-r from-blue-600 via-green-500 to-teal-500 text-white border-blue-600 shadow-lg shadow-blue-500/25", icon: <FaStar /> },
  { threshold: 400, rank: "Major", badge: "bg-gradient-to-r from-indigo-600 via-blue-500 to-green-500 text-white border-indigo-600 shadow-lg shadow-indigo-500/25", icon: <FaStar /> },
  { threshold: 200, rank: "Captain", badge: "bg-gradient-to-r from-slate-600 via-indigo-500 to-blue-500 text-white border-slate-600 shadow-lg shadow-slate-500/25", icon: <FaStar /> },
  { threshold: 100, rank: "Lieutenant", badge: "bg-gradient-to-r from-gray-600 via-slate-500 to-indigo-500 text-white border-gray-600 shadow-lg shadow-gray-500/25", icon: <FaStar /> },
  { threshold: 50, rank: "Sergeant", badge: "bg-gradient-to-r from-slate-500 via-gray-500 to-slate-600 text-white border-slate-500 shadow-lg shadow-slate-500/25", icon: <FaStar /> },
  { threshold: 10, rank: "Corporal", badge: "bg-gradient-to-r from-gray-500 via-slate-500 to-gray-600 text-white border-gray-500 shadow-lg shadow-gray-500/25", icon: <FaStar /> },
  { threshold: 0, rank: "Private", badge: "bg-gradient-to-r from-slate-400 via-gray-400 to-slate-500 text-white border-slate-400 shadow-lg shadow-slate-400/25", icon: <FaStar /> },
];

const getRankInfo = (karmaPoints) => {
  return ranks.find((rank) => karmaPoints >= rank.threshold) || ranks[ranks.length - 1];
};

const Leaderboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const { 
    leaderboard, 
    pagination, 
    isLoading: leaderboardLoading, 
    isError: leaderboardError,
    error: leaderboardErrorMessage,
    refetch: refetchLeaderboard 
  } = useLeaderboard({ 
    limit: itemsPerPage, 
    offset: (currentPage - 1) * itemsPerPage,
    timeframe 
  });

  const { 
    stats, 
    isLoading: statsLoading 
  } = useLeaderboardStats();

  const { 
    position: myPosition, 
    isLoading: myPositionLoading 
  } = useMyLeaderboardPosition();

  if (leaderboardLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <HashLoader color="#7ed957" loading speedMultiplier={2} />
        </div>
      </>
    );
  }

  if (leaderboardError) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartBar className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Leaderboard</h3>
            <p className="text-slate-600 mb-4">{leaderboardErrorMessage?.message || 'An error occurred'}</p>
            <button
              onClick={() => refetchLeaderboard()}
              className="px-4 py-2 bg-[#7ed957] text-white rounded-lg hover:bg-[#6cc149] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getPositionIcon = (position) => {
    if (position === 1) return <FaTrophy className="text-yellow-500 text-xl" />;
    if (position === 2) return <FaMedal className="text-gray-400 text-xl" />;
    if (position === 3) return <FaAward className="text-amber-600 text-xl" />;
    return <span className="text-slate-600 font-bold text-lg">#{position}</span>;
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const totalPages = Math.ceil((pagination.total || 0) / itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ed957]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ed957]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mr-4">
                  <FaTrophy className="text-white text-2xl" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                  <span className="text-[#7ed957]">Leader</span>board
                </h1>
              </div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover the top contributors and see how you rank in our developer community
              </p>
            </div>

            {/* Stats Cards */}
            {!statsLoading && stats.totalUsers && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Members</p>
                      <p className="text-2xl font-bold text-slate-900">{formatNumber(stats.totalUsers)}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FaUser className="text-blue-600 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Average Karma</p>
                      <p className="text-2xl font-bold text-slate-900">{formatNumber(stats.averageKarma || 0)}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl">
                      <FaRocket className="text-green-600 text-xl" />
                    </div>
                  </div>
                </div>

                {stats.topPerformer && (
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Top Performer</p>
                        <p className="text-lg font-bold text-slate-900 truncate">{stats.topPerformer.name}</p>
                        <p className="text-sm text-slate-500">{formatNumber(stats.topPerformer.karmaPoints)} karma</p>
                      </div>
                      <div className="flex-shrink-0">
                        {stats.topPerformer.image ? (
                          <img 
                            src={stats.topPerformer.image} 
                            alt={stats.topPerformer.name}
                            className="w-12 h-12 rounded-full border-2 border-yellow-400"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-400">
                            <FaCrown className="text-yellow-600 text-lg" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* My Position Card */}
                {isAuthenticated() && !myPositionLoading && myPosition.position && (
                  <div className="bg-gradient-to-r from-[#7ed957] to-green-500 p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/90">Your Rank</p>
                        <p className="text-2xl font-bold text-white">#{myPosition.position}</p>
                        <p className="text-sm text-white/80">{formatNumber(myPosition.karmaPoints || 0)} karma</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl">
                        <FaTrophy className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Timeframe:</span>
                <select
                  value={timeframe}
                  onChange={(e) => {
                    setTimeframe(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] bg-white"
                >
                  <option value="all">All Time</option>
                  <option value="year">This Year</option>
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                </select>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Badge</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Karma</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Activity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaderboard.map((user, index) => {
                      const rankInfo = getRankInfo(user.karmaPoints);
                      const isCurrentUser = isAuthenticated() && myPosition.id === user.id;
                      
                      return (
                        <tr 
                          key={user.id} 
                          className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                            isCurrentUser ? 'bg-[#7ed957]/5 border-l-4 border-[#7ed957]' : ''
                          }`}
                          onClick={() => handleUserClick(user.id)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {getPositionIcon(user.position)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {user.image ? (
                                  <img 
                                    src={user.image} 
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                    <FaUser className="text-slate-500 text-sm" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {user.name || 'Anonymous User'}
                                  {isCurrentUser && (
                                    <span className="ml-2 text-xs bg-[#7ed957] text-white px-2 py-1 rounded-full">
                                      You
                                    </span>
                                  )}
                                </p>
                                {(user.dept || user.university) && (
                                  <p className="text-xs text-slate-500">
                                    {user.dept} {user.dept && user.university && '•'} {user.university}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${rankInfo.badge}`}>
                                {rankInfo.icon}
                                <span className="ml-1">{rankInfo.rank}</span>
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-bold text-[#7ed957]">
                              {formatNumber(user.karmaPoints)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                              <div className="flex items-center space-x-1">
                                <FaComment className="text-blue-500" />
                                <span>{user.stats?.posts || 0}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaThumbsUp className="text-green-500" />
                                <span>{user.stats?.comments || 0}</span>
                              </div>
                              {user.stats?.bestAnswers > 0 && (
                                <div className="flex items-center space-x-1">
                                  <FaAward className="text-yellow-500" />
                                  <span>{user.stats.bestAnswers}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-1 text-xs text-slate-500">
                              <FaCalendar />
                              <span>{formatDate(user.joinedAt)}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.total || 0)} of {pagination.total || 0} users
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-2 text-sm font-medium text-slate-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {leaderboard.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 max-w-md mx-auto">
                  <FaChartBar className="text-4xl text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Data Available</h3>
                  <p className="text-slate-600">
                    No leaderboard data found for the selected timeframe.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
