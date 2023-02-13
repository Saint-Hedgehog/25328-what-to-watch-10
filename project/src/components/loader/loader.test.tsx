import { render, screen } from '@testing-library/react';
import ListFilms from '../main-page/films-catalog/films-list/films-list';
import GenreList from '../main-page/films-catalog/genre-list/genre-list';
import Loader from './loader';

const error = 'error';

describe('Компонент: Loader', () => {
  it('должен отображать ошибку', () => {
    const isDataLoaded = false;

    render(
      <Loader show={isDataLoaded}>
        {!error ? (
          <>
            <GenreList />
            <ListFilms />
          </>
        ) : (
          <p>Data loading error</p>
        )}
      </Loader>
    );

    expect(screen.getByText(/Data loading error/i)).toBeInTheDocument();
  });

  it('должен отображать контент', () => {
    const isDataLoaded = true;

    render(
      <Loader show={isDataLoaded}>
        {!error ? (
          <>
            <GenreList />
            <ListFilms />
          </>
        ) : (
          <p>Data loading error</p>
        )}
      </Loader>
    );

    expect(screen.queryByText(/Data loading error/i)).not.toBeInTheDocument();
  });
});
