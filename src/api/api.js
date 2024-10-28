import axios from 'axios';

export const BASE_URL = "https://sw-api.starnavi.io/";

export const getHeroes = (search= "", page) => {
    return axios.get(`${BASE_URL}/people/?page=${page}&search=${search}`);
}
export const getFilms = (id) => {
    return axios.get(`${BASE_URL}/films/?characters=${id}`);
}
export const getStarShips = (id) => {
    return axios.get(`${BASE_URL}/starships/?pilots=${id}`);
}

