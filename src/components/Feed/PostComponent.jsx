import { Link, useNavigate } from "react-router-dom";
import { useCastVoteOnPost } from "../../hooks/useCastVoteOnPost";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useCategoryManagement } from "../../hooks/useCategoryManagement";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Clock, 
  User, 
  Eye,
  Lock,
  Globe
} from "lucide-react";

hljs.configure({
  languages: ["javascript", "typescript", "python", "java", "cpp", "css", "html", "json"],
});

const ranks = [
  { threshold: 25000, rank: "Field Marshal", badge: "bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 text-white border-amber-600 shadow-lg shadow-amber-500/25" },
  { threshold: 10000, rank: "Marshal", badge: "bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 text-white border-yellow-600 shadow-lg shadow-yellow-500/25" },
  { threshold: 7000, rank: "General", badge: "bg-gradient-to-r from-orange-600 via-yellow-500 to-amber-500 text-white border-orange-600 shadow-lg shadow-orange-500/25" },
  { threshold: 5000, rank: "Lieutenant General", badge: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white border-red-600 shadow-lg shadow-red-500/25" },
  { threshold: 3000, rank: "Major General", badge: "bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/25" },
  { threshold: 2000, rank: "Brigadier General", badge: "bg-gradient-to-r from-teal-600 via-emerald-500 to-green-500 text-white border-teal-600 shadow-lg shadow-teal-500/25" },
  { threshold: 1300, rank: "Colonel", badge: "bg-gradient-to-r from-green-600 via-teal-500 to-emerald-500 text-white border-green-600 shadow-lg shadow-green-500/25" },
  { threshold: 800, rank: "Lieutenant Colonel", badge: "bg-gradient-to-r from-blue-600 via-green-500 to-teal-500 text-white border-blue-600 shadow-lg shadow-blue-500/25" },
  { threshold: 400, rank: "Major", badge: "bg-gradient-to-r from-indigo-600 via-blue-500 to-green-500 text-white border-indigo-600 shadow-lg shadow-indigo-500/25" },
  { threshold: 200, rank: "Captain", badge: "bg-gradient-to-r from-slate-600 via-indigo-500 to-blue-500 text-white border-slate-600 shadow-lg shadow-slate-500/25" },
  { threshold: 100, rank: "Lieutenant", badge: "bg-gradient-to-r from-gray-600 via-slate-500 to-indigo-500 text-white border-gray-600 shadow-lg shadow-gray-500/25" },
  { threshold: 50, rank: "Sergeant", badge: "bg-gradient-to-r from-slate-500 via-gray-500 to-slate-600 text-white border-slate-500 shadow-lg shadow-slate-500/25" },
  { threshold: 10, rank: "Corporal", badge: "bg-gradient-to-r from-gray-500 via-slate-500 to-gray-600 text-white border-gray-500 shadow-lg shadow-gray-500/25" },
  { threshold: 0, rank: "Private", badge: "bg-gradient-to-r from-slate-400 via-gray-400 to-slate-500 text-white border-slate-400 shadow-lg shadow-slate-400/25" },
];

const getRank = (karmaPoints) => {
  const points = Number(karmaPoints) || 0;
  return ranks.find((rank) => points >= rank.threshold) || ranks[ranks.length - 1];
};

const PostComponent = ({ post, onVote, isPostOwner }) => {
  const castVoteOnPostMutation = useCastVoteOnPost(post.id);
  const navigate = useNavigate();
  const [highlightedContent, setHighlightedContent] = useState("");
  const [isCode, setIsCode] = useState(false);
  const { categories } = useCategoryManagement();

  useEffect(() => {
    if (!post.content) return;
    const codeIndicators = [
      /\b(console|function|const|let|var|import|export|class|if|for|while|return|log)\b/,
      /^\s*[\{\}\[\]\(\)]/,
      /<\w+\s*[^>]*>/,
      /^\s*[\w]+\s*=/,
      /".*";/,
    ];
    const mightBeCode = codeIndicators.some((indicator) => typeof post.content === "string" && indicator.test(post.content));
    setIsCode(mightBeCode);
    if (mightBeCode) {
      try {
        const highlighted = hljs.highlight(post.content, { language: "javascript" }).value;
        setHighlightedContent(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedContent(post.content);
        setIsCode(false);
      }
    } else {
      setHighlightedContent(post.content);
    }
  }, [post.content]);

  const userRank = getRank(post.user.karmaPoints);
  const handlePostVote = (voteType) => {
    const value = voteType === "up" ? 1 : -1;
    if (onVote) onVote(voteType);
    else castVoteOnPostMutation.mutate({ value });
  };
  const postCategory = categories.find((category) => category.id === post.categoryId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#7ED957]/30 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div 
              className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-[#7ED957]/20 hover:ring-[#7ED957]/40 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(isPostOwner ? "/profile" : `/profile/${post.userId}`)}
            >
              {post.user.image ? (
                <img 
                  src={post.user.image} 
                  alt={post.user.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              ) : (
                <User className="w-6 h-6 text-slate-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 
                  className="font-semibold text-slate-900 cursor-pointer hover:text-[#7ED957] transition-colors duration-200"
                  onClick={() => navigate(isPostOwner ? "/profile" : `/profile/${post.userId}`)}
                >
                  {post.user.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${userRank.badge}`}>
                  {userRank.rank}
                </span>
              </div>
                             <div className="flex items-center gap-2 text-xs text-slate-500">
                 <Clock className="w-3 h-3" />
                 <span>{formatDate(post.createdAt)}</span>
                 {post.visibility === 'PRIVATE' && (
                   <div className="flex items-center gap-1">
                     <Lock className="w-3 h-3" />
                     <span>Private</span>
                   </div>
                 )}
               </div>
            </div>
          </div>
          
                     {/* Category Badge */}
           <div className="flex-shrink-0">
             <span className="px-3 py-1 bg-[#7ED957]/10 text-slate-800 text-xs font-medium rounded-full border border-[#7ED957]/20">
               {postCategory?.name || "Uncategorized"}
             </span>
           </div>
        </div>

        {/* Post Title */}
        <h2 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">
          {post.title}
        </h2>

        {/* Post Content */}
        <div className="mb-4">
          {isCode ? (
            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
              <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-mono border-b border-slate-700 flex items-center justify-between">
                <span>Code</span>
                <span className="text-slate-400">JavaScript</span>
              </div>
              <pre className="p-4 overflow-auto max-h-64">
                <code 
                  className="hljs language-javascript text-sm" 
                  dangerouslySetInnerHTML={{ __html: highlightedContent }} 
                />
              </pre>
            </div>
          ) : (
            <p className="text-slate-700 leading-relaxed line-clamp-4">
              {post.content}
            </p>
          )}
        </div>
      </div>

      {/* Footer - Interaction Buttons */}
      <div className="px-6 py-4 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Upvote */}
            <button
              onClick={() => handlePostVote("up")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200 group"
            >
              <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium text-slate-700">{post.upvotes || 0}</span>
            </button>

            {/* Downvote */}
            <button
              onClick={() => handlePostVote("down")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-200 group"
            >
              <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium text-slate-700">{post.downvotes || 0}</span>
            </button>

            {/* Comments */}
            {post.id ? (
              <Link 
                to={`/post/${post.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 group"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium text-slate-700">{post.comments?.length || 0}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">{post.comments?.length || 0}</span>
              </div>
            )}
          </div>

          {/* View Post Link */}
          {post.id && (
            <Link 
              to={`/post/${post.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors duration-200 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              View Post
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComponent;