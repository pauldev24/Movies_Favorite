import { useEffect } from "react"
import { MoviesUI } from "../../components/Movies"
import { useMovieContext } from "../../context/MovieContext"
import { ErrorRequest } from "../../components/Notifications"
import { Loading } from "../../components/Utils"
import { DeleteAllMoviesFavoriteIcon } from "../../assets/Icons"
//import data from '../../mocks/favorite-example.json'

/*const {favorites} = data
const movies = favorites?.map((movie) => ({
  id:movie.imdbID,
  title:movie.Title,
  year:movie.Year,
  sinopsis:movie.sinopsis,
  img_url:movie.Poster,
  genero: movie.Type,
  date_see: movie.data_see,
  state: movie.state,
}))*/

function Principal() {

  const {getMovies, movies, errors, loading, allDelete} = useMovieContext()

  useEffect(() => {
    getMovies()
  }, [])

  const handleDobleClicDelete = () => {
    allDelete()
  }

  return (
    <section className="relative px-2 pt-10">
        {
          (movies.length > 0)? <button className="text-white text-lg flex gap-2 items-center right-2 top-14 absolute px-2 py-1 rounded-md shadow-sm shadow-white" onDoubleClick={handleDobleClicDelete}>
          Borrar lista <span><DeleteAllMoviesFavoriteIcon className="text-red-600 text-2xl"/></span>
        </button> : null
        }
        {
          errors && <ErrorRequest errors={errors}/>
        }
        {
          (loading) ? <Loading /> : <MoviesUI movies={movies} favorite={true}/>
        }
    </section>
  )
}

export default Principal