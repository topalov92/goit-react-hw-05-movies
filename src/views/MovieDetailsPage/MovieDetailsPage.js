import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import API from '../../services/filmsAPI';
import { HiChevronDoubleLeft } from 'react-icons/hi';

import Spinner from '../../components/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../MovieDetailsPage/MovieDetails.module.css';

const Cast = lazy(() =>
  import('../../components/Cast/Cast.js' /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import(
    '../../components/Reviews/Reviews.js' /* webpackChunkName: "reviews" */
  )
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesById();
  }, [movieId]);

  const fetchMoviesById = () => {
    setLoader(true);

    API.fetchMoviesById(movieId)
      .then(film => setFilm(film))

      .catch(error => {
        toast('Trouble. Something is wrong :(');
        setError(error);
      })

      .finally(() => setLoader(false));
  };

  const onGoBack = () => history.push(location?.state?.from || '/films');

  return (
    <>
      {error && (
        <p className={styles.notification}>Sorry. Something is wrong.</p>
      )}
      {loader && <Spinner />}
      {film && (
        <button type="button" className={styles.onGoBackBtn} onClick={onGoBack}>
          <HiChevronDoubleLeft /> GO Back
        </button>
      )}
      {film && (
        <>
          <div className={styles.mainInfo}>
            <div className={styles.imgContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                alt={film.original_title}
              />
            </div>

            <div className={styles.descriptionContainer}>
              <h1 className={styles.filmTitle}>{film.original_title}</h1>
              <p className={styles.userScore}>
                User Score: {film.vote_average * 10}%
              </p>

              <h2 className={styles.overviewTitle}>Overview</h2>
              <p className={styles.overview}>{film.overview}</p>

              <h3 className={styles.genresTitle}>Genres</h3>
              <ul className={styles.genresList}>
                {film.genres.map(genre => (
                  <li className={styles.genreItem} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className={styles.additionalTitle}>Additional information</h3>
            <ul className={styles.additionalList}>
              <li className={styles.additionalItem}>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.activeLink}
                  to={`${url}/cast`}
                >
                  Cast
                </NavLink>
              </li>
              <li className={styles.additionalItem}>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.activeLink}
                  to={`${url}/reviews`}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<Spinner />}>
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${path}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
          <ToastContainer />
        </>
      )}
    </>
  );
}
