import axios from './axios'

export const requestGetMovie = (id) => axios.get(`movies/${id}`);

export const requestGetMovies = () => axios.get('movies');