import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActorCard.module.css';

export const ActorCard = ({ profilePath, character, name }) => {
  return (
    <li className={styles.actorCard}>
      <div className={styles.actorPhoto}>
        <img src={`https://image.tmdb.org/t/p/w200${profilePath}`} alt={name} />
      </div>
      <h3 className={styles.actorName}>{name}</h3>
      <p className={styles.actorCharacter}>{character}</p>
    </li>
  );
};

ActorCard.propTypes = {
  profilePath: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};
