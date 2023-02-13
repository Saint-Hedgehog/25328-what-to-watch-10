import {makeFakeFilms} from '../../utils/mocks';
import { changeFavoriteFilmStatusAction, loadFavoriteFilmsAction } from '../api-actions';
import { myFavoriteFilmsProcess } from './my-favorite-film-process';
// import {
//   myFavoriteFilmsProcess,
//   loadFavoriteFilmsRequest,
//   loadFavoriteFilmsSuccess,
//   loadFavoriteFilmsError,
//   changeFavoriteFilmRequest,
//   changeFavoriteFilmSuccess,
//   changeFavoriteFilmError
// } from './my-favorite-film-process';

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
      myFavoriteFilmsProcess.reducer(state, { type: loadFavoriteFilmsAction.pending.type }))
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
      myFavoriteFilmsProcess.reducer(state, { type: loadFavoriteFilmsAction.fulfilled.type, payload: fakeFilms }))
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
      myFavoriteFilmsProcess.reducer(state, { type: loadFavoriteFilmsAction.rejected.type }))
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
      myFavoriteFilmsProcess.reducer(state, { type: changeFavoriteFilmStatusAction.pending.type }))
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
      myFavoriteFilmsProcess.reducer(state, { type: changeFavoriteFilmStatusAction.fulfilled.type }))
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
      myFavoriteFilmsProcess.reducer(state, { type: changeFavoriteFilmStatusAction.rejected.type }))
      .toEqual({
        films: fakeFilms,
        isFetching: false,
        error: null,
      });
  });
});
