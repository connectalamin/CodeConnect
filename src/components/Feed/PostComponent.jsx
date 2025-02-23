import { Card, Text, Stack, Badge, Group, ActionIcon } from '@mantine/core';

const PostComponent = ({ title = "Sample Post", content = "This is a sample post content.", author = "John Doe", date = "Feb 22, 2025", upvotes = 0, downvotes = 0 }) => {
  return (
    <Card
      shadow="md"
      radius="xl"
      className="p-5 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
    >
      <Stack spacing="md">
        {/* Header: Author and Date */}
        <Group position="apart" className="flex items-center">
          <Group spacing="sm">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-[#94d2bd]/20 hover:ring-[#94d2bd]/40 transition-all duration-300">
              <Text size="lg" weight={700} color="gray-500" className="uppercase">
                {author.charAt(0)}
              </Text>
            </div>
            <Stack spacing={0}>
              <Text size="md" weight={600} color="gray-900" className="line-clamp-1">
                {author}
              </Text>
              <Text size="xs" color="gray-500" className="line-clamp-1">
                {date}
              </Text>
            </Stack>
          </Group>
          <Badge
            size="sm"
            radius="md"
            className="bg-[#94d2bd]/10 text-[#94d2bd] hover:bg-[#94d2bd]/30 transition-colors duration-200"
          >
            Post
          </Badge>
        </Group>

        {/* Content */}
        <Stack spacing="sm">
          <Text size="xl" weight={700} className="text-gray-900 line-clamp-1">
            {title}
          </Text>
          <Text size="md" color="gray-700" className="line-clamp-3">
            {content}
          </Text>
        </Stack>

        {/* Actions */}
        <Group spacing="lg" className="mt-3">
          <Group spacing="xs" className="cursor-pointer hover:text-[#94d2bd] transition-colors duration-200">
            <ActionIcon size="lg" color="gray" radius="md">
              <Text size="md">👍</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">
              {upvotes}
            </Text>
          </Group>
          <Group spacing="xs" className="cursor-pointer hover:text-[#94d2bd] transition-colors duration-200">
            <ActionIcon size="lg" color="gray" radius="md">
              <Text size="md">👎</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">
              {downvotes}
            </Text>
          </Group>
          <Group spacing="xs" className="cursor-pointer hover:text-[#94d2bd] transition-colors duration-200">
            <ActionIcon size="lg" color="gray" radius="md">
              <Text size="md">💬</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">
              Comment
            </Text>
          </Group>
          <Group spacing="xs" className="cursor-pointer hover:text-[#94d2bd] transition-colors duration-200">
            <ActionIcon size="lg" color="gray" radius="md">
              <Text size="md">🔗</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">
              Share
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default PostComponent;