import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useCastVoteOnComment = (postId, commentId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (voteData) => {
      // Only send commentId for comment votes, not postId
      const fullVoteData = { ...voteData, commentId, voteType: 'comment' };
      return feedService.castVote(fullVoteData, token); // Unified voting method
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]); // Invalidate comments for this post
      queryClient.invalidateQueries(['post', postId]); // Also refresh the post to update comment count
    },
    onError: (error) => {
      console.error('Error voting on comment:', error.message);
    },
  });
};