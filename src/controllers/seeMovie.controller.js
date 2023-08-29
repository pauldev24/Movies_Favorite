import SeeMovieUser from "../models/see_movie_user_model.js";
import User from "../models/user_model.js";
import Movie from "../models/movie_model.js";
import { createMovie } from "./movie.controller.js";
import { GENERES } from "../constants.js";

export const createSeeMovieUser = async (req, res) => {
    try {
        const { movie, state, date_see } = req.body;

        if (!movie) return res.status(404).json({ message: "Debe enviar una pelicula" });

        //Primero validamos que exista el usuario y la pelicula

        const userFound = await User.findById(req.user.id);

        if (!userFound) return res.status(404).json({ message: "No existe el usuario" });

        const movieFound = await Movie.findOne({ $and: [{ title: movie.title }, { year: movie.year }] });

        if (!movieFound) {
            const movieSaved = await createMovie({ movie });

            if (!movieSaved) return res.status(400).json({ message: "No se pudo guardar la pelicula" });

            const newSeeMovieUser = new SeeMovieUser({
                User: req.user.id,
                Movie: movieSaved._id,
                state,
                date_see
            });

            const newSeeMovieUserCreate = await newSeeMovieUser.save();
            await newSeeMovieUserCreate.populate('Movie');
            return res.status(201).json({ message: "Se agrego " + movie.title + " a tu lista de peliculas", movie: { Movie: newSeeMovieUserCreate.Movie, state: newSeeMovieUserCreate.state, date_see: (newSeeMovieUserCreate.date_see == undefined) ? null : newSeeMovieUserCreate.date_see } });
        } else {
            //Como existe la pelicula reemplazamos su id con el de la base de datos
            movie.id = movieFound._id;

            //Validar si el usuario ya tiene esta pelicula en su lista
            const movieFoundUser = await SeeMovieUser.findOne({ Movie: movie.id, User: req.user.id });

            if (movieFoundUser) return res.status(400).json({ message: "Ya existe la pelicula en su lista" });

            const newSeeMovieUser = new SeeMovieUser({
                User: req.user.id,
                Movie: movie.id,
                state,
                date_see
            });

            const newSeeMovieUserCreate = await newSeeMovieUser.save();
            await newSeeMovieUserCreate.populate('Movie');
            return res.status(201).json({ message: "Se agrego " + movie.title + " a tu lista de peliculas", movie: { Movie: newSeeMovieUserCreate.Movie, state: newSeeMovieUserCreate.state, date_see: (newSeeMovieUserCreate.date_see == undefined) ? null : newSeeMovieUserCreate.date_see } });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSeeMovieUser = async (req, res) => {
    try {
        const { id } = req.params;

        //Encontrar pelicula que tenga el id de la pelicula y el id del usuario
        const movieFound = await SeeMovieUser.findOne({ Movie: id, User: req.user.id });

        if (!movieFound) res.status(204).json({ message: "No existe la pelicula en su lista" });

        const id_seemovie = movieFound._id;

        if (req.body.date_see === undefined) {
            //Añadir al req.body el data_see de ahora
            req.body.date_see = "";
        }

        //Actualizar pelicula
        const movieUpdate = await SeeMovieUser.findByIdAndUpdate(id_seemovie, req.body, { new: true });
        res.status(200).json({ message: "Lista actualizada", movie: movieUpdate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSeeMovieUser = async (req, res) => {
    const { id } = req.user;

    try {
        //todas las peliculas que tenga el usuario
        const movies = await SeeMovieUser.find({ User: id }).populate("Movie");

        if (movies.length === 0) return res.status(404).json({ message: "No tiene peliculas en su lista" });

        const moviesUser = movies.map((movie) => {
            return {
                _id: movie._id,
                User: movie.User,
                Movie: {
                    ...movie.Movie._doc,
                    genero: movie.Movie._doc.genero.map((id) => {
                        return GENERES.find((genero) => genero.id === id)?.name
                    }),
                },
            }
        })

        res.status(200).json({ movies: moviesUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSeeMovieUser = async (req, res) => {
    try {
        const { id } = req.params;

        const movieFound = await SeeMovieUser.findOne({ Movie: id, User: req.user.id });

        const id_seemovie = movieFound._id;
        //Borrar pelicula del usuario
        const movieDelete = await SeeMovieUser.findByIdAndDelete(id_seemovie);

        if (!movieDelete) res.status(204).json({ message: "No existe la pelicula en su lista" });

        res.status(200).json({ message: "Se elimino la pelicula de su lista" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSeeMovieUserAll = async (req, res) => {
    try {
        //Borrar todas las peliculas del usuario
        const moviesDelete = await SeeMovieUser.deleteMany({ User: req.user.id });

        if (!moviesDelete) res.status(204).json({ message: "No existe ninguna pelicula en su lista" });

        res.status(200).json({ message: "Se borraron todas las peliculas de su lista" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
