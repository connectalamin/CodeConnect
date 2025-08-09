import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const useChatRooms = () => {
  const [publicRooms, setPublicRooms] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const fetchPublicRooms = async (filters = {}) => {
    try {
      setIsLoading(true);
      const token = getToken();
      const params = new URLSearchParams();
      
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.page) {
        params.append('page', String(filters.page));
      }
      if (filters.limit) {
        params.append('limit', String(filters.limit));
      }

      const response = await fetch(`${API_BASE_URL}/api/chat/rooms/public?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch public rooms');
      }

  const data = await response.json();
  setPublicRooms(data.rooms || []);
      setError(null);
  return data.rooms || [];
    } catch (error) {
      console.error('Error fetching public rooms:', error);
      setError(error.message);
  return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/chat/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();
      setStatistics(data.statistics || {});
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const createRoom = async (roomData) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/chat/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...roomData, isPrivate: false}) // Force public rooms only
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create room');
      }

      const data = await response.json();
      
      // Refresh the room list
      await fetchPublicRooms();
      await fetchStatistics();
      return data.room;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  };

  const joinRoom = async (roomId) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/chat/rooms/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join room');
      }

      const data = await response.json();
      
      // Refresh room lists
      await Promise.all([fetchPublicRooms(), fetchStatistics()]);
      
      return data;
    } catch (error) {
      console.error('Error joining room:', error);
      throw error;
    }
  };

  const leaveRoom = async (roomId) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/chat/rooms/${roomId}/leave`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to leave room');
      }

      // Refresh room lists
      await Promise.all([fetchPublicRooms(), fetchStatistics()]);
      
      return await response.json();
    } catch (error) {
      console.error('Error leaving room:', error);
      throw error;
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/chat/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete room');
      }

      await Promise.all([fetchPublicRooms(), fetchStatistics()]);
      return await response.json();
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  };

  const refreshData = async (filters = {}) => {
    await Promise.all([
      fetchPublicRooms(filters),
      fetchStatistics()
    ]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    publicRooms,
    statistics,
    isLoading,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
  deleteRoom,
    refreshData,
    fetchPublicRooms
  };
};
