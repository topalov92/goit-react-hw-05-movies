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
  const [searchQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchMoviesBySearch();
  }, [searchQuery]);

  useEffect(() => {
    const queryBySearch =
      new URLSearchParams(location.search).get('searchQuery') ?? '';
    if (queryBySearch) {
      setSearchQuery(queryBySearch);
    }
  }, [history, location]);

  const onSearchQuery = queryBySearch => {
    setFilms([]);
    setSearchQuery(queryBySearch);
  };

  const fetchMoviesBySearch = () => {
    setLoader(true);

    API.fetchMoviesBySearch(searchQuery)
      .then(({ results }) => setFilms(results))
      .then(
        history.push({
          ...location,
          search: `query=${searchQuery}`,
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
      {films && <FilmList movies={films} />}
      <ToastContainer />
    </>
  );
}
