import { Link } from 'react-router-dom'
import { LogoMovie } from '../assets/Icons'
import { useAuth } from '../context/AuthContext'
import { useMovieContext } from '../context/MovieContext'
import { NavAuthorization, NavNoAuthorization } from './NavAuth'

function NavigationAuth() {
    const {isAuthenticated, logout, setLoading} = useAuth()
    const {setMovies} = useMovieContext()

    const handleLogout = () => {
        const res = logout()
        if(res) setMovies([])
        setLoading(true)
    }
    return (
        <nav className="shadow-sm shadow-white w-full rounded-se-xl hover:shadow-md h-16 flex items-center justify-between px-2 text-slate-300 duration-500">
            <Link to='/'>
                <h1 className="text-4xl font-bold">
                    <LogoMovie />
                </h1>
            </Link>
            {
                (isAuthenticated) ? <NavAuthorization handleLogout={handleLogout}/> : <NavNoAuthorization />
            }
        </nav >
    )
}

export default NavigationAuth