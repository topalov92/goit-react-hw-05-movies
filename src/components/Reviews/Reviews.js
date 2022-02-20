import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/filmsAPI';
import styles from './Reviews.module.css';
import Spinner from '../../components/Spinner/Spinner';

export default function Reviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const fetchMovieReviews = () => {
    setLoader(true);

    API.fetchMovieReviews(movieId)
      .then(({ results }) => setReviews(results))

      .catch(error => {
        setError(error);
      })

      .finally(() => setLoader(false));
  };

  return (
    <>
      {error && (
        <p className={styles.notification}>Sorry. Something is wrong.</p>
      )}
      {loader && <Spinner />}
      {reviews.length < 0 ? (
        <div className={styles.reviews}>
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.item}>
                <span>Author: {author}</span>
                <p className={styles.content}> {content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
}
