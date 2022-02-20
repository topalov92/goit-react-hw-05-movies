import React, { useState, useEffect } from 'react';
import API from '../../services/filmsAPI';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import FilmList from '../../components/FilmList/FilmList';
import Spinner from '../../components/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [movies, setFilms] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchMoviesBySearch();
  }, [query]);

  useEffect(() => {
    const queryBySearch =
      new URLSearchParams(location.search).get('query') ?? '';
    if (queryBySearch) {
      setQuery(queryBySearch);
    }
  }, [history, location]);

  const onSearchQuery = queryBySearch => {
    setFilms([]);
    setQuery(queryBySearch);
  };

  const fetchMoviesBySearch = () => {
    setLoader(true);

    API.fetchMoviesBySearch(query)
      .then(({ results }) => setFilms(results))
      .then(
        history.push({
          ...location,
          search: `query=${query}`,
        })
      )

      .catch(error => {
        toast('Trouble. Something is wrong!');
        setError(error);
      })

      .finally(() => setLoader(false));
  };

  return (
    <>
      {error && <p>Sorry. Something is wrong.</p>}
      {loader && <Spinner />}
      {<SearchForm onSubmit={onSearchQuery} />}
      {movies && <FilmList movies={movies} />}
      <ToastContainer />
    </>
  );
}
