import { useState } from 'react';
import { useSavedPosts } from '../../hooks/useSavedPosts';
import { Link } from 'react-router-dom';
import { Bookmark, Loader2, ExternalLink } from 'lucide-react';

const SavedPostsSection = () => {
  const { savedPosts, loading, error, pagination } = useSavedPosts();
  const [showAll, setShowAll] = useState(false);

  // Show only first 3 posts by default
  const displayedPosts = showAll ? savedPosts : savedPosts.slice(0, 3);

  if (loading && savedPosts.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-6">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 animate-spin text-[#7ED957]" />
          <span className="ml-2 text-sm text-slate-600">Loading saved posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-6">
        <div className="text-center py-4">
          <p className="text-red-600 text-sm">Error loading saved posts</p>
        </div>
      </div>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-6">
        <div className="text-center py-4">
          <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700 mb-1">No Saved Posts</h3>
          <p className="text-xs text-slate-500 mb-3">Start saving posts you find interesting!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50">
      {/* Header */}
      <div className="p-6 border-b border-slate-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="w-5 h-5 text-[#7ED957]" />
            <h2 className="text-lg font-semibold text-slate-900">Saved Posts</h2>
            <span className="px-2 py-1 bg-[#7ED957]/10 text-[#7ED957] text-xs font-medium rounded-full">
              {pagination.total}
            </span>
          </div>
          <Link 
            to="/saved-posts"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#7ED957] transition-colors"
          >
            <span>View All</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Posts List */}
      <div className="divide-y divide-slate-100/50">
        {displayedPosts.map((post) => (
          <div key={post.id} className="p-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>by {post.user?.name || 'Unknown'}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <Bookmark className="w-4 h-4 text-[#7ED957] flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {savedPosts.length > 3 && !showAll && (
        <div className="p-4 border-t border-slate-100/50">
          <button
            onClick={() => setShowAll(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors text-sm font-medium shadow-sm"
          >
            Show {savedPosts.length - 3} more
          </button>
        </div>
      )}

      {/* View All Button */}
      {savedPosts.length > 0 && (
        <div className="p-4 border-t border-slate-100/50">
          <Link
            to="/saved-posts"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#7ED957]/10 text-[#7ED957] rounded-lg hover:bg-[#7ED957]/20 transition-colors text-sm font-medium"
          >
            <Bookmark className="w-4 h-4" />
            View All Saved Posts
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedPostsSection; 