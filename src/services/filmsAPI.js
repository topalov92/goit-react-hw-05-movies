import axios from 'axios';

const API_KEY = '55736409f5cc5d2db6ffd5ffaed9fcf9';

const getPopularFilms = () => {
  return axios
    .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
    .then(res => res.data.results);
};

const getFilmByName = searchQuery => {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=1&include_adult=false`
    )
    .then(res => res.data.results);
};

const getFilmInfo = filmId => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}`)
    .then(res => res.data);
};

const getFilmCast = filmId => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${API_KEY}`
    )
    .then(res => res.data.cast);
};

const getFilmReviews = filmId => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=${API_KEY}`
    )
    .then(res => res.data.results);
};

export const filmsAPI = {
  getFilmByName,
  getFilmCast,
  getPopularFilms,
  getFilmInfo,
  getFilmReviews,
};
