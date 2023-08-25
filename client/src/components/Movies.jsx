
import CardMovie from "./CardMovie"

export const ListOfMovies = ({ movies, favorite }) => {
    return (
        <ul className="px-2 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {
                (favorite) ? movies.map((movie) => <CardMovie key={movie.id} movie={movie} />) : <p>Peliculas</p>
            }

        </ul>
    )
}

export const NotFoundMovies = ({ favorite }) => {
    return (
        <>
            {
                (favorite) ? <p>No tienes peliculas favoritas añadidas</p> : <p>No se encontraron peliculas</p>
            }
        </>
    )
}

export const MoviesUI = ({ movies, favorite }) => {
    return (
        <>
            {
                (movies.length > 0) ? <ListOfMovies movies={movies} favorite={favorite} /> : <NotFoundMovies favorite={favorite} />
            }
        </>
    )
}

