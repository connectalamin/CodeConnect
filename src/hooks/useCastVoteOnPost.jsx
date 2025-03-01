import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useCastVoteOnPost = (postId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (voteData) => {
      // Convert postId to integer before sending
      const fullVoteData = { 
        ...voteData, 
        postId: parseInt(postId) 
      };
      console.log('Sending vote data:', fullVoteData);
      return feedService.castVote(fullVoteData, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      console.error('Error voting on post:', error.message);
    },
  });
};