import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp, 
  Calendar,
  Users,
  Crown,
  User,
  Eye,
  Filter,
  Info
} from 'lucide-react';

const LeaderboardPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('all_time');
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Military rank system
  const ranks = [
    { threshold: 25000, rank: 'Field Marshal', badge: 'gold' },
    { threshold: 10000, rank: 'Marshal', badge: 'gold' },
    { threshold: 7000, rank: 'General', badge: 'gold' },
    { threshold: 5000, rank: 'Lieutenant General', badge: 'gold' },
    { threshold: 3000, rank: 'Major General', badge: 'silver' },
    { threshold: 2000, rank: 'Brigadier General', badge: 'silver' },
    { threshold: 1300, rank: 'Colonel', badge: 'silver' },
    { threshold: 800, rank: 'Lieutenant Colonel', badge: 'silver' },
    { threshold: 400, rank: 'Major', badge: 'bronze' },
    { threshold: 200, rank: 'Captain', badge: 'bronze' },
    { threshold: 100, rank: 'Lieutenant', badge: 'bronze' },
    { threshold: 50, rank: 'Sergeant', badge: 'bronze' },
    { threshold: 10, rank: 'Corporal', badge: 'bronze' },
    { threshold: 0, rank: 'Private', badge: 'bronze' } // Default, lowest rank
  ];

  // Mock data for demonstration (replace with actual API calls)
  const mockRankings = [
    {
      rank: 1,
      user: {
        id: 1,
        name: "John Doe",
        image: null,
        role: "USER",
        karmaPoints: 1250,
        expertise: ["React", "JavaScript", "Node.js"],
        batch: "2020",
        dept: "CSE",
        university: "Comilla University"
      },
      karma_points: 1250,
      achievements: ["Colonel", "top_10", "helpful_user"]
    },
    {
      rank: 2,
      user: {
        id: 2,
        name: "Jane Smith",
        image: null,
        role: "USER",
        karmaPoints: 1100,
        expertise: ["Python", "Django", "Machine Learning"],
        batch: "2019",
        dept: "CSE",
        university: "Comilla University"
      },
      karma_points: 1100,
      achievements: ["Lieutenant Colonel", "top_10"]
    },
    {
      rank: 3,
      user: {
        id: 3,
        name: "Mike Johnson",
        image: null,
        role: "USER",
        karmaPoints: 950,
        expertise: ["Java", "Spring Boot", "Android"],
        batch: "2021",
        dept: "CSE",
        university: "Comilla University"
      },
      karma_points: 950,
      achievements: ["Major", "top_50"]
    },
    {
      rank: 4,
      user: {
        id: 4,
        name: "Sarah Wilson",
        image: null,
        role: "USER",
        karmaPoints: 850,
        expertise: ["Vue.js", "PHP", "Laravel"],
        batch: "2020",
        dept: "CSE",
        university: "Comilla University"
      },
      karma_points: 850,
      achievements: ["Major", "top_50"]
    },
    {
      rank: 5,
      user: {
        id: 5,
        name: "David Brown",
        image: null,
        role: "USER",
        karmaPoints: 750,
        expertise: ["C++", "Data Structures", "Algorithms"],
        batch: "2019",
        dept: "CSE",
        university: "Comilla University"
      },
      karma_points: 750,
      achievements: ["Captain", "top_100"]
    }
  ];

  const periods = [
    { value: 'weekly', label: 'This Week', icon: Calendar },
    { value: 'monthly', label: 'This Month', icon: TrendingUp },
    { value: 'all_time', label: 'All Time', icon: Trophy }
  ];

  const limits = [10, 25, 50, 100];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <Star className="w-5 h-5 text-slate-400" />;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-amber-500 to-amber-700 text-white";
    return "bg-slate-100 text-slate-700";
  };

  const getMilitaryRank = (karmaPoints) => {
    for (let i = 0; i < ranks.length; i++) {
      if (karmaPoints >= ranks[i].threshold) {
        return ranks[i];
      }
    }
    return ranks[ranks.length - 1]; // Default to Private
  };

  const getAchievementIcon = (achievement) => {
    switch (achievement) {
      case 'top_10': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'top_50': return <Medal className="w-4 h-4 text-gray-400" />;
      case 'top_100': return <Award className="w-4 h-4 text-amber-600" />;
      case 'helpful_user': return <Users className="w-4 h-4 text-green-500" />;
      default:
        // Check if it's a military rank
        if (achievement.includes('Marshal') || achievement.includes('General') || achievement.includes('Lieutenant General')) {
          return <Crown className="w-4 h-4 text-yellow-500" />; // Gold badge
        } else if (achievement.includes('Colonel') || achievement.includes('Major General') || achievement.includes('Brigadier General')) {
          return <Medal className="w-4 h-4 text-gray-400" />; // Silver badge
        } else {
          return <Award className="w-4 h-4 text-amber-600" />; // Bronze badge
        }
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Login Required</h3>
          <p className="text-slate-600">Please log in to view the leaderboard.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">Leaderboard</h1>
            </div>
            <p className="text-slate-600 text-lg">Discover the top contributors in our community</p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Period:</span>
                </div>
                <div className="flex gap-2">
                  {periods.map((period) => {
                    const Icon = period.icon;
                    return (
                      <button
                        key={period.value}
                        onClick={() => setSelectedPeriod(period.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedPeriod === period.value
                            ? 'bg-[#7ED957] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {period.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Show:</span>
                <select
                  value={selectedLimit}
                  onChange={(e) => setSelectedLimit(Number(e.target.value))}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] transition-all duration-200"
                >
                  {limits.map((limit) => (
                    <option key={limit} value={limit}>
                      Top {limit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-700">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">User</div>
                <div className="col-span-2">Karma Points</div>
                <div className="col-span-3">Expertise</div>
                <div className="col-span-2">Achievements</div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <HashLoader color="#7ED957" loading speedMultiplier={2} />
                  <p className="text-slate-600">Loading leaderboard...</p>
                </div>
              </div>
            ) : (
              /* Rankings List */
              <div className="divide-y divide-slate-100">
                {mockRankings.slice(0, selectedLimit).map((ranking) => {
                  const militaryRank = getMilitaryRank(ranking.karma_points);
                  return (
                    <div
                      key={ranking.user.id}
                      className="px-6 py-4 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Rank */}
                        <div className="col-span-1">
                          <div className="flex items-center gap-2">
                            {getRankIcon(ranking.rank)}
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRankBadge(ranking.rank)}`}>
                              #{ranking.rank}
                            </span>
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="col-span-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-[#7ED957]/20">
                              {ranking.user.image ? (
                                <img 
                                  src={ranking.user.image} 
                                  alt={ranking.user.name} 
                                  className="w-full h-full object-cover rounded-full" 
                                />
                              ) : (
                                <User className="w-5 h-5 text-slate-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{ranking.user.name}</h3>
                              <p className="text-xs text-slate-500">{ranking.user.batch} • {ranking.user.dept}</p>
                              <p className="text-xs font-medium text-slate-600">{militaryRank.rank}</p>
                            </div>
                          </div>
                        </div>

                        {/* Karma Points */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#7ED957]" />
                            <span className="font-semibold text-slate-900">{ranking.karma_points.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Expertise */}
                        <div className="col-span-3">
                          <div className="flex flex-wrap gap-1">
                            {ranking.user.expertise.slice(0, 2).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-[#7ED957]/10 text-slate-800 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {ranking.user.expertise.length > 2 && (
                              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                +{ranking.user.expertise.length - 2}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="col-span-2">
                          <div className="flex gap-1">
                            {ranking.achievements.slice(0, 3).map((achievement, index) => (
                              <div key={index} className="tooltip" title={achievement.replace('_', ' ')}>
                                {getAchievementIcon(achievement)}
                              </div>
                            ))}
                            {ranking.achievements.length > 3 && (
                              <span className="text-xs text-slate-500">+{ranking.achievements.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Total Participants</h3>
                  <p className="text-2xl font-bold text-slate-900">1,247</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">Active contributors this period</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Average Karma</h3>
                  <p className="text-2xl font-bold text-slate-900">342</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">Points per active user</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Top Achievers</h3>
                  <p className="text-2xl font-bold text-slate-900">89</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">Users with 500+ karma points</p>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-gradient-to-r from-[#7ED957]/10 to-[#6cc149]/10 rounded-2xl p-6 border border-[#7ED957]/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#7ED957] rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">How Karma Points Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                  <div>
                    <p className="font-medium mb-1">Earning Points:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Getting an upvote: +1 point</li>
                      <li>• Getting a downvote: -1 point</li>
                      <li>• Best answer marked: +10 points</li>
                      <li>• Creating posts/comments: No points</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Military Ranks:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Field Marshal (25,000+): Gold badge</li>
                      <li>• General (7,000+): Gold badge</li>
                      <li>• Colonel (1,300+): Silver badge</li>
                      <li>• Captain (200+): Bronze badge</li>
                      <li>• Private (0+): Bronze badge</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage; 