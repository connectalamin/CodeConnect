// Base API URL - adjust based on your backend configuration
const API_BASE_URL = import.meta.env.VITE_SERVER_DEFAULT_API || 'http://localhost:5000';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Handle API response
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

const notificationService = {
  // Get user notifications
  getUserNotifications: async (page = 1, limit = 20, unreadOnly = false) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`,
        {
          method: 'GET',
          headers: getAuthHeaders(),
        }
      );
      
      const data = await handleResponse(response);
      return {
        success: true,
        data: {
          notifications: data.notifications || [],
          unreadCount: data.unreadCount || 0,
          pagination: data.pagination || {}
        }
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/${notificationId}/read`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
        }
      );
      
      await handleResponse(response);
      return {
        success: true,
        message: 'Notification marked as read'
      };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/read-all`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
        }
      );
      
      await handleResponse(response);
      return {
        success: true,
        message: 'All notifications marked as read'
      };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/${notificationId}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );
      
      await handleResponse(response);
      return {
        success: true,
        message: 'Notification deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting notification:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get notification preferences
  getNotificationPreferences: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/preferences`,
        {
          method: 'GET',
          headers: getAuthHeaders(),
        }
      );
      
      const data = await handleResponse(response);
      return {
        success: true,
        data: data.preferences || {}
      };
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/preferences`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify(preferences),
        }
      );
      
      const data = await handleResponse(response);
      return {
        success: true,
        message: 'Notification preferences updated successfully',
        data: data.preferences || {}
      };
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get unread count (lightweight endpoint for polling)
  getUnreadCount: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications?page=1&limit=1&unreadOnly=true`,
        {
          method: 'GET',
          headers: getAuthHeaders(),
        }
      );
      
      const data = await handleResponse(response);
      return {
        success: true,
        count: data.unreadCount || 0
      };
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default notificationService;
