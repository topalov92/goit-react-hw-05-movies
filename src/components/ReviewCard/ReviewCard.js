import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewCard.module.css';

export const ReviewCard = ({ author, content }) => {
  return (
    <li className={styles.reviewCard}>
      <h3 className={styles.author}>Author: {author}</h3>
      <p className={styles.content}>{content}</p>
    </li>
  );
};

ReviewCard.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
