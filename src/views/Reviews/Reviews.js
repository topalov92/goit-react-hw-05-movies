import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filmsAPI } from '../../services/filmsAPI';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';

import styles from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    filmsAPI.getFilmReviews(movieId).then(setReviews);
  }, [movieId]);

  if (reviews.length === 0) {
    return (
      <p className={styles.message}>
        We don't have any reviews for this movie.
      </p>
    );
  }

  if (reviews.length > 0) {
    return (
      <ul>
        {reviews.map(({ author, content, id }) => (
          <ReviewCard key={id} author={author} content={content} />
        ))}
      </ul>
    );
  }
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
