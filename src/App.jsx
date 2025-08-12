// filepath: h:\Academic\CodeConnect\CodeConnect_Client\src\App.jsx
// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import ForgotPassword from "./auth/pages/ForgotPassword";
import ResetPassword from "./auth/pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import "./App.css";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContexts";
import { NotificationProvider } from "./contexts/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "./pages/UpdateProfile";
import Feed from "./pages/Feed";
import MyPostsPage from "./pages/MyPostsPage";
import MyCommentsPage from "./pages/MyCommentsPage";
import SinglePostPage from "./pages/SinglePost";
import UserProfile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import CategoryManagement from "./pages/CategoryManagement";
import Admin from "./pages/Admin";
import Leaderboard from "./pages/Leaderboard";
import NotificationsPage from "./pages/NotificationsPage";
import SavedPostsPage from "./pages/SavedPostsPage";
import ChatRoomsPage from "./pages/ChatRoomsPage";
import FAQ from "./pages/FAQ";
import ChatRoomManagement from "./pages/ChatRoomManagement";
import SeedManagement from "./pages/SeedManagement";

function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Allow time for token to be processed
    const timer = setTimeout(() => {
      setAuthReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#fff",
            color: "#333",
            padding: "16px",
            borderRadius: "8px",
          },
          success: {
            style: {
              background: "#4caf50",
              color: "#fff",
            },
          },
        }}
      />
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <PublicRoute>
                  <VerifyEmail />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <MyPostsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-comments"
              element={
                <ProtectedRoute>
                  <MyCommentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
                          <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/saved-posts"
                element={
                  <ProtectedRoute>
                    <SavedPostsPage />
                  </ProtectedRoute>
                }
              />

                             <Route
                 path="/chat-rooms"
                 element={
                   <ProtectedRoute>
                     <ChatRoomsPage />
                   </ProtectedRoute>
                 }
               />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/users" replace />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="chat-rooms" element={<ChatRoomManagement />} />
              <Route path="seed" element={<SeedManagement />} />
            </Route>
            <Route
              path="/post/:postId"
              element={
                <ProtectedRoute>
                  <SinglePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/empty" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
