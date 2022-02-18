import React from 'react';
import styles from './FilmList.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FilmList({ films }) {
  const location = useLocation();
  return (
    <ul className={styles.filmList}>
      {films.map(({ id, title, name }) => (
        <li className={styles.filmItem} key={id}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location, label: 'Back to the list' },
            }}
            className={styles.link}
          >
            {title ? title : name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default FilmList;
