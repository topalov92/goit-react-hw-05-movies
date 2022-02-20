import React from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';

import styles from './MovieNavigation.module.css';

export default function MovieNavigation() {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div className={styles.movieDetails}>
      <div className={styles.detailsNav}>
        <h3>Additional information</h3>
        <nav className={styles.secondaryNav}>
          <NavLink
            exact
            to={{ pathname: `${url}/cast`, state: { ...location.state } }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Cast
          </NavLink>
          <NavLink
            exact
            to={{ pathname: `${url}/reviews`, state: { ...location.state } }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Reviews
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
