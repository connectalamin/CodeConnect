import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useChatRooms } from "../hooks/useChatRooms";
import { useChatSocket } from "../hooks/useChatSocket";
import Navbar from "../components/Navbar";
import { HashLoader } from "react-spinners";
import {
  MessageCircle,
  Users,
  Globe,
  Search,
  Filter,
  User,
  Send,
  // MoreVertical (removed)
} from "lucide-react";

const ChatRoomsPage = () => {
  const { isAuthenticated, role } = useAuth();
  const {
    publicRooms,
    statistics,
    isLoading,
    error,
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
  setMessages,
  unreadCounts,
  markRoomRead,
  typingByRoom
  } = useChatSocket();

  const [searchQuery, setSearchQuery] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  // Added missing state definitions
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState('');
  // Pagination state for room list (4 per page)
  const [roomsPage, setRoomsPage] = useState(1);
  const pageSize = 4;
  const messagesEndRef = useRef(null);

  // Categories for filtering (public rooms only)
  const categories = [
    { id: "all", label: "All Rooms", count: publicRooms.length },
    { id: "Frontend", label: "Frontend", count: publicRooms.filter(r => r.category === 'Frontend').length },
    { id: "Backend", label: "Backend", count: publicRooms.filter(r => r.category === 'Backend').length },
    { id: "Programming", label: "Programming", count: publicRooms.filter(r => r.category === 'Programming').length }
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
    let allRooms = publicRooms;

    if (selectedFilter !== "all") {
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

  // Derive paginated rooms
  const filteredRooms = getFilteredRooms();
  const totalRoomPages = Math.max(1, Math.ceil(filteredRooms.length / pageSize));
  const paginatedRooms = filteredRooms.slice((roomsPage - 1) * pageSize, roomsPage * pageSize);

  const handleJoinRoom = async (room) => {
    try {
      setActiveRoom(room);
      socketJoinRoom(room.id);
      
      // Fetch room messages
      const roomData = await fetchRoomMessages(room.id);
      setRoomMessages(roomData.messages || []);
      markRoomRead(room.id);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && activeRoom) {
      console.log('Sending message:', message.trim(), 'to room:', activeRoom.id);
      socketSendMessage(activeRoom.id, message);
      setMessage("");
    }
  };

  // copyRoomCode removed (no room codes in public-only version)

  // Room creation removed per requirements

  // Filter rooms when search or filter changes (debounced to avoid flicker)
  useEffect(() => {
    const controller = new AbortController();
    const id = setTimeout(() => {
      const filters = {};
      if (selectedFilter !== 'all' && selectedFilter !== 'private') {
        filters.category = selectedFilter;
      }
      if (searchQuery) {
        filters.search = searchQuery;
      }
      fetchPublicRooms(filters);
    }, 250);
    return () => {
      clearTimeout(id);
      controller.abort?.();
    };
  }, [searchQuery, selectedFilter]);

  // Reset page when filters/search change
  useEffect(() => {
    setRoomsPage(1);
  }, [searchQuery, selectedFilter, publicRooms.length]);

  // Update room messages when socket messages change
  useEffect(() => {
    if (activeRoom && messages.length > 0) {
      const roomSpecificMessages = messages.filter(msg => msg.roomId === activeRoom.id);
      if (roomSpecificMessages.length > 0) {
        setRoomMessages(prev => {
          const combined = [...prev, ...roomSpecificMessages];
          // de-dupe by id
          const seen = new Set();
          const result = [];
          for (const m of combined) {
            if (!m.id || !seen.has(m.id)) {
              if (m.id) seen.add(m.id);
              result.push(m);
            }
          }
          return result;
        });
      }
    }
  }, [messages, activeRoom]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [roomMessages, activeRoom]);

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
                    Join public discussions in community rooms
                    {!isConnected && <span className="text-red-500 ml-2">(Disconnected)</span>}
                    {isConnected && <span className="text-green-500 ml-2">(Connected)</span>}
                  </p>
                </div>
              </div>
              {/* Admin create room button removed */}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col max-h-[75vh]">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Available Rooms</h3>
                  <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                    {paginatedRooms.map((room) => (
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
                            <Globe className="w-4 h-4 text-slate-500" />
                            <h4 className="font-semibold text-slate-900">{room.name}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            {unreadCounts?.[room.id] > 0 && (
                              <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-[10px] font-medium">
                                {unreadCounts[room.id] > 99 ? '99+' : unreadCounts[room.id]}
                              </span>
                            )}
                            <Users className="w-3 h-3" />
                            <span>{room.memberCount ?? room._count?.members ?? 0}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{room.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{room.messageCount ?? 0} messages</span>
                          <span>{formatDate(room.createdAt)}</span>
                        </div>
                        {typingByRoom?.[room.id] && typingByRoom[room.id].size > 0 && (
                          <div className="mt-2 text-[10px] text-[#7ED957] truncate">
                            {typingByRoom[room.id].size === 1 ? 'Someone is typing…' : `${typingByRoom[room.id].size} people typing…`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  {totalRoomPages > 1 && (
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-200 text-sm">
                      <button
                        onClick={() => setRoomsPage(p => Math.max(1, p - 1))}
                        disabled={roomsPage === 1}
                        className="px-3 py-1 rounded-md border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
                      >Prev</button>
                      <span className="text-slate-600">Page {roomsPage} / {totalRoomPages}</span>
                      <button
                        onClick={() => setRoomsPage(p => Math.min(totalRoomPages, p + 1))}
                        disabled={roomsPage === totalRoomPages}
                        className="px-3 py-1 rounded-md border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
                      >Next</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                {activeRoom ? (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col" style={{height: '70vh'}}>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-slate-600" />
                          <div>
                            <h3 className="font-semibold text-slate-900">{activeRoom.name}</h3>
                            <p className="text-sm text-slate-500">{activeRoom.memberCount ?? activeRoom._count?.members ?? 0} participants</p>
                          </div>
                        </div>
        {/* Three dots menu removed */}
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
                        <div ref={messagesEndRef} />
                        {typingByRoom?.[activeRoom.id] && typingByRoom[activeRoom.id].size > 0 && (
                          <div className="text-xs text-[#7ED957] flex items-center gap-1">
                            <span className="animate-pulse">{[...typingByRoom[activeRoom.id]].length === 1 ? 'Someone is typing…' : 'Multiple people typing…'}</span>
                          </div>
                        )}
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

      {/* Room creation modal removed */}
    </>
  );
};

export default ChatRoomsPage;
