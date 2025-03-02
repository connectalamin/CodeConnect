/* eslint-disable no-useless-escape */
import { Card, Text, Stack, Badge, Group, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useCastVoteOnPost } from '../../hooks/useCastVoteOnPost';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

hljs.configure({
  languages: ['javascript', 'typescript', 'python', 'java', 'cpp', 'css', 'html', 'json'],
});

const PostComponent = ({ post, onVote }) => {
  const castVoteOnPostMutation = useCastVoteOnPost(post.id);
  const [highlightedContent, setHighlightedContent] = useState('');
  const [isCode, setIsCode] = useState(false);

  useEffect(() => {
    if (!post.content) return;

    const codeIndicators = [
      /\b(console|function|const|let|var|import|export|class|if|for|while|return|log)\b/,
      /^\s*[\{\}\[\]\(\)]/,
      /<\w+\s*[^>]*>/,
      /^\s*[\w]+\s*=/,
      /".*";/,
    ];

    const mightBeCode = codeIndicators.some((indicator) =>
      typeof post.content === 'string' && indicator.test(post.content)
    );

    setIsCode(mightBeCode);

    if (mightBeCode) {
      try {
        const highlighted = hljs.highlight(post.content, { language: 'javascript' }).value;
        setHighlightedContent(highlighted);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedContent(post.content);
        setIsCode(false);
      }
    } else {
      setHighlightedContent(post.content);
    }

    console.log('Post content:', post.content, 'Is Code:', mightBeCode, 'Highlighted:', highlightedContent);
  }, [post.content]);

  const handlePostVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    if (onVote) {
      onVote(voteType); // Call the parent handler if provided
    } else {
      castVoteOnPostMutation.mutate({ value });
    }
  };

  return (
    <Card
      shadow="md"
      radius="xl"
      className="p-5 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
    >
      <Stack spacing="md">
        {/* Header: Display author, post date, and category */}
        <Group position="apart" className="flex items-center">
          <Group spacing="sm">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-[#94d2bd]/20 hover:ring-[#94d2bd]/40 transition-all duration-300">
              {post.user.image ? (
                <img
                  src={post.user.image}
                  alt={post.user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Text size="lg" weight={700} color="gray-500" className="uppercase">
                  {post.user.name.charAt(0)}
                </Text>
              )}
            </div>
            <Stack spacing={0}>
              <Text size="md" weight={600} color="gray-900" className="line-clamp-1">
                {post.user.name}
              </Text>
              <Text size="xs" color="gray-500" className="line-clamp-1">
                {new Date(post.createdAt).toLocaleString()}
              </Text>
            </Stack>
          </Group>
          <Badge
            size="sm"
            radius="md"
            className="bg-[#94d2bd]/10 text-[#94d2bd] hover:bg-[#94d2bd]/30 transition-colors duration-200"
          >
            {post.category}
          </Badge>
        </Group>

        {/* Content: Display post title and content */}
        <Stack spacing="sm">
          <Text size="xl" weight={700} className="text-gray-900 line-clamp-1">
            {post.title}
          </Text>
          
          {isCode ? (
            <div className="rounded-md overflow-hidden bg-gray-900 text-white">
              <div className="p-2 bg-gray-800 text-gray-300 text-sm font-mono border-b border-gray-700">
                Code
              </div>
              <pre className="p-4 overflow-auto" style={{ maxHeight: '250px' }}>
                <code 
                  className="hljs language-javascript"
                  dangerouslySetInnerHTML={{ __html: highlightedContent }} 
                />
              </pre>
            </div>
          ) : (
            <Text size="md" color="gray-700" className="line-clamp-3">
              {post.content}
            </Text>
          )}
        </Stack>

        {/* Footer: Voting and interaction */}
        <Group spacing="lg" className="mt-3">
          <Group spacing="xs">
            <ActionIcon size="lg" color="gray" radius="md" onClick={() => handlePostVote('up')}>
              <Text size="md">👍</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">
              {post.upvotes}
            </Text>
          </Group>
          <Group spacing="xs">
            <ActionIcon size="lg" color="gray" radius="md" onClick={() => handlePostVote('down')}>
              <Text size="md">👎</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">
              {post.downvotes}
            </Text>
          </Group>
          <Group spacing="xs">
            {post.id ? (
              <Link to={`/post/${post.id}`}>
                <ActionIcon size="lg" color="gray" radius="md">
                  <Text size="md">💬</Text>
                </ActionIcon>
              </Link>
            ) : (
              <ActionIcon size="lg" color="gray" radius="md" disabled>
                <Text size="md">💬</Text>
              </ActionIcon>
            )}
            <Text size="sm" weight={500} color="gray-600">
              {post.comments?.length || 0}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default PostComponent;