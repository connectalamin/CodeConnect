import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import notificationService from '../services/notificationService';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notifications
  const fetchNotifications = async (page = 1, limit = 20, unreadOnly = false) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const response = await notificationService.getUserNotifications(page, limit, unreadOnly);
      
      if (response.success) {
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markNotificationAsRead(notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllNotificationsAsRead();
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      // Reset unread count
      setUnreadCount(0);
      
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );
      
      // Update unread count if notification was unread
      const deletedNotification = notifications.find(n => n.id === notificationId);
      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  // Refresh notifications
  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  // Polling for new notifications
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Initial fetch
    fetchNotifications();

    // Set up polling every 30 seconds
    const interval = setInterval(async () => {
      try {
        const response = await notificationService.getUserNotifications(1, 20, false);
        
        if (response.success) {
          const newNotifications = response.data.notifications || [];
          const newUnreadCount = response.data.unreadCount || 0;
          
          // Check if there are new unread notifications
          const previousUnreadCount = unreadCount;
          if (newUnreadCount > previousUnreadCount) {
            const newUnreadNotifications = newNotifications.filter(
              notification => !notification.isRead && 
              !notifications.some(existing => existing.id === notification.id)
            );
            
            // Show toast for new notifications
            newUnreadNotifications.forEach(notification => {
              toast.success(notification.title, {
                duration: 4000,
                position: 'top-right',
              });
            });
          }
          
          setNotifications(newNotifications);
          setUnreadCount(newUnreadCount);
        }
      } catch (error) {
        console.error('Error refreshing notifications:', error);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user, unreadCount]);

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 