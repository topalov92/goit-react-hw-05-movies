import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import API from '../../services/filmsAPI';
import { HiChevronDoubleLeft } from 'react-icons/hi';

import Spinner from '../../components/Spinner/Spinner';
import MoviePreview from '../../components/MoviePreview/MoviePreview';
import MovieNavigation from '../../components/MovieNavigation/MovieNavigation';
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
  const { movieId } = useParams();
  const { path } = useRouteMatch();

  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesById();
  }, [movieId]);

  const fetchMoviesById = () => {
    setLoader(true);

    API.fetchMoviesById(movieId)
      .then(movie => setMovie(movie))

      .catch(error => {
        toast('Trouble. Something is wrong :(');
        setError(error);
      })

      .finally(() => setLoader(false));
  };

  const onGoBack = () => history.push(location?.state?.from || '/movies');

  return (
    <>
      {error && (
        <p className={styles.notification}>Sorry. Something is wrong.</p>
      )}
      {loader && <Spinner />}
      {movie && (
        <button type="button" className={styles.onGoBackBtn} onClick={onGoBack}>
          <HiChevronDoubleLeft /> GO Back
        </button>
      )}
      {movie && <MoviePreview movie={movie} />}
      {movie && <MovieNavigation />}

      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={`${path}/cast`} exact>
            <Cast />
          </Route>

          <Route path={`${path}/reviews`} exact>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
}
