import { createContext, useContext, useState } from 'react'
import { requestGetMovie, requestGetMovies } from '../api/movie'

export const MovieContext = createContext()

//64e6d1bcade87e97aeffffbb = id_pelicula prueba
export const useMovieContext = () => {

    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("No existe un contexto de pelicuas")
    }
    return context
}

export const MovieProvider = ({children}) => {
  const [movies, setMovies] = useState([])
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  const getMovies = async () => {
    try{
        const res = await requestGetMovies()
        const movies = res.data.movies?.map((movie) => {
            return {
                id: movie.Movie._id,
                title: movie.Movie.title,
                year: movie.Movie.year,
                img_url: movie.Movie.img_url,
                genero: movie.Movie.genero,
                sinopsis: movie.Movie.sinopsis,
                date_see: movie.date_see,
                state: movie.state,
            }
        })
        setMovies(movies)
        setLoading(false)
    }catch(error){
      if (error.response != null) {
        (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
      } else {
        setErrors([error.message])
      }
        setLoading(false)
    }
  }
  const getMovie = async (id) => {
    try {
        const res = await requestGetMovie(id)
        const movieDetail = {
            title:res.data.movie.title,
            year:res.data.movie.year,
            sinopsis:res.data.movie.sinopsis,
            img_url:res.data.movie.img_url,
            genero: res.data.movie.genero,
        }
        setLoading(false)
        return movieDetail
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
        setLoading(false)
    }
  }
    return (
        <MovieContext.Provider value={{getMovie,errors,getMovies,movies, loading, setLoading}}>
            {children}
        </MovieContext.Provider>
    )
}