import { Container, Stack, Text, Card, Group, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import { FaEdit, FaTrash } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';
import AddPostComponent from '../components/Feed/AddPostComponent';
import Navbar from '../components/Navbar';

const MyPostsPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading } = usePost();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  if (isLoading) return <HashLoader color="#7ec226" loading speedMultiplier={2} />;

  const myPosts = posts.filter((post) => post.userId === profile?.user?.id);

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
                  <Text size="xl" weight={700} className="text-gray-900 line-clamp-1">
                    {post.title}
                  </Text>
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
                        // Placeholder for delete action
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
      </Stack>
    </Container>
    </>
  );
};

export default MyPostsPage;