import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import feedService from '../services/feedService';

export const useSinglePost = (postId) => {
  const { token, isAuthenticated } = useAuth();

  const postQuery = useQuery({
    queryKey: ['post', postId, token],
    queryFn: () => feedService.getPostById(postId, token),
    enabled: !!token && isAuthenticated(),
    retry: 0,
    staleTime: 1000 * 60 * 1, // Consider data fresh for 1 minutes
    cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
    onSuccess: (data) => {
      console.log('Fetched post:', data); // Debugging
    },
    onError: (err) => {
      console.error('Error fetching post:', err); // Debugging
    },
  });

  const commentsQuery = useQuery({
    queryKey: ['comments', postId, token],
    queryFn: () => feedService.getCommentsByPostId(postId, token),
    enabled: !!token && isAuthenticated(),
    onSuccess: (data) => {
      console.log('Fetched comments:', data); // Debugging
    },
    onError: (err) => {
      console.error('Error fetching comments:', err); // Debugging
    },
  });

  return {
    post: postQuery.data?.post, // Extract the post object
    comments: commentsQuery.data?.comments || [], // Extract the comments array
    isLoading: postQuery.isLoading || commentsQuery.isLoading,
    isError: postQuery.isError || commentsQuery.isError,
    error: postQuery.error || commentsQuery.error,
  };
};