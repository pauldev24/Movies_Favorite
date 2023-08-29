import { useEffect, useRef, useState } from "react"

export function useSearch() {
    const [query, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)//Valor que persiste entre renders

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = query === ''
            return
        }
        if (query === '') {
            setError('No se puede buscar una pelicula vacia')
            return
        }

        if (query.match(/^\d+$/)) {
            setError('No se puede buscar una pelicula con un numero')
            return
        }

        if (query.length < 3) {
            setError('La busqueda debe tener al menos 3 caracteres')
            return
        }

        setError(null)

    }, [query])

    return { query, updateSearch, error }
}