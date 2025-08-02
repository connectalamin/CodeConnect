// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import Navbar from '../components/Navbar';
import { FaComment, FaRocket, FaCalendar, FaEye, FaArrowRight, FaUser } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';
import toast from 'react-hot-toast';

const MyCommentsPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading, isError, error } = usePost(1, 100);
  const [visibleComments, setVisibleComments] = useState(10);

  useEffect(() => {
    if (isError) {
      toast.error(error || 'Failed to load comments');
    }
  }, [isError, error]);

  if (!profile?.user?.id) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <FaUser className="text-4xl text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Please log in to view your comments.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <HashLoader color="#7ed957" loading speedMultiplier={2} />
      </div>
    );
  }

  // Get all user comments with post information
  const allUserComments = [];
  posts.forEach((post) => {
    const userComments = (post.comments || []).filter(
      (comment) => comment.userId === profile.user.id
    );
    userComments.forEach((comment) => {
      allUserComments.push({
        ...comment,
        postId: post.id,
        postTitle: post.title || 'Untitled Post',
        postCategory: post.category?.name || 'Uncategorized',
      });
    });
  });

  // Sort comments by creation date (newest first)
  const sortedComments = allUserComments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 10);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ed957]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ed957]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-[#7ed957] rounded-2xl mr-4">
                  <FaComment className="text-white text-2xl" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                  My <span className="text-[#7ed957]">Comments</span>
                </h1>
              </div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                All your contributions to the community in one place
              </p>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              {sortedComments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200 max-w-md mx-auto">
                    <FaComment className="text-4xl text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No comments yet</h3>
                    <p className="text-slate-600 mb-6">
                      You haven't made any comments yet. Start engaging with the community!
                    </p>
                    <Link
                      to="/feed"
                      className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FaRocket className="mr-3" />
                      Explore Posts
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Comments List */}
                  <div className="space-y-4">
                    {sortedComments.slice(0, visibleComments).map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Comment Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-[#7ed957]/10 rounded-full flex items-center justify-center">
                              <FaComment className="text-[#7ed957] text-lg" />
                            </div>
                          </div>

                          {/* Comment Content */}
                          <div className="flex-1 min-w-0">
                            {/* Comment Text */}
                            <p className="text-slate-700 text-lg mb-3 leading-relaxed">
                              {comment.content}
                            </p>

                            {/* Post Information */}
                            <div className="bg-slate-50 p-3 rounded-xl mb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <Link 
                                    to={`/post/${comment.postId}`}
                                    className="text-slate-900 font-semibold hover:text-[#7ed957] transition-colors line-clamp-1"
                                  >
                                    {comment.postTitle}
                                  </Link>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                      {comment.postCategory}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
                                    </span>
                                  </div>
                                </div>
                                <Link
                                  to={`/post/${comment.postId}`}
                                  className="flex items-center text-[#7ed957] hover:text-[#6cc149] transition-colors ml-4"
                                >
                                  <span className="text-sm font-medium mr-2">View Post</span>
                                  <FaArrowRight className="text-sm" />
                                </Link>
                              </div>
                            </div>

                            {/* Comment Stats */}
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <FaCalendar className="text-[#7ed957]" />
                                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaEye className="text-[#7ed957]" />
                                <span>{comment.views || 0} views</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show More Button */}
                  {visibleComments < sortedComments.length && (
                    <div className="text-center pt-8">
                      <button
                        onClick={handleShowMoreComments}
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-[#7ed957] border-2 border-[#7ed957] rounded-2xl hover:bg-[#7ed957] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <FaRocket className="mr-3" />
                        Show More Comments ({sortedComments.length - visibleComments} remaining)
                      </button>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="text-center pt-8">
                    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Comment Summary
                      </h3>
                      <p className="text-slate-600">
                        You've made <span className="font-bold text-[#7ed957]">{sortedComments.length}</span> comment{sortedComments.length !== 1 ? 's' : ''} across <span className="font-bold text-[#7ed957]">{new Set(sortedComments.map(c => c.postId)).size}</span> different post{sortedComments.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCommentsPage;
