import { DEFAULT_GANRE } from '../../const';
import {makeFakeFilms} from '../../utils/mocks';
import { loadFilmsAction } from '../api-actions';
import { filmsData } from './films-process';
// import {
//   filmsData,
//   loadFilmsRequest,
//   loadFilmsSuccess,
//   loadFilmsError} from './films-process';

const fakeFilms = makeFakeFilms();

describe('Редьюсер: FilmsData', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(filmsData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        genre: DEFAULT_GANRE,
        films: [],
        isDataLoaded: false,
        error: null,
      });
  });

  it('должен перевести isDataLoaded в true', () => {
    const state = {
      genre: DEFAULT_GANRE,
      films: [],
      isDataLoaded: false,
      error: null,
    };
    expect(filmsData.reducer(state, { type: loadFilmsAction.pending.type }))
      .toEqual({
        genre: DEFAULT_GANRE,
        films: [],
        isDataLoaded: true,
        error: null,
      });
  });

  it('должен сохранить films в store', () => {
    const state = {
      genre: DEFAULT_GANRE,
      films: [],
      isDataLoaded: true,
      error: null,
    };
    expect(filmsData.reducer(state, { type: loadFilmsAction.fulfilled.type, payload: fakeFilms }))
      .toEqual({
        genre: DEFAULT_GANRE,
        films: fakeFilms,
        isDataLoaded: false,
        error: null,
      });
  });

  it('должен сохранить error в store', () => {
    const state = {
      genre: DEFAULT_GANRE,
      films: fakeFilms,
      isDataLoaded: false,
      error: null,
    };
    expect(filmsData.reducer(
      state,
      // loadFilmsError({error: 'Sorry cant find that!'})))
      { type: loadFilmsAction.rejected.type }))
      .toEqual({
        genre: DEFAULT_GANRE,
        films: fakeFilms,
        isDataLoaded: false,
        error: {error: 'Sorry cant find that!'},
      });
  });
});
export {};
