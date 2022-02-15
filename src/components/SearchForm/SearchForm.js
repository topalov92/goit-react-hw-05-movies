import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const value = searchQuery.trim();

    if (value === '') {
      return;
    }
    onSubmit(value);

    setSearchQuery('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        placeholder="Search film"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      ></input>
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
