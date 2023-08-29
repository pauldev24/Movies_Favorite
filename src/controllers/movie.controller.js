import { URL_MOVIES_SEARCH } from '../config.js';
import SeeMovieUser from "../models/see_movie_user_model.js";
import { GENERES } from '../constants.js';
import Movie from '../models/movie_model.js';
import fetch from 'node-fetch';

export const createMovie = async ({ movie }) => {
    try {

        if (!movie.title || !movie.year || !movie.sinopsis || !movie.genero) return null;

        const { title, year, sinopsis, img_url, genero } = movie;

        const newMovie = new Movie({
            title,
            year,
            sinopsis,
            img_url,
            genero
        });

        const movieSaved = await newMovie.save();
        //Devolver movieSaved con el id
        return movieSaved;
    } catch (error) {
        return null
    }
}

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;

        //Comprobar que existe la pelicula
        const movieFound = await Movie.findById(id);

        if (!movieFound) return res.status(400).json({ message: "No existe la pelicula" });

        //Actualizar pelicula
        const movieUpdate = await Movie.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ movie: movieUpdate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getMovie = async (req, res) => {
    try {
        const { id } = req.params;

        //Comprobar que existe la pelicula
        const movieFound = await Movie.findById(id);

        if (!movieFound) return res.status(400).json({ message: "No existe la pelicula" });

        const movieReturn = {
            ...movieFound._doc,
            genero: movieFound._doc.genero.map((id) => {
                return GENERES.find((genero) => genero.id === id)?.name
            }),
        }

        res.status(200).json({ movie: movieReturn });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMoviesApiSearch = async (req, res) => {
    const { id } = req.user
    const consulta = URL_MOVIES_SEARCH + req.params.query
    try {
        fetch(consulta).
            then(response => response.json()).
            then(async data => {
                const movies = data.results?.map((movie) => {
                    return {
                        id: movie.id,
                        title: movie.title,
                        year: movie.release_date,
                        sinopsis: movie.overview,
                        img_url: movie.poster_path,
                        genero_ids: movie.genre_ids,
                        genero: movie.genre_ids.map((id) => {
                            return GENERES.find((genero) => genero.id === id)?.name
                        }),
                    }
                })
                // Obtener las películas favoritas del usuario
                const moviesUser = await SeeMovieUser.find({ User: id }).populate("Movie");

                // Crear un conjunto de claves únicas para las películas favoritas del usuario para asi poder filtrar sin consumir mucho
                const moviesUserKeys = new Set(
                    moviesUser.map((movieUser) => `${movieUser.Movie.title}-${movieUser.Movie.year}`)
                );

                // Filtrar las películas que no sean favoritas del usuario
                const searchMovies = movies.filter((movie) => {
                    const movieKey = `${movie.title}-${movie.year}`;
                    return !moviesUserKeys.has(movieKey);
                });
                return res.status(200).json({ movies: searchMovies });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}