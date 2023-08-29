import axios from './axios'

export const requestGetMovie = (id) => axios.get(`movies/${id}`);

export const requestGetMovies = () => axios.get('movies');

export const requestUpdateMovie = (id, movie) => axios.put(`movies/${id}`, movie);

export const requestGetMoviesSearch = (query) => axios.get(`movies/search/${query}`);

export const requestMovieSeeCreate = (seemovie) => axios.post('movies', seemovie);

export const requestMovieSeeDelete = (id) => axios.delete(`movies/${id}`);

export const requestMovieAllDelete = () => axios.delete('movies');