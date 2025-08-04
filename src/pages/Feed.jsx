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
      <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb]">
        {/* Background decoration matching home page */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ed957]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ed957]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
            {/* Clean Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 leading-tight">
                  Community <span className="text-[#7ed957]">Feed</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                  Connect, share, and learn with developers worldwide
                </p>
              </div>
              <button
                onClick={() => setOpened(true)}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaRocket className="mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                Create Post
              </button>
            </div>

            {/* Search Component */}
            <div className="mb-8">
              <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Main Content Grid - Cleaner Layout */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Simplified User Profile */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300 sticky top-24">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Profile Image */}
                    <div
                      className="relative w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden ring-2 ring-[#7ed957]/20 cursor-pointer group hover:ring-[#7ed957]/40 transition-all duration-300"
                      onClick={() => navigate(`/profile/${profile?.user?.id}`)}
                    >
                      {profile?.user?.image ? (
                        <img src={profile?.user?.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-slate-500 uppercase">
                          {profile?.user?.name?.charAt(0) || 'U'}
                        </span>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#7ed957] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">✓</span>
                      </div>
                    </div>
                    
                    {/* User Name */}
                    <div className="text-center">
                      <h3
                        className="text-lg font-bold text-slate-900 cursor-pointer hover:text-[#7ed957] transition-colors duration-200"
                        onClick={() => navigate(`/profile/${profile?.user?.id}`)}
                      >
                        {profile?.user?.name || 'Unnamed User'}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {profile?.user?.occupation || 'Developer'}
                      </p>
                    </div>

                    {/* Key Stats */}
                    <div className="w-full space-y-3 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaTrophy className="text-yellow-500 text-sm" />
                          <span className="text-sm text-slate-600">Ranking</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {profile?.user?.ranking || 'Unranked'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaStar className="text-yellow-500 text-sm" />
                          <span className="text-sm text-slate-600">Karma</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {profile?.user?.karmaPoints || '0'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaCalendar className="text-purple-500 text-sm" />
                          <span className="text-sm text-slate-600">Batch</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {profile?.user?.batch || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center - Posts Feed */}
              <div className="lg:col-span-2 space-y-6">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => <PostComponent key={post.id} post={post} />)
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-200/50">
                      <FaCode className="text-4xl text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No posts found</h3>
                      <p className="text-slate-600 mb-6">Be the first to share something amazing!</p>
                      <button
                        onClick={() => setOpened(true)}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#7ed957] rounded-xl hover:bg-[#6cc149] transition-colors duration-200"
                      >
                        <FaRocket className="mr-2" />
                        Create First Post
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Cleaner Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === 1
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-slate-700 hover:bg-[#7ed957]/10 hover:text-[#7ed957]'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-sm text-slate-600">
                        {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === totalPages
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-slate-700 hover:bg-[#7ed957]/10 hover:text-[#7ed957]'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Filters and Activity */}
              <div className="lg:col-span-1 space-y-6">
                {/* Filters Component */}
                <FilterComponent
                  selectedDateRange={selectedDateRange}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                />

                {/* Simplified User Activity */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/50 sticky top-24">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#7ed957]/10 rounded-lg mr-3">
                      <FaUsers className="text-[#7ed957] text-sm" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">My Activity</h3>
                  </div>
                  
                  {/* Simplified Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                    <button
                      onClick={() => setActiveTab('posts')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === 'posts'
                          ? 'bg-white text-[#7ed957] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Posts
                    </button>
                    <button
                      onClick={() => setActiveTab('comments')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === 'comments'
                          ? 'bg-white text-[#7ed957] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Comments
                    </button>
                  </div>

                  {/* Simplified Activity List */}
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {activeTab === 'posts' ? (
                      <>
                        {myPosts.slice(0, visiblePosts).map((post) => (
                          <div key={post.id} className="group p-3 bg-slate-50 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                            <h4 className="font-medium text-slate-900 text-sm line-clamp-1 group-hover:text-[#7ed957] transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                        {myPosts.length > 3 && visiblePosts <= 3 && (
                          <button 
                            onClick={handleShowMorePosts}
                            className="w-full mt-2 px-3 py-2 text-xs font-medium text-[#7ed957] hover:bg-[#7ed957]/10 rounded-lg transition-colors duration-200"
                          >
                            Show More ({myPosts.length - 3} more)
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {myComments.slice(0, visibleComments).map((comment, index) => (
                          <div key={index} className="group p-3 bg-slate-50 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                            <p className="text-sm text-slate-700 line-clamp-2 group-hover:text-slate-900 transition-colors">
                              {comment.content}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                        {myComments.length > 3 && visibleComments <= 3 && (
                          <button 
                            onClick={handleShowMoreComments}
                            className="w-full mt-2 px-3 py-2 text-xs font-medium text-[#7ed957] hover:bg-[#7ed957]/10 rounded-lg transition-colors duration-200"
                          >
                            Show More ({myComments.length - 3} more)
                          </button>
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