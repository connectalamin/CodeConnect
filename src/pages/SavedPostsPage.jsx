import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { HashLoader } from "react-spinners";
import { 
  Bookmark, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Trash2,
  Eye,
  MessageSquare,
  ThumbsUp,
  Clock,
  User,
  Tag,
  Star
} from "lucide-react";

const SavedPostsPage = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data based on actual schema
  const mockSavedPosts = [
    {
      id: 1,
      title: "React Hooks Best Practices",
      content: "Learn the most effective patterns for using React Hooks in production applications. This guide covers useState, useEffect, useContext, and custom hooks with real-world examples.",
             user: {
         id: 1,
         name: "Sarah Johnson",
         image: null
       },
       views: 234,
      category: {
        id: 1,
        name: "React"
      },
      voteCount: 45,
      comments: [
        { id: 1, content: "Great explanation!", user: { name: "Mike Chen" } },
        { id: 2, content: "Very helpful!", user: { name: "Alex Rodriguez" } }
      ],
      createdAt: "2024-01-15T10:30:00Z",
      savedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      content: "Explore advanced TypeScript patterns that will make your code more maintainable and type-safe. Learn about generics, utility types, and advanced interfaces.",
             user: {
         id: 2,
         name: "Mike Chen",
         image: null
       },
       views: 456,
      category: {
        id: 2,
        name: "TypeScript"
      },
      voteCount: 67,
      comments: [
        { id: 3, content: "Excellent patterns!", user: { name: "Sarah Johnson" } },
        { id: 4, content: "This helped me a lot", user: { name: "David Wilson" } }
      ],
      createdAt: "2024-01-14T15:45:00Z",
      savedAt: "2024-01-14T15:45:00Z"
    },
    {
      id: 3,
      title: "Node.js Performance Optimization",
      content: "Tips and tricks for optimizing Node.js applications for better performance. Learn about memory management, async operations, and profiling techniques.",
             user: {
         id: 3,
         name: "Alex Rodriguez",
         image: null
       },
       views: 189,
      category: {
        id: 3,
        name: "Node.js"
      },
      voteCount: 34,
      comments: [
        { id: 5, content: "Very practical tips!", user: { name: "Mike Chen" } }
      ],
      createdAt: "2024-01-13T09:15:00Z",
      savedAt: "2024-01-13T09:15:00Z"
    }
  ];

  const filters = [
    { id: "all", label: "All Posts", count: mockSavedPosts.length },
    { id: "recent", label: "Recently Saved", count: 2 },
    { id: "popular", label: "Most Popular", count: 1 },
    { id: "react", label: "React", count: 1 },
    { id: "typescript", label: "TypeScript", count: 1 },
    { id: "nodejs", label: "Node.js", count: 1 }
  ];

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

  if (!isAuthenticated()) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#7ED957]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-[#7ED957]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h2>
            <p className="text-slate-600">Please log in to view your saved posts.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#7ED957]/20 rounded-full flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-[#7ED957]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Saved Posts</h1>
                <p className="text-slate-600">Your bookmarked posts and collections</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#7ED957]/20 rounded-full flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-[#7ED957]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{mockSavedPosts.length}</div>
                    <div className="text-sm text-slate-600">Total Saved</div>
                  </div>
                </div>
              </div>
                             <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                     <ThumbsUp className="w-5 h-5 text-blue-600" />
                   </div>
                   <div>
                     <div className="text-2xl font-bold text-slate-900">{mockSavedPosts.reduce((sum, post) => sum + post.voteCount, 0)}</div>
                     <div className="text-sm text-slate-600">Total Votes</div>
                   </div>
                 </div>
               </div>
               <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                     <MessageSquare className="w-5 h-5 text-green-600" />
                   </div>
                   <div>
                     <div className="text-2xl font-bold text-slate-900">{mockSavedPosts.reduce((sum, post) => sum + post.comments.length, 0)}</div>
                     <div className="text-sm text-slate-600">Total Comments</div>
                   </div>
                 </div>
               </div>
                               <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{mockSavedPosts.reduce((sum, post) => sum + (post.views || 0), 0)}</div>
                      <div className="text-sm text-slate-600">Total Views</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search saved posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
                >
                  {filters.map((filter) => (
                    <option key={filter.id} value={filter.id}>
                      {filter.label} ({filter.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" 
                      ? "bg-white text-[#7ED957] shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" 
                      ? "bg-white text-[#7ED957] shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <HashLoader color="#7ED957" size={50} />
            </div>
          ) : mockSavedPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Saved Posts</h3>
              <p className="text-slate-600 mb-6">You haven't saved any posts yet. Start exploring and bookmark interesting content!</p>
              <button className="px-6 py-3 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors font-medium">
                Explore Posts
              </button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {mockSavedPosts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#7ED957]/30 transition-all duration-300 overflow-hidden ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                                         {/* Header */}
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                           {post.user.image ? (
                             <img 
                               src={post.user.image} 
                               alt={post.user.name} 
                               className="w-full h-full object-cover rounded-full" 
                             />
                           ) : (
                             <User className="w-5 h-5 text-slate-500" />
                           )}
                         </div>
                         <div>
                           <div className="font-semibold text-slate-900">{post.user.name}</div>
                           <div className="flex items-center gap-2 text-xs text-slate-500">
                             <Clock className="w-3 h-3" />
                             <span>Saved {formatDate(post.savedAt)}</span>
                           </div>
                         </div>
                       </div>
                       <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </div>

                     {/* Content */}
                     <div className="mb-4">
                       <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                       <p className="text-slate-600 text-sm line-clamp-3">{post.content}</p>
                     </div>

                     {/* Category */}
                     <div className="mb-4">
                       <span className="px-3 py-1 bg-[#7ED957]/10 text-slate-800 text-xs font-medium rounded-full border border-[#7ED957]/20">
                         {post.category.name}
                       </span>
                     </div>

                     {/* Stats */}
                     <div className="flex items-center justify-between text-sm text-slate-500">
                       <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1">
                           <ThumbsUp className="w-4 h-4" />
                           <span>{post.voteCount}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <MessageSquare className="w-4 h-4" />
                           <span>{post.comments.length}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <Eye className="w-4 h-4" />
                           <span>{post.views || 0}</span>
                         </div>
                       </div>
                       <button className="px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors text-sm font-medium">
                         View Post
                       </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedPostsPage; 