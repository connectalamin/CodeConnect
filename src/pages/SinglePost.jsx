import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSinglePost } from '../hooks/useSinglePost';
import { useCreateComment } from '../hooks/useCreateComment';
import { useCastVoteOnPost } from '../hooks/useCastVoteOnPost';
import { useCastVoteOnComment } from '../hooks/useCastVoteOnComment';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { Container, Stack, Card, Text, Group, Badge, ActionIcon, Textarea, Button } from '@mantine/core';

// Separate component for comment to use hooks at component level
const CommentCard = ({ comment, postId }) => {
  const castVoteOnCommentMutation = useCastVoteOnComment(postId, comment.id);
  
  const handleVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    castVoteOnCommentMutation.mutate({ value });
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
        </Group>
        <Text size="sm" color="gray-700">
          {comment.content || 'No content'}
        </Text>
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
      createCommentMutation.mutate({ content: commentText });
      setCommentText('');
    }
  };

  const handlePostVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    castVoteOnPostMutation.mutate({ value });
  };

  return (
    <>
      <Navbar />
      <Container size="xl" className="py-16 px-4 bg-gradient-to-br from-[#f0f9eb] to-[#d4e8d9] text-gray-800 rounded-3xl">
        <Stack spacing="lg">
          <Card
            shadow="md"
            radius="xl"
            className="p-5 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
          >
            <Stack spacing="md">
              <Group position="apart" className="flex items-center">
                <Group spacing="sm">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-[#94d2bd]/20 hover:ring-[#94d2bd]/40 transition-all duration-300">
                    <Text size="lg" weight={700} color="gray-500" className="uppercase">
                      {post.user?.name?.[0] || 'U'}
                    </Text>
                  </div>
                  <Stack spacing={0}>
                    <Group spacing="xs">
                      <Text size="md" weight={600} color="gray-900" className="line-clamp-1">
                        {post.user?.name || 'Unknown User'}
                      </Text>
                      <Text
                        size="sm"
                        weight={700}
                        className="px-2 py-1 rounded-md bg-gradient-to-r from-[#d4af37] via-[#f4c430] to-[#d4af37] text-gray-900 shadow-lg border border-[#b8860b] transform transition-all hover:scale-105 hover:shadow-xl glow-effect"
                      >
                        {post.user?.ranking || 'N/A'}
                      </Text>
                    </Group>
                    <Text size="xs" color="gray-500" className="line-clamp-1">
                      {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown Date'}
                    </Text>
                  </Stack>
                </Group>
                <Badge
                  size="sm"
                  radius="md"
                  className="bg-[#94d2bd]/10 text-[#94d2bd] hover:bg-[#94d2bd]/30 transition-colors duration-200"
                >
                  {post.category || 'Uncategorized'}
                </Badge>
              </Group>
              <Stack spacing="sm">
                <Text size="xl" weight={700} className="text-gray-900">
                  {post.title || 'Untitled'}
                </Text>
                <Text size="md" color="gray-700">
                  {post.content || 'No content available'}
                </Text>
              </Stack>
              <Group spacing="lg" className="mt-3">
                <Group spacing="xs">
                  <ActionIcon size="lg" color="gray" radius="md" onClick={() => handlePostVote('up')}>
                    <Text size="md">👍</Text>
                  </ActionIcon>
                  <Text size="sm" weight={500} color="gray-600">
                    {post.upvotes || 0}
                  </Text>
                </Group>
                <Group spacing="xs">
                  <ActionIcon size="lg" color="gray" radius="md" onClick={() => handlePostVote('down')}>
                    <Text size="md">👎</Text>
                  </ActionIcon>
                  <Text size="sm" weight={500} color="gray-600">
                    {post.downvotes || 0}
                  </Text>
                </Group>
                <Group spacing="xs">
                  <ActionIcon size="lg" color="gray" radius="md">
                    <Text size="md">💬</Text>
                  </ActionIcon>
                  <Text size="sm" weight={500} color="gray-600">
                    {comments.length}
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Card>

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
                  placeholder="Write a comment..."
                  minRows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
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