import React from 'react';

import styles from './MoviePreview.module.css';

function MoviePreview({ movie }) {
  const photo = 'https://image.tmdb.org/t/p/w500';
  const defaultPhoto =
    'data:image/png;base64,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';
  const { title, poster_path, overview, genres, release_date, vote_average } =
    movie;

  return (
    <div className={styles.movie}>
      <div>
        {poster_path ? (
          <img
            src={`${photo}${poster_path}`}
            alt={title}
            className={styles.image}
          />
        ) : (
          <img src={defaultPhoto} alt="" className={styles.image} />
        )}
      </div>
      <div className={styles.movieOverview}>
        <h2>
          {title} {''}
          {release_date ? (
            <span>({release_date.substring(0, 4)})</span>
          ) : (
            <span>No results</span>
          )}
        </h2>
        <span>User score: {vote_average && vote_average * 10} % </span>
        <h3>Overview</h3>
        <p className={styles.overview}>{overview}</p>
        <div>
          <h3>Genres</h3>
          {genres && (
            <ul className={styles.list}>
              {genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePreview;
