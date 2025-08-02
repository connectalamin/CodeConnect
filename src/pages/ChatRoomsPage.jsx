import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { HashLoader } from "react-spinners";
import { 
  MessageCircle, 
  Users, 
  Lock, 
  Globe, 
  Plus, 
  Search, 
  Filter,
  Clock,
  Hash,
  Copy,
  Eye,
  EyeOff,
  Settings,
  User,
  Send,
  MoreVertical
} from "lucide-react";

const ChatRoomsPage = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    description: "",
    isPrivate: false,
    category: "Frontend"
  });

  // Mock data for demonstration
  const mockPublicRooms = [
    {
      id: 1,
      name: "React Development",
      category: "Frontend",
      description: "Discuss React, hooks, and modern frontend development",
      participants: 45,
      isOnline: true,
      lastMessage: "Anyone tried the new React 19 features?",
      lastMessageTime: "2m ago",
      messages: [
        { id: 1, user: "Sarah Johnson", message: "Anyone tried the new React 19 features?", time: "2m ago" },
        { id: 2, user: "Mike Chen", message: "The concurrent features are amazing!", time: "1m ago" }
      ]
    },
    {
      id: 2,
      name: "Node.js Backend",
      category: "Backend",
      description: "Server-side development with Node.js and Express",
      participants: 32,
      isOnline: true,
      lastMessage: "Best practices for API design?",
      lastMessageTime: "5m ago",
      messages: [
        { id: 3, user: "Alex Rodriguez", message: "Best practices for API design?", time: "5m ago" },
        { id: 4, user: "David Wilson", message: "I recommend using OpenAPI specs", time: "3m ago" }
      ]
    },
    {
      id: 3,
      name: "TypeScript Tips",
      category: "Programming",
      description: "Advanced TypeScript patterns and best practices",
      participants: 28,
      isOnline: true,
      lastMessage: "Generic constraints are so powerful!",
      lastMessageTime: "10m ago",
      messages: [
        { id: 5, user: "Emma Davis", message: "Generic constraints are so powerful!", time: "10m ago" }
      ]
    }
  ];

  const mockPrivateRooms = [
    {
      id: 4,
      name: "Project Alpha",
      code: "ALPHA2024",
      description: "Private room for Project Alpha team",
      participants: 8,
      isOnline: true,
      lastMessage: "Meeting at 3 PM today",
      lastMessageTime: "1h ago",
      messages: [
        { id: 6, user: "Team Lead", message: "Meeting at 3 PM today", time: "1h ago" }
      ]
    },
    {
      id: 5,
      name: "Study Group",
      code: "STUDY123",
      description: "Study group for algorithms",
      participants: 12,
      isOnline: false,
      lastMessage: "Great session today!",
      lastMessageTime: "2h ago",
      messages: [
        { id: 7, user: "Study Buddy", message: "Great session today!", time: "2h ago" }
      ]
    }
  ];

  const categories = [
    { id: "all", label: "All Rooms", count: mockPublicRooms.length + mockPrivateRooms.length },
    { id: "frontend", label: "Frontend", count: 1 },
    { id: "backend", label: "Backend", count: 1 },
    { id: "programming", label: "Programming", count: 1 },
    { id: "private", label: "Private", count: mockPrivateRooms.length }
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

  const getFilteredRooms = () => {
    const allRooms = [...mockPublicRooms, ...mockPrivateRooms];
    return allRooms.filter(room => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "private" && room.code) return true;
      if (selectedFilter === "frontend" && room.category === "Frontend") return true;
      if (selectedFilter === "backend" && room.category === "Backend") return true;
      if (selectedFilter === "programming" && room.category === "Programming") return true;
      return false;
    });
  };

  const handleJoinRoom = (room) => {
    setActiveRoom(room);
  };

  const handleSendMessage = () => {
    if (message.trim() && activeRoom) {
      // In real app, this would send to backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const copyRoomCode = (code) => {
    navigator.clipboard.writeText(code);
    // Show toast notification
  };

  const handleCreateRoom = () => {
    if (newRoomData.name.trim() && newRoomData.description.trim()) {
      // Generate a random room code for private rooms
      const roomCode = newRoomData.isPrivate ? Math.random().toString(36).substring(2, 8).toUpperCase() : null;
      
      const newRoom = {
        id: Date.now(),
        name: newRoomData.name,
        category: newRoomData.category,
        description: newRoomData.description,
        code: roomCode,
        participants: 1,
        isOnline: true,
        lastMessage: "Room created!",
        lastMessageTime: "now",
        messages: [
          { id: Date.now(), user: "You", message: "Room created!", time: "now" }
        ]
      };

      // Add to appropriate array
      if (newRoomData.isPrivate) {
        mockPrivateRooms.unshift(newRoom);
      } else {
        mockPublicRooms.unshift(newRoom);
      }

      // Reset form and close modal
      setNewRoomData({
        name: "",
        description: "",
        isPrivate: false,
        category: "Frontend"
      });
      setShowCreateRoom(false);
      
      // Auto-join the new room
      setActiveRoom(newRoom);
    }
  };

  if (!isAuthenticated()) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#7ED957]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#7ED957]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h2>
            <p className="text-slate-600">Please log in to access chat rooms.</p>
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#7ED957]/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#7ED957]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Chat Rooms</h1>
                  <p className="text-slate-600">Join public discussions or create private rooms</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateRoom(true)}
                className="px-6 py-3 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Room
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#7ED957]/20 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#7ED957]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{mockPublicRooms.length}</div>
                    <div className="text-sm text-slate-600">Public Rooms</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{mockPrivateRooms.length}</div>
                    <div className="text-sm text-slate-600">Private Rooms</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {mockPublicRooms.reduce((sum, room) => sum + room.participants, 0) + 
                       mockPrivateRooms.reduce((sum, room) => sum + room.participants, 0)}
                    </div>
                    <div className="text-sm text-slate-600">Total Participants</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {mockPublicRooms.reduce((sum, room) => sum + room.messages.length, 0) + 
                       mockPrivateRooms.reduce((sum, room) => sum + room.messages.length, 0)}
                    </div>
                    <div className="text-sm text-slate-600">Total Messages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Private Room */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">Join Private Room</h3>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter room code..."
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
              />
              <button className="px-6 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors font-medium">
                Join
              </button>
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
                    placeholder="Search chat rooms..."
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
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <HashLoader color="#7ED957" size={50} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Room List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Available Rooms</h3>
                  <div className="space-y-3">
                    {getFilteredRooms().map((room) => (
                      <div
                        key={room.id}
                        onClick={() => handleJoinRoom(room)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          activeRoom?.id === room.id
                            ? "border-[#7ED957] bg-[#7ED957]/5"
                            : "border-slate-200 hover:border-[#7ED957]/30 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {room.code ? (
                              <Lock className="w-4 h-4 text-slate-500" />
                            ) : (
                              <Globe className="w-4 h-4 text-slate-500" />
                            )}
                            <h4 className="font-semibold text-slate-900">{room.name}</h4>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Users className="w-3 h-3" />
                            <span>{room.participants}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{room.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{room.lastMessage}</span>
                          <span>{room.lastMessageTime}</span>
                        </div>
                        {room.code && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-slate-500">Code: {room.code}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyRoomCode(room.code);
                              }}
                              className="text-xs text-[#7ED957] hover:text-[#6cc149]"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                {activeRoom ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[600px] flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {activeRoom.code ? (
                            <Lock className="w-5 h-5 text-slate-600" />
                          ) : (
                            <Globe className="w-5 h-5 text-slate-600" />
                          )}
                          <div>
                            <h3 className="font-semibold text-slate-900">{activeRoom.name}</h3>
                            <p className="text-sm text-slate-500">{activeRoom.participants} participants</p>
                          </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {activeRoom.messages.map((msg) => (
                          <div key={msg.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-slate-900">{msg.user}</span>
                                <span className="text-xs text-slate-500">{msg.time}</span>
                              </div>
                              <p className="text-slate-700">{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-200">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a Room</h3>
                    <p className="text-slate-600">Choose a room from the list to start chatting</p>
                  </div>
                )}
              </div>
            </div>
                     )}
         </div>
       </div>

       {/* Create Room Modal */}
       {showCreateRoom && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-semibold text-slate-900">Create New Room</h3>
               <button
                 onClick={() => setShowCreateRoom(false)}
                 className="text-slate-400 hover:text-slate-600"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>

             <div className="space-y-4">
               {/* Room Name */}
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                   Room Name
                 </label>
                 <input
                   type="text"
                   placeholder="Enter room name..."
                   value={newRoomData.name}
                   onChange={(e) => setNewRoomData({...newRoomData, name: e.target.value})}
                   className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
                 />
               </div>

               {/* Room Description */}
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                   Description
                 </label>
                 <textarea
                   placeholder="Describe what this room is about..."
                   value={newRoomData.description}
                   onChange={(e) => setNewRoomData({...newRoomData, description: e.target.value})}
                   rows={3}
                   className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors resize-none"
                 />
               </div>

               {/* Room Type */}
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                   Room Type
                 </label>
                 <div className="flex gap-4">
                   <label className="flex items-center gap-2">
                     <input
                       type="radio"
                       checked={!newRoomData.isPrivate}
                       onChange={() => setNewRoomData({...newRoomData, isPrivate: false})}
                       className="text-[#7ED957] focus:ring-[#7ED957]"
                     />
                     <Globe className="w-4 h-4 text-slate-500" />
                     <span className="text-sm text-slate-700">Public</span>
                   </label>
                   <label className="flex items-center gap-2">
                     <input
                       type="radio"
                       checked={newRoomData.isPrivate}
                       onChange={() => setNewRoomData({...newRoomData, isPrivate: true})}
                       className="text-[#7ED957] focus:ring-[#7ED957]"
                     />
                     <Lock className="w-4 h-4 text-slate-500" />
                     <span className="text-sm text-slate-700">Private</span>
                   </label>
                 </div>
               </div>

               {/* Category (for public rooms) */}
               {!newRoomData.isPrivate && (
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Category
                   </label>
                   <select
                     value={newRoomData.category}
                     onChange={(e) => setNewRoomData({...newRoomData, category: e.target.value})}
                     className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
                   >
                     <option value="Frontend">Frontend</option>
                     <option value="Backend">Backend</option>
                     <option value="Programming">Programming</option>
                   </select>
                 </div>
               )}

               {/* Actions */}
               <div className="flex gap-3 pt-4">
                 <button
                   onClick={() => setShowCreateRoom(false)}
                   className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                 >
                   Cancel
                 </button>
                 <button
                   onClick={handleCreateRoom}
                   disabled={!newRoomData.name.trim() || !newRoomData.description.trim()}
                   className="flex-1 px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Create Room
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
     </>
   );
 };

export default ChatRoomsPage; 