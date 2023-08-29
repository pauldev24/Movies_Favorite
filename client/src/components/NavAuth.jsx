import { Link } from "react-router-dom"
import { AddVideoIcon, LogoutSessionIcon, ProfileIcon } from "../assets/Icons"

export function NavAuthorization({handleLogout}) {
  return (
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
    </ul>
  )
}

export function NavNoAuthorization() {
  return(
    <ul className='flex items-center justify-between gap-3 mr-2'>
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
  )
}