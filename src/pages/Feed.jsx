import Navbar from '../components/Navbar';
import { Container, Grid, Stack, Text, Button, Card, Group } from '@mantine/core';
import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import SearchComponent from '../components/Feed/SearchComponent';
import PostComponent from '../components/Feed/PostComponent';
import FilterComponent from '../components/Feed/FilterComponent';
import AddPostComponent from '../components/Feed/AddPostComponent';
import { FaStar } from 'react-icons/fa';

const FeedPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading, isError, error } = usePost(); // Fetch posts using usePost hook
  const [opened, setOpened] = useState(false);


  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <Container size="xl" className="py-16 px-4 bg-gradient-to-br from-[#f0f9eb] to-[#d4e8d9] text-gray-800 rounded-3xl">
        <Stack spacing="lg">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <Text size="xl" weight={900} className="text-gray-900">
              Feed
            </Text>
            <Button
              radius="md"
              className="bg-[#94d2bd] text-white hover:bg-[#7cb8a4] transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={() => setOpened(true)}
            >
              Add Post
            </Button>
          </div>

          <SearchComponent />

          <Grid gutter="lg">
            <Grid.Col span={3}>
              <Card
                shadow="lg"
                radius="xl"
                className="p-6 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
              >
                <div className="flex flex-col items-center space-y-5">
                  <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-4 ring-[#94d2bd]/20 hover:ring-[#94d2bd]/50 transition-all duration-300">
                    {profile?.user?.image ? (
                      <img
                        src={profile?.user?.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Text size="xl" weight={700} color="gray-500" className="uppercase">
                        {profile?.user?.name?.charAt(0) || 'U'}
                      </Text>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#94d2bd] rounded-full flex items-center justify-center">
                      <Text size="xs" weight={600} color="white">
                        ✓
                      </Text>
                    </div>
                  </div>
                  <Stack spacing="sm" align="center" className="w-full">
                    <Stack spacing={2} align="center">
                      <Text
                        size="lg"
                        weight={700}
                        className="text-gray-900 truncate max-w-full bg-gray-100/50 px-3 py-1 rounded-full"
                        style={{ lineHeight: '1.2' }}
                      >
                        {profile?.user?.name || 'Unnamed User'}
                      </Text>
                      <Text
                        size="sm"
                        weight={400}
                        color="gray-600"
                        className="flex items-center gap-1"
                        style={{ lineHeight: '1.4' }}
                      >
                        <span className="text-[#eeea1a]">📅</span>
                        Batch: {profile?.user?.batch || 'N/A'}
                      </Text>
                    </Stack>
                    <Text
                      size="sm"
                      weight={400}
                      color="gray-600"
                      className="italic bg-gradient-to-r from-[#94d2bd]/10 to-transparent px-2 rounded-md"
                      style={{ lineHeight: '1.4' }}
                    >
                      {profile?.user?.occupation || 'Not Specified'}
                    </Text>
                    <Text
                      size="sm"
                      weight={500}
                      color="gray-700"
                      className="flex items-center gap-1"
                      style={{ lineHeight: '1.5' }}
                    >
                      <span className="text-[#94d2bd]">🏫</span>
                      {profile?.user?.university || 'Unknown University'}
                    </Text>
                    <Text
                      size="xs"
                      weight={400}
                      color="gray-600"
                      className="flex items-center gap-1"
                      style={{ lineHeight: '1.5' }}
                    >
                      <span className="text-[#94d2bd]">🕒</span>
                      Session: {profile?.user?.session || 'N/A'}
                    </Text>
                    <Text
                      size="xs"
                      weight={500}
                      color="gray-700"
                      className="flex items-center gap-1 bg-gray-100/50 px-2 py-1 rounded-md"
                      style={{ lineHeight: '1.5' }}
                    >
                      <span className="text-[#94d2bd]">🏆</span>
                      Ranking: {profile?.user?.ranking || 'Unranked'}
                    </Text>
                    <Text
                      size="xs"
                      weight={500}
                      color="gray-700"
                      className="flex items-center gap-1 bg-gray-100/50 px-2 py-1 rounded-md"
                      style={{ lineHeight: '1.5' }}
                    >
                       <FaStar className="text-[#c21212]" />
                      Karma Points: {profile?.user?.karmaPoints || '0'}
                    </Text>
                   
                  </Stack>
                </div>
              </Card>
            </Grid.Col>

            <Grid.Col span={6}>
              <div className="space-y-6">
                <div className="space-y-4">
                  {posts.length > 0 ? (
                    posts.map((post) => <PostComponent key={post.id} post={post} />)
                  ) : (
                    <Text size="md" color="gray-600" className="text-center">
                      No posts available.
                    </Text>
                  )}
                </div>
                <div className="flex justify-center">
                  <Group spacing="md" className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <Button
                      variant="subtle"
                      radius="md"
                      className="text-gray-400 bg-gray-100 cursor-not-allowed opacity-60 hover:bg-gray-100 hover:text-gray-400"
                    >
                      Previous
                    </Button>
                    <Text size="sm" weight={500} color="gray-700" className="px-3 py-1">
                      1 of 5
                    </Text>
                    <Button
                      variant="subtle"
                      radius="md"
                      className="text-gray-600 hover:bg-[#94d2bd]/20 hover:text-[#94d2bd] transition-all duration-200"
                    >
                      Next
                    </Button>
                  </Group>
                </div>
              </div>
            </Grid.Col>

            <Grid.Col span={3}>
              <FilterComponent />
            </Grid.Col>
          </Grid>

          <AddPostComponent opened={opened} onClose={() => setOpened(false)} />
        </Stack>
      </Container>
    </>
  );
};

export default FeedPage;