import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useChatRooms } from "../hooks/useChatRooms";
import { useChatSocket } from "../hooks/useChatSocket";
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
  MoreVertical,
  X
} from "lucide-react";

const ChatRoomsPage = () => {
  const { isAuthenticated } = useAuth();
  const { 
    publicRooms, 
    privateRooms, 
    statistics, 
    isLoading, 
    error, 
    createRoom, 
    joinRoom, 
    refreshData,
    fetchPublicRooms 
  } = useChatRooms();
  
  const {
    isConnected,
    currentRoom,
    messages,
    onlineUsers,
    typingUsers,
    joinRoom: socketJoinRoom,
    leaveRoom: socketLeaveRoom,
    sendMessage: socketSendMessage,
    handleTyping,
    fetchRoomMessages,
    setMessages
  } = useChatSocket();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    description: "",
    isPrivate: false,
    category: "Frontend"
  });

  // Categories for filtering
  const categories = [
    { id: "all", label: "All Rooms", count: (publicRooms.length + privateRooms.length) },
    { id: "Frontend", label: "Frontend", count: publicRooms.filter(r => r.category === 'Frontend').length },
    { id: "Backend", label: "Backend", count: publicRooms.filter(r => r.category === 'Backend').length },
    { id: "Programming", label: "Programming", count: publicRooms.filter(r => r.category === 'Programming').length },
    { id: "private", label: "Private", count: privateRooms.length }
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
    let allRooms = [];
    
    if (selectedFilter === "private") {
      allRooms = privateRooms.map(room => ({ ...room, isPrivate: true }));
    } else if (selectedFilter === "all") {
      allRooms = [
        ...publicRooms.map(room => ({ ...room, isPrivate: false })),
        ...privateRooms.map(room => ({ ...room, isPrivate: true }))
      ];
    } else {
      allRooms = publicRooms.filter(room => room.category === selectedFilter);
    }

    if (searchQuery) {
      allRooms = allRooms.filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allRooms;
  };

  const handleJoinRoom = async (room) => {
    try {
      setActiveRoom(room);
      socketJoinRoom(room.id);
      
      // Fetch room messages
      const roomData = await fetchRoomMessages(room.id);
      setRoomMessages(roomData.messages || []);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && activeRoom) {
      socketSendMessage(activeRoom.id, message);
      setMessage("");
    }
  };

  const copyRoomCode = (code) => {
    navigator.clipboard.writeText(code);
    // You can add a toast notification here
  };

  const handleCreateRoom = async () => {
    if (newRoomData.name.trim() && newRoomData.description.trim()) {
      try {
        const newRoom = await createRoom(newRoomData);
        
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
        socketJoinRoom(newRoom.id);
      } catch (error) {
        console.error('Error creating room:', error);
        // You can add error handling here
      }
    }
  };

  const handleJoinByCode = async () => {
    if (joinCode.trim()) {
      try {
        const result = await joinRoom(null, joinCode.trim());
        setJoinCode("");
        // You can add success notification here
      } catch (error) {
        console.error('Error joining by code:', error);
        // You can add error handling here
      }
    }
  };

  // Filter rooms when search or filter changes
  useEffect(() => {
    const filters = {};
    if (selectedFilter !== 'all' && selectedFilter !== 'private') {
      filters.category = selectedFilter;
    }
    if (searchQuery) {
      filters.search = searchQuery;
    }
    
    fetchPublicRooms(filters);
  }, [searchQuery, selectedFilter, fetchPublicRooms]);

  // Update room messages when socket messages change
  useEffect(() => {
    if (activeRoom && messages.length > 0) {
      const roomSpecificMessages = messages.filter(msg => msg.roomId === activeRoom.id);
      if (roomSpecificMessages.length > 0) {
        setRoomMessages(prev => [...prev, ...roomSpecificMessages]);
      }
    }
  }, [messages, activeRoom]);

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
                  <p className="text-slate-600">
                    Join public discussions or create private rooms
                    {!isConnected && <span className="text-red-500 ml-2">(Disconnected)</span>}
                    {isConnected && <span className="text-green-500 ml-2">(Connected)</span>}
                  </p>
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
                    <div className="text-2xl font-bold text-slate-900">{statistics.publicRooms || 0}</div>
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
                    <div className="text-2xl font-bold text-slate-900">{statistics.privateRooms || 0}</div>
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
                    <div className="text-2xl font-bold text-slate-900">{statistics.totalRooms || 0}</div>
                    <div className="text-sm text-slate-600">Your Rooms</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{statistics.totalMessages || 0}</div>
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
              <button 
                onClick={handleJoinByCode}
                className="px-6 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors font-medium"
              >
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
                            {room.joinCode ? (
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
                          <span>{formatDate(room.lastMessageTime)}</span>
                        </div>
                        {room.joinCode && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-slate-500">Code: {room.joinCode}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyRoomCode(room.joinCode);
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
                          {activeRoom.joinCode ? (
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
                        {roomMessages.map((msg) => (
                          <div key={msg.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                              {msg.user.image ? (
                                <img 
                                  src={msg.user.image} 
                                  alt={msg.user.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-slate-900">{msg.user.name}</span>
                                <span className="text-xs text-slate-500">{formatDate(msg.createdAt)}</span>
                              </div>
                              <p className="text-slate-700">{msg.content}</p>
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
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (activeRoom) {
                              handleTyping(activeRoom.id);
                            }
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] outline-none transition-colors"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!isConnected}
                          className="px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
