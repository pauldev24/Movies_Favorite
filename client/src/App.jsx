import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Principal from './pages/User/Principal'
import DetailMovie from './pages/User/DetailMovie'
import FormFavoriteMovie from './pages/User/FormFavoriteMovie'
import Profile from './pages/User/Profile'
import NavigationAuth from './components/NavigationAuth'
import { MovieProvider } from './context/MovieContext'
import ProtectedRoute from './Secure/ProtectedRoute'
import PublicProtectedRoute from './Secure/PublicProtectedRoute'

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <MovieProvider>
        <NavigationAuth />
          <Routes>
            <Route element={<PublicProtectedRoute />} >
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>      
              <Route path='/principal' element={<Principal />} />
              <Route path='/detail-movie/:id' element={<DetailMovie />}/>
              <Route path="/add-favorite-movie" element={<FormFavoriteMovie />} />
              <Route path='/profile' element={<Profile />} />
            </Route>  
            <Route path="*" element={<h1 className='text-white'>Not Found 404</h1>} />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
