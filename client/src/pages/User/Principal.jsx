import { useEffect } from "react"
import { MoviesUI } from "../../components/Movies"
import { useMovieContext } from "../../context/MovieContext"
import { ErrorRequest } from "../../components/Notifications"
import { Loading } from "../../components/Utils"
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

  const {getMovies, movies, errors, loading} = useMovieContext()

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <section className="relative px-2 py-10">
        {
          errors && <ErrorRequest errors={errors}/>
        }
        {
          (loading) ? <Loading /> : null
        }
    <MoviesUI movies={movies} favorite={true}/>
    </section>
  )
}

export default Principal