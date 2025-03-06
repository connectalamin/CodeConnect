/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { Card, Text, Stack, Badge, Group, ActionIcon } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useCastVoteOnPost } from '../../hooks/useCastVoteOnPost';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

hljs.configure({
  languages: ['javascript', 'typescript', 'python', 'java', 'cpp', 'css', 'html', 'json'],
});

const ranks = [
  { threshold: 25000, rank: 'Field Marshal', color: 'from-blue-600 via-blue-800 to-blue-900', glow: 'shadow-lg shadow-blue-400/60 hover:shadow-xl hover:shadow-blue-500/80' },
  { threshold: 10000, rank: 'Marshal', color: 'from-purple-600 via-purple-800 to-purple-900', glow: 'shadow-lg shadow-purple-400/60 hover:shadow-xl hover:shadow-purple-500/80' },
  { threshold: 7000, rank: 'General', color: 'from-teal-600 via-teal-800 to-teal-900', glow: 'shadow-lg shadow-teal-400/60 hover:shadow-xl hover:shadow-teal-500/80' },
  { threshold: 5000, rank: 'Lieutenant General', color: 'from-indigo-600 via-indigo-800 to-indigo-900', glow: 'shadow-lg shadow-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/80' },
  { threshold: 3000, rank: 'Major General', color: 'from-cyan-600 via-cyan-800 to-cyan-900', glow: 'shadow-lg shadow-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/80' },
  { threshold: 2000, rank: 'Brigadier General', color: 'from-emerald-600 via-emerald-800 to-emerald-900', glow: 'shadow-lg shadow-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/80' },
  { threshold: 1300, rank: 'Colonel', color: 'from-gray-600 via-gray-800 to-gray-900', glow: 'shadow-lg shadow-gray-400/60 hover:shadow-xl hover:shadow-gray-500/80' },
  { threshold: 800, rank: 'Lieutenant Colonel', color: 'from-slate-600 via-slate-800 to-slate-900', glow: 'shadow-lg shadow-slate-400/60 hover:shadow-xl hover:shadow-slate-500/80' },
  { threshold: 400, rank: 'Major', color: 'from-stone-600 via-stone-800 to-stone-900', glow: 'shadow-lg shadow-stone-400/60 hover:shadow-xl hover:shadow-stone-500/80' },
  { threshold: 200, rank: 'Captain', color: 'from-amber-600 via-amber-800 to-amber-900', glow: 'shadow-lg shadow-amber-400/60 hover:shadow-xl hover:shadow-amber-500/80' },
  { threshold: 100, rank: 'Lieutenant', color: 'from-lime-600 via-lime-800 to-lime-900', glow: 'shadow-lg shadow-lime-400/60 hover:shadow-xl hover:shadow-lime-500/80' },
  { threshold: 50, rank: 'Sergeant', color: 'from-yellow-600 via-yellow-800 to-yellow-900', glow: 'shadow-lg shadow-yellow-400/60 hover:shadow-xl hover:shadow-yellow-500/80' },
  { threshold: 10, rank: 'Corporal', color: 'from-orange-600 via-orange-800 to-orange-900', glow: 'shadow-lg shadow-orange-400/60 hover:shadow-xl hover:shadow-orange-500/80' },
  { threshold: 0, rank: 'Private', color: 'from-gray-500 via-gray-700 to-gray-800', glow: 'shadow-lg shadow-gray-400/60 hover:shadow-xl hover:shadow-gray-500/80' },
];

const getRank = (karmaPoints) => {
  const points = Number(karmaPoints) || 0;
  return ranks.find(rank => points >= rank.threshold) || ranks[ranks.length - 1];
};

const PostComponent = ({ post, onVote, isPostOwner }) => {
  const castVoteOnPostMutation = useCastVoteOnPost(post.id);
  const navigate = useNavigate();
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

  const userRank = getRank(post.user.karmaPoints);
  const handlePostVote = (voteType) => {
    const value = voteType === 'up' ? 1 : -1;
    if (onVote) {
      onVote(voteType);
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
        <Group position="apart" className="flex items-center">
          <Group spacing="sm">
            <div
              className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-[#94d2bd]/20 hover:ring-[#94d2bd]/40 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(isPostOwner ? '/profile' : `/profile/${post.userId}`)}
            >
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
              <Text
                size="md"
                weight={600}
                color="gray-900"
                className="line-clamp-1 cursor-pointer"
                onClick={() => navigate(isPostOwner ? '/profile' : `/profile/${post.userId}`)}
              >
                {post.user.name}
              </Text>
              <Text size="xs" color="gray-500" className="line-clamp-1">
                {new Date(post.createdAt).toLocaleString()}
              </Text>
            </Stack>
            <Text
              size="xs"
              weight={700}
              className="px-2 py-1 rounded-md bg-gradient-to-r from-[#d4af37] via-[#f4c430] to-[#d4af37] text-gray-900 shadow-lg border border-[#b8860b] transform transition-all hover:scale-105 hover:shadow-xl glow-effect"
            >
              {userRank.rank || 'N/A'} {/* Use userRank.rank instead of userRank */}
            </Text>
          </Group>
          <Badge
            size="sm"
            radius="md"
            className="bg-[#94d2bd]/10 text-[#94d2bd] hover:bg-[#94d2bd]/30 transition-colors duration-200"
          >
            {post.category}
          </Badge>
        </Group>
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
                <code className="hljs language-javascript" dangerouslySetInnerHTML={{ __html: highlightedContent }} />
              </pre>
            </div>
          ) : (
            <Text size="md" color="gray-700" className="line-clamp-3">
              {post.content}
            </Text>
          )}
        </Stack>
        <Group spacing="lg" className="mt-3">
          <Group spacing="xs">
            <ActionIcon size="lg" color="gray" radius="md" onClick={() => handlePostVote('up')}>
              <Text size="md">👍</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">{post.upvotes}</Text>
          </Group>
          <Group spacing="xs">
            <ActionIcon size="lg" color="gray" radius="md" onClick={() => handlePostVote('down')}>
              <Text size="md">👎</Text>
            </ActionIcon>
            <Text size="sm" weight={500} color="gray-600">{post.downvotes}</Text>
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
            <Text size="sm" weight={500} color="gray-600">{post.comments?.length || 0}</Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default PostComponent;