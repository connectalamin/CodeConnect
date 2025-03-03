import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import Navbar from '../components/Navbar';
import { Container, Stack, Text, Card, Button, Group } from '@mantine/core'; // Import Button and Group
import HashLoader from 'react-spinners/HashLoader';
import toast from 'react-hot-toast';

const MyCommentsPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading, isError, error } = usePost(1, 100); // Fetch all posts (adjust pageSize if needed)
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    if (isError) {
      toast.error(error || 'Failed to load comments');
    }
  }, [isError, error]);

  if (!profile?.user?.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text size="md" color="gray-600">Please log in to view your comments.</Text>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#7ec226" loading speedMultiplier={2} />
      </div>
    );
  }

  // Group comments by post ID to find unique posts where the user commented
  const commentsByPost = {};
  posts.forEach(post => {
    const userComments = (post.comments || []).filter(comment => comment.userId === profile.user.id);
    if (userComments.length > 0) {
      commentsByPost[post.id] = {
        postTitle: post.title || 'Untitled Post',
        comments: userComments,
      };
    }
  });

  // Create list of unique posts with comments
  const uniquePostsWithComments = Object.entries(commentsByPost).map(([postId, { postTitle, comments }]) => ({
    postId: parseInt(postId),
    postTitle,
    comments,
  }));

  const handleShowMoreComments = () => {
    setVisibleComments(prev => prev + 5);
  };

  return (
    <>
      <Navbar />
      <Container size="xl" className="py-16 px-4 bg-gradient-to-br from-[#f0f9eb] to-[#d4e8d9] text-gray-800 rounded-3xl">
        <Stack spacing="lg">
          <Text size="xl" weight={900} className="text-gray-900">
            My Comments
          </Text>

          {uniquePostsWithComments.length === 0 ? (
            <Text size="md" color="gray-600" className="text-center">
              You haven’t made any comments yet.
            </Text>
          ) : (
            <Stack spacing="md">
              {uniquePostsWithComments.slice(0, visibleComments).map(({ postId, postTitle, comments }) => (
                <Card
                  key={postId}
                  shadow="md"
                  radius="xl"
                  className="p-4 bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
                >
                  <Link to={`/post/${postId}`} className="no-underline">
                    <Text size="lg" weight={700} color="gray-900" className="hover:text-[#94d2bd] transition-colors duration-200">
                      {postTitle}
                    </Text>
                  </Link>
                  <Stack spacing="sm" mt="sm">
                    {comments.map(comment => (
                      <Card
                        key={comment.id}
                        shadow="sm"
                        radius="md"
                        className="p-4 bg-gray-50 border border-gray-200"
                      >
                        <Text size="sm" color="gray-700">
                          {comment.content}
                        </Text>
                        <Group spacing="xs" mt="xs">
                          <Text size="xs" color="gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                          </Text>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </Card>
              ))}
              {visibleComments < uniquePostsWithComments.length && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={handleShowMoreComments}
                    className="mt-2"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default MyCommentsPage;