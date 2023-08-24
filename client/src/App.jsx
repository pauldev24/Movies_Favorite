import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Principal from './pages/User/Principal'
import FormFavoriteMovie from './pages/User/FormFavoriteMovie'
import Profile from './pages/User/Profile'
import NavigationAuth from './components/NavigationAuth'

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationAuth />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path='/principal' element={<Principal />} />
          <Route path="/add-favorite-movie" element={<FormFavoriteMovie />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
