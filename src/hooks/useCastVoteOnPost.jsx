// src/hooks/useCastVoteOnPost.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useCastVoteOnPost = (postId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (voteData) => {
      const fullVoteData = { ...voteData, postId }; // Add postId to voteData
      return feedService.castVote(fullVoteData, token); // Unified voting method
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]); // Invalidate post-specific query
      queryClient.invalidateQueries(['posts']); // Optionally refresh all posts
    },
    onError: (error) => {
      console.error('Error voting on post:', error.message);
    },
  });
};