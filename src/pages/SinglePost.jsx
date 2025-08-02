import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSinglePost } from '../hooks/useSinglePost';
import { useCreateComment } from '../hooks/useCreateComment';
import { useCastVoteOnPost } from '../hooks/useCastVoteOnPost';
import { useCastVoteOnComment } from '../hooks/useCastVoteOnComment';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useToggleBestAnswer } from '../hooks/useToggleBestAnswer';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { FaUser, FaComment, FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaCheckCircle, FaReply, FaArrowLeft } from 'react-icons/fa';
import { CiMenuKebab } from "react-icons/ci";
import toast from 'react-hot-toast';

const CommentCard = ({ comment, postId, isPostOwner, bestAnswerId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const castVoteOnCommentMutation = useCastVoteOnComment(postId, comment.id);
  const editCommentMutation = useUpdateComment(comment.id);
  const deleteCommentMutation = useDeleteComment(postId, comment.id);
  const toggleBestAnswerMutation = useToggleBestAnswer(postId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const isBestAnswer = bestAnswerId === comment.id;
  const isCommentOwner = user && comment.user?.id === user.id;

  const handleVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    castVoteOnCommentMutation.mutate({ value }, {
      onSuccess: () => {
        toast.success(`Comment ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully`);
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to vote on comment');
      }
    });
  };

  const handleEdit = () => {
    if (editedContent.trim()) {
      editCommentMutation.mutate({ content: editedContent }, {
        onSuccess: () => {
          setIsEditing(false);
          toast.success('Comment updated successfully');
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to update comment');
        }
      });
    }
  };

  const handleDelete = () => {
    deleteCommentMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Comment deleted successfully');
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to delete comment');
      }
    });
  };

  const handleToggleBestAnswer = () => {
    toggleBestAnswerMutation.mutate(comment.id, {
      onSuccess: (data) => {
        const action = data.comment.isBestAnswer ? 'marked as' : 'removed from';
        toast.success(`Comment ${action} best answer`);
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to update best answer');
      }
    });
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
        isBestAnswer 
          ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50' 
          : 'border-slate-200 bg-white hover:border-[#7ed957] hover:bg-gradient-to-br hover:from-white hover:to-slate-50'
      }`}
    >
      {/* Best Answer Badge */}
      {isBestAnswer && (
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full font-semibold text-sm shadow-lg">
            <FaCheckCircle className="mr-2" />
            Best Answer
          </div>
        </div>
      )}

      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-[#7ed957]/20 cursor-pointer hover:ring-[#7ed957]/50 transition-all duration-300"
            onClick={() => navigate(isCommentOwner ? '/profile/' : `/profile/${comment.user?.id}`)}
          >
            {comment.user?.image ? (
              <img src={comment.user.image} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <FaUser className="text-gray-500 text-lg" />
            )}
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div>
                <h4
                  className="text-sm font-semibold text-slate-900 cursor-pointer hover:text-[#7ed957] transition-colors"
                  onClick={() => navigate(isCommentOwner ? '/profile/' : `/profile/${comment.user?.id}`)}
                >
                  {comment.user?.name || 'Unknown User'}
                </h4>
                <p className="text-xs text-slate-500">
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Unknown Date'}
                </p>
              </div>
              {comment.user?.ranking && (
                <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-xs font-semibold rounded-full shadow-sm">
                  {comment.user.ranking}
                </span>
              )}
            </div>

            {/* Action Menu */}
            {(isCommentOwner || isPostOwner) && (
              <div className="relative">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <CiMenuKebab className="text-lg" />
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-10 min-w-[120px]">
                  {isCommentOwner && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                    >
                      <FaEdit className="mr-2 text-xs" />
                      Edit
                    </button>
                  )}
                  {isCommentOwner && (
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <FaTrash className="mr-2 text-xs" />
                      Delete
                    </button>
                  )}
                  {isPostOwner && (
                    <button
                      onClick={handleToggleBestAnswer}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                        isBestAnswer ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <FaCheckCircle className="mr-2 text-xs" />
                      {isBestAnswer ? 'Unmark Best Answer' : 'Mark Best Answer'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Comment Text */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Edit your comment..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200 resize-none"
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-[#7ed957] text-white rounded-lg hover:bg-[#6cc149] transition-colors text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-700 leading-relaxed mb-4">
              {comment.content || 'No content'}
            </p>
          )}

          {/* Vote Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleVote('up')}
              className="flex items-center space-x-1 px-3 py-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              <FaThumbsUp className="text-sm" />
              <span className="text-sm font-medium">{comment.upvotes || 0}</span>
            </button>
            <button
              onClick={() => handleVote('down')}
              className="flex items-center space-x-1 px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <FaThumbsDown className="text-sm" />
              <span className="text-sm font-medium">{comment.downvotes || 0}</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-slate-600 hover:text-[#7ed957] hover:bg-[#7ed957]/10 rounded-lg transition-all duration-200">
              <FaReply className="text-sm" />
              <span className="text-sm font-medium">Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { post, comments, isLoading, isError, error } = useSinglePost(postId);
  const createCommentMutation = useCreateComment(postId);
  const castVoteOnPostMutation = useCastVoteOnPost(postId);
  const [commentText, setCommentText] = useState('');

  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HashLoader color="#7ed957" loading speedMultiplier={2} />
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUser className="text-red-600 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Post</h3>
        <p className="text-slate-600">{error?.message || 'An error occurred'}</p>
      </div>
    </div>
  );

  if (!post || !post.user) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUser className="text-slate-600 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Post Not Found</h3>
        <p className="text-slate-600">The post you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const isPostOwner = String(user?.id) === String(post.userId);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      createCommentMutation.mutate(
        { content: commentText },
        {
          onSuccess: () => {
            setCommentText('');
            toast.success('Comment posted successfully');
          },
          onError: (error) => {
            toast.error(error?.message || 'Failed to post comment');
          }
        }
      );
    }
  };

  const handlePostVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    castVoteOnPostMutation.mutate(
      { value },
      {
        onSuccess: () => {
          toast.success(`Post ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully`);
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to vote on post');
        }
      }
    );
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
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 text-slate-600 hover:text-[#7ed957] transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Feed
              </button>
            </div>

            {/* Post Section */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 mb-8">
              {/* Post Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-[#7ed957]/20">
                    {post.user?.image ? (
                      <img src={post.user.image} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <FaUser className="text-gray-500 text-2xl" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{post.user?.name || 'Unknown User'}</h2>
                    {post.user?.ranking && (
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-sm font-semibold rounded-full shadow-sm">
                        {post.user.ranking}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">
                    {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown Date'}
                  </p>
                </div>
              </div>

              {/* Category */}
              {post.category?.name && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {post.category.name}
                  </span>
                </div>
              )}

              {/* Post Content */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">{post.title}</h1>
                <p className="text-slate-700 leading-relaxed text-lg">{post.content}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() => handlePostVote('up')}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  <FaThumbsUp className="text-lg" />
                  <span className="font-medium">{post.upvotes || 0}</span>
                </button>
                <button
                  onClick={() => handlePostVote('down')}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <FaThumbsDown className="text-lg" />
                  <span className="font-medium">{post.downvotes || 0}</span>
                </button>
                <div className="flex items-center space-x-2 px-4 py-2 text-slate-600">
                  <FaComment className="text-lg" />
                  <span className="font-medium">{comments.length} comments</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              {/* Comments Header */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#7ed957] rounded-xl">
                  <FaComment className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Comments ({comments.length})
                </h2>
              </div>

              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      postId={postId}
                      isPostOwner={isPostOwner}
                      bestAnswerId={post.bestAnswerId}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200 max-w-md mx-auto">
                    <FaComment className="text-4xl text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No comments yet</h3>
                    <p className="text-slate-600">
                      Be the first to share your thoughts on this post!
                    </p>
                  </div>
                </div>
              )}

              {/* Add Comment */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Add a Comment</h3>
                <div className="space-y-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200 resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleCommentSubmit}
                      disabled={createCommentMutation.isPending || !commentText.trim()}
                      className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-[#7ed957] rounded-2xl hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createCommentMutation.isPending ? (
                        <>
                          <HashLoader size={20} color="#ffffff" className="mr-3" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <FaComment className="mr-3" />
                          Post Comment
                        </>
                      )}
                    </button>
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

export default SinglePostPage;