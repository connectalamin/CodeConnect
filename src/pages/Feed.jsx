import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import SearchComponent from '../components/Feed/SearchComponent';
import PostComponent from '../components/Feed/PostComponent';
import FilterComponent from '../components/Feed/FilterComponent';
import AddPostComponent from '../components/Feed/AddPostComponent';
import { FaStar, FaRocket, FaUsers, FaCode, FaCalendar, FaUniversity, FaClock, FaTrophy, FaUser } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const FeedPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading, isError, error } = usePost();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All time');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('Recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [visibleComments, setVisibleComments] = useState(5);
  const [activeTab, setActiveTab] = useState('posts');
  const postsPerPage = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <HashLoader color="#7ed957" loading speedMultiplier={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-red-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Feed</h3>
          <p className="text-slate-600">{error?.message || 'An error occurred'}</p>
        </div>
      </div>
    );
  }

  const filterPostsByDate = (posts) => {
    const now = new Date();
    return posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      switch (selectedDateRange) {
        case 'Last 24 Hours':
          return now - postDate <= 24 * 60 * 60 * 1000;
        case 'Last 7 days':
          return now - postDate <= 7 * 24 * 60 * 60 * 1000;
        case 'Last 30 days':
          return now - postDate <= 30 * 24 * 60 * 60 * 1000;
        case 'All time':
        default:
          return true;
      }
    });
  };

  const filteredPosts = filterPostsByDate(posts).filter((post) =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)) &&
    (selectedCategory === 'all' || !selectedCategory ? true : post.categoryId?.toString() === selectedCategory)
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (selectedSort === 'Top') {
      return b.upvotes - a.upvotes;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const myPosts = posts.filter((post) => post.userId === profile?.user?.id);
  const myComments = posts
    .flatMap((post) => post.comments || [])
    .filter((comment) => comment.userId === profile?.user?.id);

  const handleShowMorePosts = () => setVisiblePosts(myPosts.length);
  const handleShowMoreComments = () => setVisibleComments(myComments.length);

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
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  Community <span className="text-[#7ed957]">Feed</span>
                </h1>
                <p className="text-lg text-slate-600">
                  Connect, share, and learn with developers worldwide
                </p>
              </div>
              <button
                onClick={() => setOpened(true)}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaRocket className="mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                Add Post
              </button>
            </div>

            {/* Search Component */}
            <div className="mb-8">
              <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Sidebar - Enhanced User Profile */}
              <div className="lg:col-span-3">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center space-y-6">
                    {/* Profile Image */}
                    <div
                      className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-4 ring-[#7ed957]/20 hover:ring-[#7ed957]/50 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/profile/${profile?.user?.id}`)}
                    >
                      {profile?.user?.image ? (
                        <img src={profile?.user?.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-bold text-gray-500 uppercase">
                          {profile?.user?.name?.charAt(0) || 'U'}
                        </span>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#7ed957] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">✓</span>
                      </div>
                    </div>
                    
                    {/* User Name */}
                    <div className="text-center">
                      <h3
                        className="text-xl font-bold text-slate-900 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => navigate(`/profile/${profile?.user?.id}`)}
                      >
                        {profile?.user?.name || 'Unnamed User'}
                      </h3>
                    </div>

                    {/* User Details */}
                    <div className="w-full space-y-3">
                      {/* Batch */}
                      <div className="flex items-center space-x-3">
                        <FaCalendar className="text-purple-500 text-lg" />
                        <span className="text-sm text-slate-600">
                          Batch: {profile?.user?.batch || 'N/A'}
                        </span>
                      </div>

                      {/* Occupation */}
                      <div className="bg-gradient-to-r from-[#7ed957]/10 to-transparent px-3 py-2 rounded-lg">
                        <span className="text-sm text-slate-600 italic">
                          {profile?.user?.occupation || 'Not Specified'}
                        </span>
                      </div>

                      {/* University */}
                      <div className="flex items-center space-x-3">
                        <FaUniversity className="text-amber-600 text-lg" />
                        <span className="text-sm text-slate-700">
                          {profile?.user?.university || 'Unknown University'}
                        </span>
                      </div>

                      {/* Session */}
                      <div className="flex items-center space-x-3">
                        <FaClock className="text-slate-500 text-lg" />
                        <span className="text-sm text-slate-600">
                          Session: {profile?.user?.session || 'N/A'}
                        </span>
                      </div>

                      {/* Ranking */}
                      <div className="flex items-center space-x-3">
                        <FaTrophy className="text-yellow-500 text-lg" />
                        <span className="text-sm text-slate-700">
                          Ranking: {profile?.user?.ranking || 'Unranked'}
                        </span>
                      </div>

                      {/* Karma Points */}
                      <div className="flex items-center space-x-3">
                        <FaStar className="text-yellow-500 text-lg" />
                        <span className="text-sm text-slate-700">
                          Karma Points: {profile?.user?.karmaPoints || '0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center - Posts Feed */}
              <div className="lg:col-span-6 space-y-6">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => <PostComponent key={post.id} post={post} />)
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200">
                      <FaCode className="text-4xl text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No posts available</h3>
                      <p className="text-slate-600">Be the first to share something amazing!</p>
                    </div>
                  </div>
                )}
                
                {/* Pagination */}
                <div className="flex justify-center">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        currentPage === 1
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-[#7ed957]/20 hover:text-[#7ed957]'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-slate-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        currentPage === totalPages
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-[#7ed957]/20 hover:text-[#7ed957]'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Filters and Activity */}
              <div className="lg:col-span-3 space-y-6">
                {/* Filters Component */}
                <FilterComponent
                  selectedDateRange={selectedDateRange}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                />

                {/* Enhanced User Activity */}
                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl shadow-lg border border-slate-200">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-[#7ed957] rounded-xl mr-3">
                      <FaUsers className="text-white text-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">My Activity</h3>
                  </div>
                  
                  {/* Enhanced Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                    <button
                      onClick={() => setActiveTab('posts')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === 'posts'
                          ? 'bg-white text-[#7ed957] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Posts
                    </button>
                    <button
                      onClick={() => setActiveTab('comments')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === 'comments'
                          ? 'bg-white text-[#7ed957] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Comments
                    </button>
                  </div>

                  {/* Enhanced Activity List */}
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {activeTab === 'posts' ? (
                      <>
                        {myPosts.slice(0, visiblePosts).map((post) => (
                          <div key={post.id} className="group p-3 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-[#7ed957]/50 transition-all duration-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-[#7ed957] transition-colors">
                                  {post.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 flex items-center">
                                  <FaCode className="mr-1" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="ml-2 p-1 bg-[#7ed957]/10 rounded-full">
                                <FaCode className="text-[#7ed957] text-xs" />
                              </div>
                            </div>
                          </div>
                        ))}
                        {myPosts.length > 3 && (
                          visiblePosts <= 3 ? (
                            <button 
                              onClick={handleShowMorePosts}
                              className="w-full mt-3 px-4 py-2 text-sm font-medium text-[#7ed957] border border-[#7ed957] rounded-xl hover:bg-[#7ed957] hover:text-white transition-all duration-200"
                            >
                              Show More
                            </button>
                          ) : (
                            <Link 
                              to="/my-posts"
                              className="block w-full mt-3 px-4 py-2 text-sm font-medium text-center text-[#7ed957] border border-[#7ed957] rounded-xl hover:bg-[#7ed957] hover:text-white transition-all duration-200"
                            >
                              Go to My Posts
                            </Link>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {myComments.slice(0, visibleComments).map((comment, index) => (
                          <div key={index} className="group p-3 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-[#7ed957]/50 transition-all duration-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm text-slate-700 line-clamp-2 group-hover:text-slate-900 transition-colors">
                                  {comment.content}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 flex items-center">
                                  <FaUsers className="mr-1" />
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="ml-2 p-1 bg-[#7ed957]/10 rounded-full">
                                <FaUsers className="text-[#7ed957] text-xs" />
                              </div>
                            </div>
                          </div>
                        ))}
                        {myComments.length > 3 && (
                          visibleComments <= 3 ? (
                            <button 
                              onClick={handleShowMoreComments}
                              className="w-full mt-3 px-4 py-2 text-sm font-medium text-[#7ed957] border border-[#7ed957] rounded-xl hover:bg-[#7ed957] hover:text-white transition-all duration-200"
                            >
                              Show More
                            </button>
                          ) : (
                            <Link 
                              to="/my-comments"
                              className="block w-full mt-3 px-4 py-2 text-sm font-medium text-center text-[#7ed957] border border-[#7ed957] rounded-xl hover:bg-[#7ed957] hover:text-white transition-all duration-200"
                            >
                              Go to My Comments
                            </Link>
                          )
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddPostComponent opened={opened} onClose={() => { setOpened(false); setCurrentPage(1); }} />
    </>
  );
};

export default FeedPage;