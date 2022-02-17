const API_KEY = '55736409f5cc5d2db6ffd5ffaed9fcf9';
const BASE_URL = 'https://api.themoviedb.org';

export function fetchMovies() {
  return fetch(
    `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=1`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

export function fetchMoviesById(movieId) {
  return fetch(
    `${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

export function fetchMoviesBySearch(query) {
  return fetch(
    `${BASE_URL}/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&query=${query}&page=1`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

export function fetchMovieCast(movieId) {
  return fetch(
    `${BASE_URL}/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

export function fetchMovieReviews(movieId) {
  return fetch(
    `${BASE_URL}/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

const API = {
  fetchMovies,
  fetchMoviesById,
  fetchMoviesBySearch,
  fetchMovieCast,
  fetchMovieReviews,
};

export default API;
