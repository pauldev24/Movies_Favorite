import { createContext, useContext, useEffect, useState } from 'react'
import { requestGetMovie, requestGetMovies, requestGetMoviesSearch, requestMovieAllDelete, requestMovieSeeCreate, requestMovieSeeDelete, requestUpdateMovie } from '../api/movie'

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
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("");

  const getMovies = async () => {
    try{
        setLoading(true)
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
    }catch(error){
      if (error.response != null) {
        (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
      } else {
        setErrors([error.message])
      }
    } finally {
        setLoading(false)
    }
  }

  const getMovie = async (id) => {
    try {
        setLoading(true)
        const res = await requestGetMovie(id)
        const movieDetail = {
            title:res.data.movie.title,
            year:res.data.movie.year,
            sinopsis:res.data.movie.sinopsis,
            img_url:res.data.movie.img_url,
            genero: res.data.movie.genero,
        }
        return movieDetail
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
    } finally {
        setLoading(false)
    }
  }

  const deleteMovie = async (id) => {
    try {
        const res= await requestMovieSeeDelete(id)
        if (res.status === 200) {
            const movieFound = movies.findIndex((movie) => movie.id === id)
            if(movieFound !== -1){
                const updatedMovies = [...movies];
                updatedMovies.splice(movieFound, 1);
                setMovies(updatedMovies);
            }
        }
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
    } finally {
        setLoading(false)
    }
  }

  const allDelete = async () => {
    try {
        const res = await requestMovieAllDelete()
        if (res.status === 200) {
            setMovies([]);
        }
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
    } finally {
        setLoading(false)
    }
  }
  
  const updateMovie = async (id, data) => {
    try {
        const res = await requestUpdateMovie(id, data)
        if(res.status === 200){
            const movieFound = movies.findIndex((movie) => movie.id === id)
            if(movieFound !== -1){
                const updatedMovie = {
                    ...movies[movieFound],
                    state: res.data.movie.state,
                    date_see: res.data.movie.date_see
                };
                
                const updatedMovies = [...movies];
                updatedMovies[movieFound] = updatedMovie;
                
                setMovies(updatedMovies);
            }
        }
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
    } finally {
        setLoading(false)
    }
  }

  const getMoviesSearch = async (query) => {
    if (query == '') return null
    try {
        setLoading(true)
        const res = await requestGetMoviesSearch(query)
        return res.data.movies
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
    } finally {
        setLoading(false)
    }
  }

  const createSeeMovie = async (seeMovie) => {
    try {
        setLoading(true)
        const res = await requestMovieSeeCreate(seeMovie)
        const newMovie = {
            id: res.data.movie.Movie._id,
            title: res.data.movie.Movie.title,
            year: res.data.movie.Movie.year,
            img_url: res.data.movie.Movie.img_url,
            genero: res.data.movie.Movie.genero,
            sinopsis: res.data.movie.Movie.sinopsis,
            date_see: res.data.movie.date_see,
            state: res.data.movie.state,
        };
        setMovies((prevMovies) => [...prevMovies, newMovie]);
        setSuccess(res.data.message);
        return res
    } catch (error) {
        if (error.response != null) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        } else {
            setErrors([error.message])
        }
        return null
    } finally {
        setLoading(false)
    }
  }


  useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        if (success.length > 0) {
            const timer = setTimeout(() => {
                setSuccess("")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [success])

    return (
        <MovieContext.Provider value={{getMovie,errors,getMovies,movies, loading, setLoading, updateMovie, setMovies, getMoviesSearch, createSeeMovie, success, deleteMovie, allDelete}}>
            {children}
        </MovieContext.Provider>
    )
}