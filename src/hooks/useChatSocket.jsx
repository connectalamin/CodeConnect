import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './useAuth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const useChatSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  // Global typing users (legacy) + per-room typing map
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [typingByRoom, setTypingByRoom] = useState({}); // {roomId: Set<userId>}
  const [unreadCounts, setUnreadCounts] = useState({}); // {roomId: number}
  const [connectionError, setConnectionError] = useState(null);
  const { getToken, user } = useAuth();
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize socket connection
  const connect = useCallback(() => {
    const token = getToken();
    if (!token || socketRef.current?.connected) return;

    const newSocket = io(API_BASE_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
      setConnectionError(null);
      newSocket.emit('join-rooms');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionError(error.message);
      setIsConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      setConnectionError(error.message);
    });

    newSocket.on('rooms-joined', (data) => {
      console.log('Joined rooms:', data);
    });

    newSocket.on('room-joined', (data) => {
      console.log('Joined room:', data);
      setCurrentRoom(data.roomId);
      // Mark read on join
      setUnreadCounts(prev => {
        if (!prev[data.roomId]) return prev;
        const next = { ...prev, [data.roomId]: 0 };
        localStorage.setItem('chat_unreads', JSON.stringify(next));
        return next;
      });
    });

    newSocket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
      // If message for room not currently open, increment unread
      setUnreadCounts(prev => {
        if (message.roomId && message.roomId !== currentRoom) {
          const next = { ...prev, [message.roomId]: (prev[message.roomId] || 0) + 1 };
          localStorage.setItem('chat_unreads', JSON.stringify(next));
          return next;
        }
        return prev;
      });
    });

    newSocket.on('user-online', (data) => {
      setOnlineUsers(prev => new Set([...prev, data.userId]));
    });

    newSocket.on('user-offline', (data) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    });

    newSocket.on('user-typing', (data) => {
      if (data.userId !== user?.id) {
        setTypingUsers(prev => new Set([...prev, data.userId])); // legacy
        setTypingByRoom(prev => {
          const roomSet = new Set(prev[data.roomId] || []);
            roomSet.add(data.userId);
          return { ...prev, [data.roomId]: roomSet };
        });
      }
    });

    newSocket.on('user-stopped-typing', (data) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
      setTypingByRoom(prev => {
        if (!prev[data.roomId]) return prev;
        const roomSet = new Set(prev[data.roomId]);
        roomSet.delete(data.userId);
        return { ...prev, [data.roomId]: roomSet };
      });
    });

    socketRef.current = newSocket;
    setSocket(newSocket);
  }, [getToken, user?.id]);

  // Disconnect socket
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
      setCurrentRoom(null);
      setMessages([]);
      setOnlineUsers(new Set());
      setTypingUsers(new Set());
    }
  }, []);

  // Join a room
  const joinRoom = useCallback((roomId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join-room', { roomId });
    }
  }, [isConnected]);

  // Leave a room
  const leaveRoom = useCallback((roomId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('leave-room', { roomId });
      if (currentRoom === roomId) {
        setCurrentRoom(null);
        setMessages([]);
      }
    }
  }, [isConnected, currentRoom]);

  // Send message
  const sendMessage = useCallback((roomId, content) => {
    if (socketRef.current && isConnected && content.trim()) {
      socketRef.current.emit('send-message', { roomId, content: content.trim() });
    }
  }, [isConnected]);

  // Typing indicators
  const startTyping = useCallback((roomId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('typing-start', { roomId });
    }
  }, [isConnected]);

  const stopTyping = useCallback((roomId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('typing-stop', { roomId });
    }
  }, [isConnected]);

  // Handle typing with debounce
  const handleTyping = useCallback((roomId) => {
    startTyping(roomId);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(roomId);
    }, 1000);
  }, [startTyping, stopTyping]);

  // Fetch room messages
  const fetchRoomMessages = useCallback(async (roomId) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/chat/rooms/${roomId}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch room messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
      // Reset unread for this room because user explicitly fetched messages
      setUnreadCounts(prev => {
        if (!prev[roomId]) return prev;
        const next = { ...prev, [roomId]: 0 };
        localStorage.setItem('chat_unreads', JSON.stringify(next));
        return next;
      });
      return data;
    } catch (error) {
      console.error('Error fetching room messages:', error);
      throw error;
    }
  }, [getToken]);

  // Mark room read (exposed to UI)
  const markRoomRead = useCallback((roomId) => {
    setUnreadCounts(prev => {
      if (!prev[roomId]) return prev;
      const next = { ...prev, [roomId]: 0 };
      localStorage.setItem('chat_unreads', JSON.stringify(next));
      return next;
    });
  }, []);

  // Load unread counts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chat_unreads');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') setUnreadCounts(parsed);
      }
    } catch (e) {
      console.warn('Failed to parse stored unread counts');
    }
  }, []);

  // Connect on mount
  useEffect(() => {
    if (user) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [user, connect, disconnect]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    socket,
    isConnected,
    currentRoom,
    messages,
    onlineUsers,
    typingUsers,
    connectionError,
    connect,
    disconnect,
    joinRoom,
    leaveRoom,
    sendMessage,
    handleTyping,
    fetchRoomMessages,
  setMessages,
  unreadCounts,
  markRoomRead,
  typingByRoom
  };
};
