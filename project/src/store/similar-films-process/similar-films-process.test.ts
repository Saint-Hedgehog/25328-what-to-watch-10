import {makeFakeFilms} from '../../utils/mocks';
import { loadSimilarFilmsAction } from '../api-actions';
import { similarFilmsData } from './similar-films-process';
// import {
//   similarFilmsData,
//   loadSimilarFilmsRequest,
//   loadSimilarFilmsSuccess,
//   loadSimilarFilmsError,
// } from './similar-films-process';

const fakeFilms = makeFakeFilms();

describe('Редьюсер: SimilarFilmsData', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(similarFilmsData.reducer(undefined, { type: 'UNKNOWN_ACTION' }),)
      .toEqual({
        similarFilms: [],
        isFetching: false,
      });
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      similarFilms: [],
      isFetching: false,
    };
    expect(similarFilmsData.reducer(state, { type: loadSimilarFilmsAction.pending.type }))
      .toEqual({
        similarFilms: [],
        isFetching: true,
      });
  });

  it('должен сохранить similarFilms в store', () => {
    const state = {
      similarFilms: [],
      isFetching: true,
    };
    expect(
      similarFilmsData.reducer(state, { type: loadSimilarFilmsAction.fulfilled.type, payload: fakeFilms }))
      .toEqual({
        similarFilms: fakeFilms,
        isFetching: false,
      });
  });

  it('при возникновении ошибки isFetching становится false', () => {
    const state = {
      similarFilms: fakeFilms,
      isFetching: true,
    };
    expect(similarFilmsData.reducer(state, { type: loadSimilarFilmsAction.rejected.type }))
      .toEqual({
        similarFilms: fakeFilms,
        isFetching: false,
      });
  });
});

export {};
