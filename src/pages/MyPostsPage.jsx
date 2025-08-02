import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import { FaEdit, FaTrash, FaCode, FaRocket, FaCalendar, FaEye, FaUser } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';
import AddPostComponent from '../components/Feed/AddPostComponent';
import Navbar from '../components/Navbar';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import feedService from '../services/feedService';
import { Link } from 'react-router-dom';

const MyPostsPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading, isError, error } = usePost();
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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
          <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Posts</h3>
          <p className="text-slate-600">{error?.message || 'An error occurred'}</p>
        </div>
      </div>
    );
  }

  const myPosts = posts.filter((post) => post.userId === profile?.user?.id);

  const handleDelete = async () => {
    try {
      await feedService.deletePost(postToDelete, token);
      toast.success('Post deleted successfully!');
      queryClient.invalidateQueries(['posts', token]);
    } catch (error) {
      toast.error(error.message || 'Failed to delete post');
      console.error('Delete error:', error);
    } finally {
      setDeleteModalOpened(false);
      setPostToDelete(null);
    }
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
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-[#7ed957] rounded-2xl mr-4">
                  <FaCode className="text-white text-2xl" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                  My <span className="text-[#7ed957]">Posts</span>
                </h1>
              </div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Manage and organize your contributions to the community
              </p>
            </div>

            {/* Posts Grid */}
            <div className="space-y-6">
              {myPosts.length > 0 ? (
                myPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      {/* Post Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <Link to={`/post/${post.id}`} className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 hover:text-[#7ed957] transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => {
                                setEditingPost(post);
                                setModalOpened(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                              title="Edit post"
                            >
                              <FaEdit className="text-lg" />
                            </button>
                            <button
                              onClick={() => {
                                setPostToDelete(post.id);
                                setDeleteModalOpened(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Delete post"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <FaCalendar className="text-[#7ed957]" />
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaEye className="text-[#7ed957]" />
                              <span>{post.views || 0} views</span>
                            </div>
                          </div>
                          
                          <Link
                            to={`/post/${post.id}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#7ed957] border border-[#7ed957] rounded-xl hover:bg-[#7ed957] hover:text-white transition-all duration-200"
                          >
                            <FaRocket className="mr-2" />
                            View Post
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200 max-w-md mx-auto">
                    <FaCode className="text-4xl text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No posts yet</h3>
                    <p className="text-slate-600 mb-6">
                      You haven't posted anything yet. Start sharing your knowledge with the community!
                    </p>
                    <button
                      onClick={() => setModalOpened(true)}
                      className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FaRocket className="mr-3" />
                      Create Your First Post
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add Post Modal */}
            <AddPostComponent
              opened={modalOpened}
              onClose={() => {
                setModalOpened(false);
                setEditingPost(null);
              }}
              postToEdit={editingPost}
            />

            {/* Delete Confirmation Modal */}
            {deleteModalOpened && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaTrash className="text-red-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Deletion</h3>
                    <p className="text-slate-600 mb-6">
                      Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setDeleteModalOpened(false)}
                        className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex-1 px-4 py-2 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPostsPage;