import { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, MessageSquare, ThumbsUp, ThumbsDown, UserPlus, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import notificationService from '../services/notificationService';
import toast from 'react-hot-toast';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated } = useAuth();

  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!isAuthenticated()) return;

    try {
      setLoading(true);
      const response = await notificationService.getUserNotifications(1, 10, false);
      
      if (response.success) {
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unreadCount || 0);
      } else {
        console.error('Failed to fetch notifications:', response.error);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch notifications on component mount and when authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated]);

  // Polling for new notifications every 30 seconds
  useEffect(() => {
    if (!isAuthenticated()) return;

    const interval = setInterval(async () => {
      try {
        const response = await notificationService.getUnreadCount();
        if (response.success) {
          setUnreadCount(response.count);
        }
      } catch (error) {
        console.error('Error polling unread count:', error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'VOTE_POST':
      case 'like':
        return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'COMMENT_POST':
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'BEST_ANSWER':
      case 'best_answer':
        return <Award className="w-4 h-4 text-yellow-500" />;
      case 'friend_request':
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      case 'VOTE_COMMENT':
      case 'downvote':
        return <ThumbsDown className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'VOTE_POST':
      case 'like':
        return 'bg-green-50 border-green-200';
      case 'COMMENT_POST':
      case 'comment':
        return 'bg-blue-50 border-blue-200';
      case 'BEST_ANSWER':
      case 'best_answer':
        return 'bg-yellow-50 border-yellow-200';
      case 'friend_request':
        return 'bg-purple-50 border-purple-200';
      case 'VOTE_COMMENT':
      case 'downvote':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSecs < 60) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await notificationService.markNotificationAsRead(notificationId);
      
      if (response.success) {
        setNotifications(prev => 
          prev.map(n => 
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        toast.error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await notificationService.markAllNotificationsAsRead();
      
      if (response.success) {
        setNotifications(prev => 
          prev.map(n => ({ ...n, isRead: true }))
        );
        setUnreadCount(0);
        toast.success('All notifications marked as read');
      } else {
        toast.error('Failed to mark all notifications as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await notificationService.deleteNotification(notificationId);
      
      if (response.success) {
        const deletedNotification = notifications.find(n => n.id === notificationId);
        setNotifications(prev => 
          prev.filter(n => n.id !== notificationId)
        );
        
        if (deletedNotification && !deletedNotification.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        
        toast.success('Notification deleted');
      } else {
        toast.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  // Don't render if user is not authenticated
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            fetchNotifications(); // Refresh notifications when opening
          }
        }}
        className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#7ED957] hover:text-[#6cc149] font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="px-4 py-8 text-center">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-[#7ED957] rounded-full" role="status" aria-label="loading">
              </div>
              <p className="text-sm text-slate-500 mt-2">Loading notifications...</p>
            </div>
          )}

          {/* Notifications List */}
          {!loading && (
            <div className="py-2">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-l-4 ${getNotificationColor(notification.type)} ${
                      !notification.isRead ? 'bg-opacity-100' : 'bg-opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-[#7ED957] rounded-full"></span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 rounded hover:bg-slate-100 transition-colors duration-200"
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3 text-slate-500" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 rounded hover:bg-slate-100 transition-colors duration-200"
                          title="Delete notification"
                        >
                          <X className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer */}
          {!loading && notifications.length > 0 && (
            <div className="border-t border-slate-200 px-4 py-2">
              <Link 
                to="/notifications" 
                className="text-xs text-slate-500 hover:text-[#7ED957] font-medium block"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown; 