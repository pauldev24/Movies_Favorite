import axios from './axios'

export const requestRegister = (user) => axios.post(`register`, user);

export const requestLogin = (user) => axios.post(`login`, user);

export const requestLogout = () => axios.post(`logout`);

export const verifyAuth = () => axios.get(`verify`);