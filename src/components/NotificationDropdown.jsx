import { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, MessageSquare, ThumbsUp, ThumbsDown, UserPlus, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      message: 'John Doe liked your post "React Best Practices"',
      time: '2 minutes ago',
      read: false,
      user: 'John Doe',
      post: 'React Best Practices'
    },
    {
      id: 2,
      type: 'comment',
      message: 'Sarah Wilson commented on your post "JavaScript Tips"',
      time: '5 minutes ago',
      read: false,
      user: 'Sarah Wilson',
      post: 'JavaScript Tips'
    },
    {
      id: 3,
      type: 'best_answer',
      message: 'Your answer was marked as best answer in "Node.js Questions"',
      time: '1 hour ago',
      read: true,
      user: 'Admin',
      post: 'Node.js Questions'
    },
    {
      id: 4,
      type: 'friend_request',
      message: 'Mike Johnson sent you a friend request',
      time: '2 hours ago',
      read: false,
      user: 'Mike Johnson'
    },
    {
      id: 5,
      type: 'downvote',
      message: 'David Brown downvoted your comment in "Python Basics"',
      time: '3 hours ago',
      read: true,
      user: 'David Brown',
      post: 'Python Basics'
    }
  ]);

  const dropdownRef = useRef(null);

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

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'best_answer':
        return <Award className="w-4 h-4 text-yellow-500" />;
      case 'friend_request':
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      case 'downvote':
        return <ThumbsDown className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like':
        return 'bg-green-50 border-green-200';
      case 'comment':
        return 'bg-blue-50 border-blue-200';
      case 'best_answer':
        return 'bg-yellow-50 border-yellow-200';
      case 'friend_request':
        return 'bg-purple-50 border-purple-200';
      case 'downvote':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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

          {/* Notifications List */}
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
                    !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
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
                          <span className="text-xs text-slate-500">{notification.time}</span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-[#7ED957] rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
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

          {/* Footer */}
          {notifications.length > 0 && (
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