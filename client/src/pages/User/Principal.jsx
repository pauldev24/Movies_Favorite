import { MoviesUI } from "../../components/Movies"
import data from '../../mocks/favorite-example.json'

const {favorites} = data
const movies = favorites?.map((movie) => ({
  id:movie.imdbID,
  title:movie.Title,
  year:movie.Year,
  sinopsis:movie.sinopsis,
  img_url:movie.Poster,
  genero: movie.Type,
  date_see: movie.data_see,
  state: movie.state,
}))

function Principal() {
  return (
    <MoviesUI movies={movies} favorite={true}/>
  )
}

export default Principal