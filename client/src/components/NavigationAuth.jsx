import { Link } from 'react-router-dom'
import { AddVideoIcon, ProfileIcon, LogoutSessionIcon, LogoMovie } from '../assets/Icons'
import { useAuth } from '../context/AuthContext'
import { useMovieContext } from '../context/MovieContext'

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
                (isAuthenticated) ? 
                <ul className='flex justify-center items-center gap-12'>
                    <li>
                        <Link to='/add-favorite-movie' className=" px-4 py-2 rounded-md">
                            <AddVideoIcon className='w-10 h-10'/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile' className=" px-4 py-2 rounded-md">
                            <ProfileIcon className='w-10 h-10'/>
                        </Link>
                    </li>
                    <li>
                        <LogoutSessionIcon className='w-10 h-10 cursor-pointer' onClick={handleLogout}/>
                    </li>
                </ul> : <ul className='flex items-center justify-between gap-3 mr-2'>
                    <li>
                        <Link to="/login" className="text-violet-700 text-md font-bold">
                            Iniciar Sesion
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-violet-700 text-md font-bold">
                            ¿No tienes cuenta?
                        </Link>
                    </li>
                </ul>
            }
        </nav >
    )
}

export default NavigationAuth