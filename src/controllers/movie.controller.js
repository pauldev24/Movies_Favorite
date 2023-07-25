import Movie from '../models/movie_model.js';

export const createMovie = async ({ movie }) => {
    try {

        if (!movie.title || !movie.year || !movie.sinopsis || !movie.img_url || !movie.genero) return null;

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