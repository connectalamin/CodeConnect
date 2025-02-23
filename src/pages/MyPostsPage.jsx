import { Container, Stack, Text, Card, Button, Group, TextInput, Modal, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import { FaEdit, FaTrash } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';

const MyPostsPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading } = usePost();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // Placeholder for post being edited
  const [editedTitle, setEditedTitle] = useState(''); // Placeholder for edited title
  const [editedContent, setEditedContent] = useState(''); // Placeholder for edited content

  if (isLoading) return <HashLoader color="#7ec226" loading speedMultiplier={2} />;

  const myPosts = posts.filter((post) => post.userId === profile?.user?.id);

  return (
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
                        setEditedTitle(post.title);
                        setEditedContent(post.content);
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

        {/* Edit Modal */}
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Edit Post"
          radius="md"
          styles={{
            modal: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0' },
            title: { fontSize: '1.25rem', fontWeight: 700, color: '#2d3748' },
          }}
        >
          <Stack spacing="md">
            <TextInput
              label="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.currentTarget.value)}
              required
              radius="md"
              styles={{ input: { borderColor: '#94d2bd' } }}
            />
            <TextInput
              label="Content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.currentTarget.value)}
              required
              radius="md"
              styles={{ input: { borderColor: '#94d2bd' } }}
            />
            <Group position="right">
              <Button
                variant="outline"
                color="gray"
                onClick={() => setModalOpened(false)}
              >
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={() => {
                  // Placeholder for save action
                  setModalOpened(false);
                }}
              >
                Save
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default MyPostsPage;