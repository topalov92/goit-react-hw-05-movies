import React, { useState, useEffect } from 'react';
import { filmsAPI } from '../../services/filmsAPI';
import { FilmList } from '../../components/FilmList/FilmList';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    filmsAPI.getPopularFilms().then(setFilms);
  }, []);

  return (
    <>
      <h1 className={styles.mainTitle}>Top of this week </h1>
      <FilmList films={films} />
    </>
  );
}
