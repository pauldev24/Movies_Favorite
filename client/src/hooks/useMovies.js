import { useRef, useState, useMemo, useCallback } from 'react'
import { useMovieContext } from "../context/MovieContext"
export function useMovies({ query, sort }) {
    const [moviesSearch, setMoviesSearch] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previusSearch = useRef(query)
    const { getMoviesSearch } = useMovieContext()

    const getMovies = useCallback(async ({ query }) => {
        //current es para llamar el dato del ref
        if (query === previusSearch.current) return
        try {
            setLoading(true)
            setError(null)
            previusSearch.current = query
            const newMovies = await getMoviesSearch(query)
            setMoviesSearch(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    //Para ordenar por titulo
    //Para evitar que este ejecutando la operacion el usememo que cuando sepa solo ejecuta la funcion de ordenar cuando cambia el sort o las peliculas
    const sortMovies = useMemo(() => {
        if (!moviesSearch || !Array.isArray(moviesSearch) || typeof moviesSearch[Symbol.iterator] !== 'function') {
            return []; // Devuelve una lista vacía si movies no es iterable
        }
        return sort ?
            /*[...moviesSearch].sort((a, b) => a.title.localeCompare(b.title))*/[...moviesSearch].sort((a, b) => {
            const A = new Date(a.year)
            const B = new Date(b.year)
            return B - A
        }
        ) : moviesSearch
    }, [sort, moviesSearch])

    return { movies: sortMovies, loading, getMovies, error }
}
