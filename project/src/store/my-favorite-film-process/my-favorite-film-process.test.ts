import {makeFakeFilms} from '../../utils/mocks';
import {
  myFavoriteFilmsProcess,
  loadFavoriteFilmsRequest,
  loadFavoriteFilmsSuccess,
  loadFavoriteFilmsError,
  changeFavoriteFilmRequest,
  changeFavoriteFilmSuccess,
  changeFavoriteFilmError
} from './my-favorite-film-process';

const fakeFilms = makeFakeFilms();

describe('Редьюсер: MyFavoriteFilmsData', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(
      myFavoriteFilmsProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        films: [],
        isFetching: false,
        error: null,
      });
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      films: [],
      isFetching: false,
      error: null,
    };
    expect(
      myFavoriteFilmsProcess.reducer(state, loadFavoriteFilmsRequest()))
      .toEqual({
        films: [],
        isFetching: true,
        error: null,
      });
  });

  it('должен сохранить film в store', () => {
    const state = {
      films: [],
      isFetching: true,
      error: null,
    };
    expect(
      myFavoriteFilmsProcess.reducer(state, loadFavoriteFilmsSuccess(fakeFilms)))
      .toEqual({
        films: fakeFilms,
        isFetching: false,
        error: null,
      });
  });

  it('должен перевести isFetching в false', () => {
    const state = {
      films: fakeFilms,
      isFetching: true,
      error: null,
    };
    expect(
      myFavoriteFilmsProcess.reducer(state, loadFavoriteFilmsError()))
      .toEqual({
        films: fakeFilms,
        isFetching: false,
        error: null,
      });
  });

  it('должен перевести isFetching в true при изменении жанра', () => {
    const state = {
      films: fakeFilms,
      isFetching: false,
      error: null,
    };
    expect(
      myFavoriteFilmsProcess.reducer(state, changeFavoriteFilmRequest()))
      .toEqual({
        films: fakeFilms,
        isFetching: true,
        error: null,
      });
  });

  it('должен перевести isFetching в false при успешном изменении жанра', () => {
    const state = {
      films: fakeFilms,
      isFetching: true,
      error: null,
    };
    expect(
      myFavoriteFilmsProcess.reducer(state, changeFavoriteFilmSuccess()))
      .toEqual({
        films: fakeFilms,
        isFetching: false,
        error: null,
      });
  });

  it('должен перевести isFetching в false при ошибке', () => {
    const state = {
      films: fakeFilms,
      isFetching: true,
      error: null,
    };
    expect(
      myFavoriteFilmsProcess.reducer(state, changeFavoriteFilmError()))
      .toEqual({
        films: fakeFilms,
        isFetching: false,
        error: null,
      });
  });
});
