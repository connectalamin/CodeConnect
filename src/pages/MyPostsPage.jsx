import { Container, Stack, Text, Card, Group, ActionIcon, Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import { FaEdit, FaTrash } from 'react-icons/fa';
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
  const { posts, isLoading } = usePost();
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  if (isLoading) return <HashLoader color="#7ec226" loading speedMultiplier={2} />;

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
      <Container size="xl" className="py-16">
        <Stack spacing="lg">
          <Text size="xl" weight={900} className="text-gray-900">
            My Posts
          </Text>

          {myPosts.length > 0 ? (
            myPosts.map((post) => (
              <Card
                key={post.id}
                shadow="md"
                radius="xl"
                className="p-5 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
              >
                <Stack spacing="md">
                  <Group position="apart" className="flex items-center">
                  <Link to={`/post/${post.id}`}>
                    <Text size="xl" weight={700} className="text-gray-900 line-clamp-1">
                      {post.title}
                    </Text>
                  </Link>
                    <Group spacing="xs">
                      <ActionIcon
                        color="blue"
                        onClick={() => {
                          setEditingPost(post);
                          setModalOpened(true);
                        }}
                      >
                        <FaEdit />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          setPostToDelete(post.id);
                          setDeleteModalOpened(true);
                        }}
                      >
                        <FaTrash />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Text size="md" color="gray-700" className="line-clamp-3">
                    {post.content}
                  </Text>
                  <Text size="xs" color="gray-500">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </Text>
                </Stack>
              </Card>
            ))
          ) : (
            <Card shadow="md" radius="xl" className="p-4 text-center">
              <Text size="md" color="gray-600">
                You haven’t posted anything yet.
              </Text>
            </Card>
          )}

          <AddPostComponent
            opened={modalOpened}
            onClose={() => {
              setModalOpened(false);
              setEditingPost(null);
            }}
            postToEdit={editingPost}
          />

          <Modal
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
            title={<Text size="lg" weight={700} color="gray-900">Confirm Deletion</Text>}
            radius="xl"
            className="bg-gradient-to-b from-white to-gray-50"
            overlayProps={{ blur: 3 }}
            styles={{
              modal: {
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              title: {
                marginBottom: '1rem',
              },
            }}
          >
            <Stack spacing="md">
              <Text size="md" color="gray-700">
                Are you sure you want to delete this post? This action cannot be undone.
              </Text>
              <Group position="right" spacing="md">
                <Button
                  variant="outline"
                  radius="lg"
                  color="gray"
                  onClick={() => setDeleteModalOpened(false)}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </Button>
                <Button
                  radius="lg"
                  color="red"
                  onClick={handleDelete}
                  className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Modal>
        </Stack>
      </Container>
    </>
  );
};

export default MyPostsPage;