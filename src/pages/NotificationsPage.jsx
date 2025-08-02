import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { 
  Bell, 
  X, 
  Check, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  UserPlus, 
  Award, 
  Clock,
  Filter,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const NotificationsPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
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
    },
    {
      id: 6,
      type: 'like',
      message: 'Alice Smith liked your comment in "Vue.js Tutorial"',
      time: '4 hours ago',
      read: true,
      user: 'Alice Smith',
      post: 'Vue.js Tutorial'
    },
    {
      id: 7,
      type: 'comment',
      message: 'Bob Wilson replied to your comment in "Angular Basics"',
      time: '5 hours ago',
      read: true,
      user: 'Bob Wilson',
      post: 'Angular Basics'
    },
    {
      id: 8,
      type: 'best_answer',
      message: 'Your answer was marked as best answer in "MongoDB Queries"',
      time: '1 day ago',
      read: true,
      user: 'Admin',
      post: 'MongoDB Queries'
    }
  ]);

  const filters = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'like', label: 'Likes', count: notifications.filter(n => n.type === 'like').length },
    { value: 'comment', label: 'Comments', count: notifications.filter(n => n.type === 'comment').length },
    { value: 'best_answer', label: 'Best Answers', count: notifications.filter(n => n.type === 'best_answer').length },
    { value: 'friend_request', label: 'Friend Requests', count: notifications.filter(n => n.type === 'friend_request').length },
    { value: 'downvote', label: 'Downvotes', count: notifications.filter(n => n.type === 'downvote').length }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="w-5 h-5 text-green-500" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'best_answer':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'friend_request':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      case 'downvote':
        return <ThumbsDown className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
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

  const getFilteredNotifications = () => {
    if (selectedFilter === 'all') return notifications;
    if (selectedFilter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === selectedFilter);
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

  const deleteAllRead = () => {
    setNotifications(prev => 
      prev.filter(n => !n.read)
    );
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Login Required</h3>
          <p className="text-slate-600">Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                <p className="text-slate-600">Stay updated with your community activity</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6cc149] transition-colors duration-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Mark all as read</span>
                </button>
              )}
              {notifications.filter(n => n.read).length > 0 && (
                <button
                  onClick={deleteAllRead}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Clear read</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter.value
                      ? 'bg-[#7ED957] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedFilter === filter.value
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <HashLoader color="#7ED957" loading speedMultiplier={2} />
                  <p className="text-slate-600">Loading notifications...</p>
                </div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No notifications</h3>
                <p className="text-slate-600 text-center">
                  {selectedFilter === 'all' 
                    ? "You're all caught up! No notifications yet."
                    : `No ${selectedFilter} notifications found.`
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 border-l-4 ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 leading-relaxed mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-xs text-slate-500">{notification.time}</span>
                            </div>
                            {!notification.read && (
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="w-4 h-4 text-[#7ED957]" />
                                <span className="text-xs text-[#7ED957] font-medium">Unread</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-slate-500" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                          title="Delete notification"
                        >
                          <X className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Unread</h3>
                  <p className="text-2xl font-bold text-slate-900">{unreadCount}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">Notifications to review</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Read</h3>
                  <p className="text-2xl font-bold text-slate-900">{notifications.filter(n => n.read).length}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">Notifications reviewed</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Total</h3>
                  <p className="text-2xl font-bold text-slate-900">{notifications.length}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">All notifications</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage; 