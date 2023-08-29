import {  useState } from "react"
import { MoviesUI } from "../../components/Movies"
import { useSearch } from "../../hooks/useSearch"
//import debounce from 'just-debounce-it'
import { useMovies } from "../../hooks/useMovies"
import { Loading } from "../../components/Utils"
import { useMovieContext } from "../../context/MovieContext"
import { ErrorRequest, SuccessForm } from "../../components/Notifications"

function FormFavoriteMovie() {

  const [sort, setSort] = useState(false)
  const { query, updateSearch, error } = useSearch()
  const { movies, getMovies, loading} = useMovies({query,sort})
  const {errors, success} = useMovieContext()
  /*const debounceGetMoviesSearch = useCallback(debounce(query => {
    getMovies({query})
  }, 500), [getMovies])*/

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    //debounceGetMoviesSearch(newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({query})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="px-2 py-10 w-full m-auto">
      <header className="flex flex-col items-center mb-4">
        <section>
          <form className='flex justify-between items-center gap-3 mb-2' onSubmit={handleSubmit}>
            <input className="h-12 px-3 w-72 text-xl rounded-md focus:outline-none focus:border-violet-800 focus:border-2" value={query} onChange={handleChange} name="query" placeholder='Busque su pelicula o serie' type="text" />
            <input type="checkbox" onChange={handleSort} checked={sort} className="w-6 h-6 rounded-lg"/>
            <span className="text-white text-lg">Ordenar</span>
          </form>
          {error && <p className="text-red-800 text-md">{error}</p>}
        </section>
      </header>
      <main>
        {
          errors && <ErrorRequest errors={errors} />
        }
        {
          success && <SuccessForm success={[success]} />
        }
        {
          loading ? <Loading /> : <MoviesUI movies={movies} favorite={false}/>
        }
      </main>
    </div>
  )
}

export default FormFavoriteMovie