import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filmsAPI } from '../../services/filmsAPI';
import { ActorCard } from '../../components/ActorCard/ActorCard';
import styles from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    filmsAPI.getFilmCast(movieId).then(setCast);
  }, [movieId]);
  return (
    <ul className={styles.castList}>
      {cast.map(({ profile_path, character, id, name }) => (
        <ActorCard
          key={id}
          profilePath={profile_path}
          name={name}
          character={character}
        />
      ))}
    </ul>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
