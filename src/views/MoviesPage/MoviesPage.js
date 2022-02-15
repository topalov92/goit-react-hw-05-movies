import React, { useState, useEffect } from 'react';
import { filmsAPI } from '../../services/filmsAPI';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { FilmList } from '../../components/FilmList/FilmList';

export default function MoviesPage() {
  const parsedFilms = JSON.parse(localStorage.getItem('films'));

  const [searchQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState(parsedFilms ?? []);

  const handleFilmSubmit = searchQuery => {
    setFilms([]);
    setSearchQuery(searchQuery.toLowerCase().trim());
  };

  useEffect(() => {
    fetchFilms();
  }, [searchQuery]);

  useEffect(() => {
    if (films.length) {
      localStorage.setItem('films', JSON.stringify(films));
    }
  }, [films]);

  useEffect(() => {
    if (parsedFilms?.length >= 1) {
      setFilms(parsedFilms);
    }
  }, []);

  const fetchFilms = () => {
    if (!searchQuery) {
      return;
    }
    filmsAPI.getFilmByName(searchQuery).then(setFilms);
  };

  return (
    <>
      <SearchForm onSubmit={handleFilmSubmit} />
      <FilmList films={films} />
    </>
  );
}
