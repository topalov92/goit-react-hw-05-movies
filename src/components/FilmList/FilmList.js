import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilmList.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export const FilmList = ({ films }) => {
  const location = useLocation();
  return (
    <ul className={styles.filmList}>
      {films.map(({ id, title, name }) => (
        <li className={styles.filmItem} key={id}>
          <NavLink
            to={{
              pathname: `/movies/${id}`,
              state: { from: location, label: 'Back to the list' },
            }}
            className={styles.link}
          >
            {title ? title : name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

FilmList.propTypes = {
  films: PropTypes.array.isRequired,
};
