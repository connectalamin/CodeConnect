import Navbar from '../components/Navbar';
import { Container, Grid, Stack, Text, Button, Card, Group, Tabs } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { usePost } from '../hooks/usePost';
import SearchComponent from '../components/Feed/SearchComponent';
import PostComponent from '../components/Feed/PostComponent';
import FilterComponent from '../components/Feed/FilterComponent';
import AddPostComponent from '../components/Feed/AddPostComponent';
import { FaStar } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const FeedPage = () => {
  const { profile } = useProfile();
  const { posts, isLoading, isError, error } = usePost();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All time');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('Recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [visibleComments, setVisibleComments] = useState(5);
  const postsPerPage = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#7ec226" loading speedMultiplier={2} />
    </div>
  );
  if (isError) {
    toast.error(error);
    return null;
  }

  const filterPostsByDate = (posts) => {
    const now = new Date();
    return posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      switch (selectedDateRange) {
        case 'Last 24 Hours':
          return now - postDate <= 24 * 60 * 60 * 1000;
        case 'Last 7 days':
          return now - postDate <= 7 * 24 * 60 * 60 * 1000;
        case 'Last 30 days':
          return now - postDate <= 30 * 24 * 60 * 60 * 1000;
        case 'All time':
        default:
          return true;
      }
    });
  };

  const filteredPosts = filterPostsByDate(posts).filter((post) =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)) &&
    (selectedCategory === 'all' || !selectedCategory ? true : post.categoryId?.toString() === selectedCategory)
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (selectedSort === 'Top') {
      return b.upvotes - a.upvotes;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const myPosts = posts.filter((post) => post.userId === profile?.user?.id);
  const myComments = posts
    .flatMap((post) => post.comments || [])
    .filter((comment) => comment.userId === profile?.user?.id);

  const handleShowMorePosts = () => setVisiblePosts(myPosts.length);
  const handleShowMoreComments = () => setVisibleComments(myComments.length);

  return (
    <>
      <Navbar />
      <Container size="xl" className="py-8 md:py-16 px-4 bg-gradient-to-br from-[#f0f9eb] to-[#d4e8d9] text-gray-800 rounded-3xl">
        <Stack spacing="lg">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 gap-4">
            <Text size="xl" weight={900} className="text-gray-900 text-lg md:text-xl">
              Feed
            </Text>
            <Button
              radius="md"
              className="bg-[#94d2bd] text-white hover:bg-[#7cb8a4] transition-colors duration-200 shadow-sm hover:shadow-md w-full md:w-auto"
              onClick={() => setOpened(true)}
            >
              Add Post
            </Button>
          </div>
          <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
            <div className="md:col-span-3 w-full">
              <Card
                shadow="lg"
                radius="xl"
                className="p-4 md:p-6 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="relative w-20 md:w-24 h-20 md:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-4 ring-[#94d2bd]/20 hover:ring-[#94d2bd]/50 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/profile/${profile?.user?.id}`)}
                  >
                    {profile?.user?.image ? (
                      <img src={profile?.user?.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Text size="xl" weight={700} color="gray-500" className="uppercase">
                        {profile?.user?.name?.charAt(0) || 'U'}
                      </Text>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 md:w-6 h-5 md:h-6 bg-[#94d2bd] rounded-full flex items-center justify-center">
                      <Text size="xs" weight={600} color="white">✓</Text>
                    </div>
                  </div>
                  <Stack spacing="sm" align="center" className="w-full">
                    <Stack spacing={2} align="center">
                      <Text
                        size="md md:lg"
                        weight={700}
                        className="text-gray-900 truncate max-w-full bg-gray-100/50 px-3 py-1 rounded-full cursor-pointer"
                        onClick={() => navigate(`/profile/${profile?.user?.id}`)}
                      >
                        {profile?.user?.name || 'Unnamed User'}
                      </Text>
                      <Text size="sm" weight={400} color="gray-600" className="flex items-center gap-1">
                        <span className="text-[#94d2bd]">📅</span> Batch: {profile?.user?.batch || 'N/A'}
                      </Text>
                    </Stack>
                    <Text
                      size="sm"
                      weight={400}
                      color="gray-600"
                      className="italic bg-gradient-to-r from-[#94d2bd]/10 to-transparent px-2 rounded-md"
                    >
                      {profile?.user?.occupation || 'Not Specified'}
                    </Text>
                    <Text size="sm" weight={500} color="gray-700" className="flex items-center gap-1">
                      <span className="text-[#94d2bd]">🏫</span> {profile?.user?.university || 'Unknown University'}
                    </Text>
                    <Text size="xs" weight={400} color="gray-600" className="flex items-center gap-1">
                      <span className="text-[#94d2bd]">🕒</span> Session: {profile?.user?.session || 'N/A'}
                    </Text>
                    <Text size="xs" weight={500} color="gray-700" className="flex items-center gap-1 bg-gray-100/50 px-2 py-1 rounded-md">
                      <span className="text-[#94d2bd]">🏆</span> Ranking: {profile?.user?.ranking || 'Unranked'}
                    </Text>
                    <Text size="xs" weight={500} color="gray-700" className="flex items-center gap-1 bg-gray-100/50 px-2 py-1 rounded-md">
                      <FaStar className="text-yellow-500" /> Karma Points: {profile?.user?.karmaPoints || '0'}
                    </Text>
                  </Stack>
                </div>
              </Card>
            </div>
            <div className="md:col-span-6 w-full space-y-6">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => <PostComponent key={post.id} post={post} />)
              ) : (
                <Text size="md" color="gray-600" className="text-center">No posts available.</Text>
              )}
              <div className="flex justify-center">
                <Group spacing="md" className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-2">
                  <Button
                    variant="subtle"
                    radius="md"
                    className="text-gray-400 bg-gray-100 cursor-not-allowed opacity-60 hover:bg-gray-100 hover:text-gray-400 w-full md:w-auto"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Text size="sm" weight={500} color="gray-700" className="px-3 py-1 text-center">
                    Page {currentPage} of {totalPages}
                  </Text>
                  <Button
                    variant="subtle"
                    radius="md"
                    className="text-gray-600 hover:bg-[#94d2bd]/20 hover:text-[#94d2bd] transition-all duration-200 w-full md:w-auto"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </Group>
              </div>
            </div>
            <div className="md:col-span-3 w-full">
              <Stack spacing="lg">
                <FilterComponent
                  selectedDateRange={selectedDateRange}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                />
                <Card
                  shadow="md"
                  radius="xl"
                  className="p-4 bg-gradient-to-b from-white to-gray-50 border border-gray-200"
                >
                  <Tabs defaultValue="posts" variant="pills" color="gray">
                    <Tabs.List>
                      <Tabs.Tab value="posts">My Posts</Tabs.Tab>
                      <Tabs.Tab value="comments">My Comments</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="posts" pt="xs">
                      <Stack spacing="sm" className="max-h-60 overflow-y-auto">
                        {myPosts.slice(0, visiblePosts).map((post) => (
                          <div key={post.id} className="p-2 bg-gray-100 rounded-md">
                            <Text size="sm" weight={600} className="line-clamp-1">{post.title}</Text>
                            <Text size="xs" color="gray-600" className="line-clamp-1">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </Text>
                          </div>
                        ))}
                        {myPosts.length > 3 && (
                          visiblePosts <= 3 ? (
                            <Button variant="outline" size="xs" onClick={handleShowMorePosts} className="mt-2">
                              Show More
                            </Button>
                          ) : (
                            <Link to="/my-posts" size="xs" className="mt-2 text-[#0a3f1e]">Go to My Posts</Link>
                          )
                        )}
                      </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="comments" pt="xs">
                      <Stack spacing="sm" className="max-h-60 overflow-y-auto">
                        {myComments.slice(0, visibleComments).map((comment, index) => (
                          <div key={index} className="p-2 bg-gray-100 rounded-md">
                            <Text size="sm" className="line-clamp-2">{comment.content}</Text>
                            <Text size="xs" color="gray-600" className="line-clamp-1">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </Text>
                          </div>
                        ))}
                        {myComments.length > 3 && (
                          visibleComments <= 3 ? (
                            <Button variant="outline" size="xs" onClick={handleShowMoreComments} className="mt-2">
                              Show More
                            </Button>
                          ) : (
                            <Link to="/my-comments" size="xs" className="mt-2 text-[#073324]">Go to My Comments</Link>
                          )
                        )}
                      </Stack>
                    </Tabs.Panel>
                  </Tabs>
                </Card>
              </Stack>
            </div>
          </div>
          <AddPostComponent opened={opened} onClose={() => { setOpened(false); setCurrentPage(1); }} />
        </Stack>
      </Container>
    </>
  );
};

export default FeedPage;