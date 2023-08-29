import { DeleteMovieFavoriteIcon, InfoMovieIcon, PendingMovieIcon, WatchedMovieIcon } from '../assets/Icons'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useNavigate } from 'react-router-dom'
import { useMovieContext } from '../context/MovieContext'
import { URL_MOVIES_POSTER } from '../constants'

dayjs.extend(utc)

export function CardMovie({ movie }) {

  const img_url = (movie.img_url == null) ? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg' : `${URL_MOVIES_POSTER + movie.img_url}`

  const navigate = useNavigate()

  const {updateMovie, deleteMovie} = useMovieContext()

  const handleClickInfoMovie = () => {
    navigate(`/detail-movie/${movie.id}`)
  }

  const handleClickDeleteMovie = () => {
    deleteMovie(movie.id)
  }

  return (
    <li className='w-full rounded-b-lg duration-300 shadow-movie flex flex-col' >
      <div className='w-full relative'>
        <img src={`${img_url}`} alt="image the la movie" className='w-full max-h-[50vh] h-full bg-cover' />
        <div className='-top-2 -left-2 absolute bg-black p-2 rounded-r-full' onClick={handleClickInfoMovie}>
          <InfoMovieIcon className='text-3xl cursor-pointer'/>
        </div>
        <div className='-top-2 -right-2 absolute bg-black p-2 rounded-l-full' onClick={handleClickDeleteMovie}>
          <DeleteMovieFavoriteIcon className='text-3xl cursor-pointer text-red-600'/>
        </div>
      </div>
      <article className='px-4 text-white py-2 flex flex-col gap-2'>
        <section className='flex justify-between'>
          <p>{movie.title}</p>
          <span className='text-2xl'>
            {
              (movie.state === "visto") ? <WatchedMovieIcon className='text-green-600 cursor-pointer' onClick={() => {updateMovie(movie.id, {"state":"no visto"})}}/> : <PendingMovieIcon className='text-red-600 cursor-pointer' onClick={() => {updateMovie(movie.id, {"state":"visto","date_see":new Date()})}}/>
            }
          </span>
        </section>
        <section className='flex justify-between'>
          <span>Genero:</span>
          <p>{movie.genero}</p>
        </section>
        <section className='flex justify-between'>
          <span>Visto:</span>
          <p>{(movie.date_see)? dayjs(movie.date_see).format('YYYY/MM/DD') : '----/--/--'}</p>
        </section>
      </article>
    </li>
  )
}


export default CardMovie