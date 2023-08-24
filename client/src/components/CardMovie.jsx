import PropTypes from 'prop-types'
import { PendingMovieIcon, WatchedMovieIcon } from '../assets/Icons';

export function CardMovie({ movie }) {

  return (
    <li className='w-full rounded-b-lg duration-300 shadow-movie flex flex-col' >
      <div className='w-full'>
        <img src={`${movie.img_url}`} alt="image the la movie" className='w-full max-h-[50vh] h-full bg-cover' />
      </div>
      <article className='px-4 text-white py-2 flex flex-col gap-2'>
        <section className='flex justify-between'>
          <p>{movie.title}</p>
          <span className='text-2xl'>
            {
              (movie.state === "vista") ? <WatchedMovieIcon /> : <PendingMovieIcon />
            }
          </span>
        </section>
        <section className='flex justify-between'>
          <span>Genero:</span>
          <p>{movie.genero}</p>
        </section>
        <section className='flex justify-between'>
          <span>Visto:</span>
          <p>{movie.date_see}</p>
        </section>
      </article>
      <p></p>
    </li>
  )
}

//Para validar las props
CardMovie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sinopsis: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    genero: PropTypes.string.isRequired,
    date_see: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardMovie