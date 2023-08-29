
import { useState } from "react";
import CardMovie from "./CardMovie"
import Movie from "./Movie"

export const ListOfMovies = ({ movies, favorite, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const indiceInicial = (currentPage - 1) * itemsPerPage;
    const indiceFinal = indiceInicial + itemsPerPage;
  
    const currentMovies = movies.slice(indiceInicial, indiceFinal);
  
    return (
      <div>
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md duration-300 cursor-pointer"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md duration-300 cursor-pointer"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indiceFinal >= movies.length}
          >
            Siguiente
          </button>
        </div>
        <ul className="px-2 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorite
            ? currentMovies.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))
            : currentMovies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
              ))}
        </ul>
      </div>
    )
  }

export const NotFoundMovies = ({ favorite }) => {
    return (
        <>
            {
                (favorite) ? <p className="text-white text-xl">No tienes peliculas favoritas añadidas</p> : <p className="text-white text-xl">No se encontraron peliculas</p>
            }
        </>
    )
}

export const MoviesUI = ({ movies, favorite }) => {
    return (
        <>
            {
                (movies.length > 0) ? <ListOfMovies movies={movies} favorite={favorite} itemsPerPage={8} /> : <NotFoundMovies favorite={favorite} />
            }
        </>
    )
}

