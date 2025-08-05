import { useState } from 'react';
import { useSavedPosts } from '../hooks/useSavedPosts';
import PostComponent from '../components/Feed/PostComponent';
import Navbar from '../components/Navbar';
import { Bookmark, Loader2, ArrowLeft, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SavedPostsPage = () => {
  const { savedPosts, loading, error, pagination, fetchSavedPosts, unsavePost } = useSavedPosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, oldest, title

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSavedPosts(page);
  };

  const handleUnsaveFromPage = async (postId) => {
    const success = await unsavePost(postId);
    if (success) {
      // Refresh the saved posts list
      fetchSavedPosts(currentPage);
      toast.success('Post removed from saved posts');
    }
  };

  // Filter and sort saved posts
  const filteredAndSortedPosts = savedPosts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  if (loading && savedPosts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb]">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#7ED957]" />
              <span className="ml-3 text-lg text-slate-600">Loading your saved posts...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb]">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Saved Posts</h3>
              <p className="text-slate-600 mb-6">{error}</p>
              <button
                onClick={() => fetchSavedPosts(1)}
                className="px-6 py-3 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb]">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ed957]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ed957]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Link 
                  to="/feed"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#7ED957] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Feed</span>
                </Link>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    Saved Posts
                  </h1>
                  <p className="text-lg text-slate-600">
                    Your collection of interesting posts
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Bookmark className="w-5 h-5 text-[#7ED957]" />
                  <span>{pagination.total} saved posts</span>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search saved posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] transition-all"
                  />
                </div>
                
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] transition-all"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content */}
            {filteredAndSortedPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-sm border border-slate-200/50">
                  <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {searchTerm ? 'No matching saved posts' : 'No saved posts yet'}
                  </h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    {searchTerm 
                      ? 'Try adjusting your search terms or browse all your saved posts.'
                      : 'Start saving posts you find interesting! They\'ll appear here for easy access.'
                    }
                  </p>
                  {!searchTerm && (
                    <Link
                      to="/feed"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#7ED957] text-white rounded-xl hover:bg-[#6cc149] transition-colors"
                    >
                      <Bookmark className="w-5 h-5" />
                      Browse Feed
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Posts Grid */}
                <div className="grid gap-6">
                  {filteredAndSortedPosts.map((post) => (
                    <div key={post.id} className="relative group">
                      <PostComponent 
                        post={post} 
                        isPostOwner={false}
                      />
                      {/* Quick unsave button */}
                      <button
                        onClick={() => handleUnsaveFromPage(post.id)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-slate-200 hover:bg-red-50 hover:border-red-200"
                        title="Remove from saved posts"
                      >
                        <Bookmark className="w-5 h-5 text-red-500 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === 1
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-slate-700 hover:bg-[#7ED957]/10 hover:text-[#7ED957]'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-sm text-slate-600">
                        {currentPage} of {pagination.pages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.pages}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === pagination.pages
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-slate-700 hover:bg-[#7ED957]/10 hover:text-[#7ED957]'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Loading indicator for pagination */}
                {loading && savedPosts.length > 0 && (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#7ED957]" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedPostsPage; 