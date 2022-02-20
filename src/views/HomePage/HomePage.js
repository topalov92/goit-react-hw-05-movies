import React, { useState, useEffect } from 'react';
import API from '../../services/filmsAPI';
import FilmList from '../../components/FilmList/FilmList';
import styles from '../HomePage/HomePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner/Spinner';

export default function HomePage() {
  const [movies, setFilms] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setLoader(true);

    API.fetchMovies()
      .then(({ results }) => setFilms(results))

      .catch(error => {
        toast('Trouble. Something is wrong');
        setError(error);
      })

      .finally(() => setLoader(false));
  };

  return (
    <>
      {error && (
        <p className={styles.notification}>Sorry. Something is wrong.</p>
      )}
      {loader && <Spinner />}
      {movies && (
        <>
          <h2 className={styles.mainTitle}>Top of this week</h2>{' '}
          <FilmList movies={movies} />
          <ToastContainer />
        </>
      )}
    </>
  );
}
