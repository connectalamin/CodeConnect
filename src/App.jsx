import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import Login from './auth/pages/Login'
import Signup from './auth/pages/Signup'
import Home from './pages/Home'
import './App.css'
import About from './pages/About'
import Profile from './pages/Profile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
         <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
