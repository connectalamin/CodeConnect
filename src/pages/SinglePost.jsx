import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSinglePost } from '../hooks/useSinglePost';
import { useCreateComment } from '../hooks/useCreateComment';
import { useCastVoteOnPost } from '../hooks/useCastVoteOnPost';
import { useCastVoteOnComment } from '../hooks/useCastVoteOnComment';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { Container, Stack, Card, Text, Group, ActionIcon, Menu, Button, Textarea } from '@mantine/core';
import PostComponent from '../components/Feed/PostComponent';
import { CiMenuKebab } from "react-icons/ci";
import toast from 'react-hot-toast';

const CommentCard = ({ comment, postId }) => {
  const castVoteOnCommentMutation = useCastVoteOnComment(postId, comment.id);
  const editCommentMutation = useUpdateComment(comment.id);
  const deleteCommentMutation = useDeleteComment(postId, comment.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    castVoteOnCommentMutation.mutate({ value }, {
      onSuccess: () => {
        toast.success(`Comment ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully`, {
          style: {
            background: '#10b981',
            color: '#fff'

          }
        });
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to vote on comment', {
          style: {
            background: '#ef4444',
            color: '#fff'
          }
        });
      }
    });
  };

  const handleEdit = () => {
    if (editedContent.trim()) {
      editCommentMutation.mutate({ content: editedContent }, {
        onSuccess: () => {
          setIsEditing(false);
          toast.success('Comment updated successfully', {
            style: {
              background: '#10b981',
              color: '#fff'
            }
          });
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to update comment', {
            style: {
              background: '#ef4444',
              color: '#fff'
            }
          });
        }
      });
    }
  };

  const handleDelete = () => {
    deleteCommentMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Comment deleted successfully', {
          style: {
            background: '#10b981',
            color: '#fff'
          }
        });
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to delete comment', {
          style: {
            background: '#ef4444',
            color: '#fff'
          }
        });
      }
    });
  };

  return (
    <Card
      key={comment.id}
      shadow="sm"
      radius="md"
      className="p-4 bg-white border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-[#94d2bd]"
    >
      <Stack spacing="sm">
        <Group position="apart">
          <Group spacing="sm">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-[#94d2bd]/20">
              <Text size="md" weight={600} color="gray-500" className="uppercase">
                {comment.user?.name?.[0] || 'C'}
              </Text>
            </div>
            <Stack spacing={0}>
              <Group spacing="xs">
                <Text size="sm" weight={600} color="gray-900">
                  {comment.user?.name || 'Unknown'}
                </Text>
                <Text
                  size="xs"
                  weight={700}
                  className="px-2 py-1 rounded-md bg-gradient-to-r from-[#d4af37] via-[#f4c430] to-[#d4af37] text-gray-900 shadow-lg border border-[#b8860b] transform transition-all hover:scale-105 hover:shadow-xl glow-effect"
                >
                  {comment.user?.ranking || 'N/A'}
                </Text>
              </Group>
              <Text size="xs" color="gray-500">
                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Unknown Date'}
              </Text>
            </Stack>
          </Group>
          <Menu shadow="md" width={200} withinPortal>
            <Menu.Target>
              <ActionIcon size="sm" variant="subtle" color="gray">
                <CiMenuKebab color='black'/>  
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setIsEditing(true)}>
                Edit
              </Menu.Item>
              <Menu.Item color="red" onClick={handleDelete}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        {isEditing ? (
          <>
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Edit your comment..."
              autosize
              minRows={2}
            />
            <Group position="right" mt="sm">
              <Button onClick={handleEdit}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Group>
          </>
        ) : (
          <Text size="sm" color="gray-700">
            {comment.content || 'No content'}
          </Text>
        )}
        <Group spacing="lg">
          <Group spacing="xs">
            <ActionIcon size="md" color="gray" radius="md" onClick={() => handleVote('up')}>
              <Text size="sm">👍</Text>
            </ActionIcon>
            <Text size="xs" weight={500} color="gray-600">
              {comment.upvotes || 0}
            </Text>
          </Group>
          <Group spacing="xs">
            <ActionIcon size="md" color="gray" radius="md" onClick={() => handleVote('down')}>
              <Text size="sm">👎</Text>
            </ActionIcon>
            <Text size="xs" weight={500} color="gray-600">
              {comment.downvotes || 0}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { post, comments, isLoading, isError, error } = useSinglePost(postId);
  const createCommentMutation = useCreateComment(postId);
  const castVoteOnPostMutation = useCastVoteOnPost(postId);
  const [commentText, setCommentText] = useState('');

  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#7ec226" loading speedMultiplier={2} />
    </div>
  );
  if (isError) return <div>Error: {error?.message || 'An error occurred'}</div>;
  if (!post || !post.user) return <div>Post not found</div>;

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      createCommentMutation.mutate(
        { content: commentText },
        {
          onSuccess: () => {
            setCommentText('');
            toast.success('Comment posted successfully', {
              style: {
                background: '#10b981',
                color: '#fff'
              }
            });
          },
          onError: (error) => {
            toast.error(error?.message || 'Failed to post comment', {
              style: {
                background: '#ef4444',
                color: '#fff'
              }
            });
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
          toast.success(`Post ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully`, {
            style: {
              background: '#10b981',
              color: '#fff'
            }
          });
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to vote on post', {
            style: {
              background: '#ef4444',
              color: '#fff'
            }
          });
        }
      }
    );
  };

  return (
    <>
      <Navbar />
      <Container size="xl" className="py-16 px-4 bg-gradient-to-br from-[#f0f9eb] to-[#d4e8d9] text-gray-800 rounded-3xl">
        <Stack spacing="lg">
          <PostComponent 
            post={post} 
            onVote={handlePostVote}
          />
          
          <Stack spacing="md">
            <Text size="lg" weight={700} className="text-gray-900">
              Comments
            </Text>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} postId={postId} />
              ))
            ) : (
              <Text size="sm" color="gray-600">
                No comments yet. Be the first to comment!
              </Text>
            )}

            <Card shadow="sm" radius="md" className="p-4 bg-white border border-gray-200">
              <Stack spacing="sm">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  autosize
                  minRows={2}
                  className="w-full"
                />
                <Button
                  radius="md"
                  className="bg-[#94d2bd] text-white hover:bg-[#7cb8a4] transition-colors duration-200 shadow-sm hover:shadow-md self-end"
                  onClick={handleCommentSubmit}
                  disabled={createCommentMutation.isPending}
                >
                  {createCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default SinglePostPage;