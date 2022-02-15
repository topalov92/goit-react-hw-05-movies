import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { filmsAPI } from '../../services/filmsAPI';
import { HiChevronDoubleLeft } from 'react-icons/hi';

import Spinner from '../../components/Spinner/Spinner';
import styles from './MovieDetails.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    filmsAPI.getFilmInfo(movieId).then(setFilm);
  }, [movieId]);

  const onGoBack = () => history.push(location?.state?.from ?? '/');

  return (
    <>
      <button type="button" className={styles.onGoBackBtn} onClick={onGoBack}>
        <HiChevronDoubleLeft /> GO Back
      </button>

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
        </>
      )}
    </>
  );
}
