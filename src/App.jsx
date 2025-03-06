import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import Home from "./pages/Home";
import "./App.css";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContexts";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "./pages/UpdateProfile";
import Feed from "./pages/Feed";
import MyPostsPage from "./pages/MyPostsPage";
import MyCommentsPage from "./pages/MyCommentsPage";
import SinglePostPage from "./pages/SinglePost";
import UserProfile from "./pages/Profile";
function App() {
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
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route path="/about" element={<About />} />
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
  path="/post/:postId"
  element={
    <ProtectedRoute>
      <SinglePostPage />
    </ProtectedRoute>
  }
/>
          <Route path="/empty" element={<Error />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
        </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}
export default App;
