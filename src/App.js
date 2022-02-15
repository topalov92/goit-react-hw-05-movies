import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './components/Container/Container';
import Spinner from './components/Spinner/Spinner';
import { Header } from './components/Header/Header';

const HomePage = lazy(() =>
  import(
    './views/HomePage/HomePage.js'
    /* webpackChunkName: "home-page" */
  )
);
const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.js'
    /* webpackChunkName: "movies-page" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js'
    /* webpackChunkName: "movies-details-page" */
  )
);

export default function App() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
