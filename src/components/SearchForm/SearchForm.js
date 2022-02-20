import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    const value = query.trim();

    if (value === '') {
      return;
    }
    onSubmit(value);

    setQuery('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        placeholder="Search film"
        value={query}
        onChange={handleNameChange}
      ></input>
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

// SearchForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
