import {makeFakeFilm} from '../../utils/mocks';
import {
  loadPromoFilmRequest,
  loadPromoFilmSuccess,
  loadPromoFilmError,
  promoFilmData
} from './promo-film-process';

const fakeFilm = makeFakeFilm(1);

describe('Редьюсер: PromoFilmData', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(promoFilmData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        film: null,
        isFetching: false,
        error: null,
      });
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      film: null,
      isFetching: false,
      error: null,
    };
    expect(promoFilmData.reducer(state, loadPromoFilmRequest()))
      .toEqual({
        film: null,
        isFetching: true,
        error: null,
      });
  });

  it('должен сохранить promoFilm в store', () => {
    const state = {
      film: null,
      isFetching: true,
      error: null,
    };
    expect(
      promoFilmData.reducer(state, loadPromoFilmSuccess(fakeFilm)))
      .toEqual({
        film: fakeFilm,
        isFetching: false,
        error: null,
      });
  });

  it('должен сохранить error в store', () => {
    const state = {
      film: fakeFilm,
      isFetching: false,
      error: null,
    };
    expect(
      promoFilmData.reducer(
        state,
        loadPromoFilmError({error: 'Sorry cant find that!'})))
      .toEqual({
        film: fakeFilm,
        isFetching: false,
        error: {error: 'Sorry cant find that!'},
      });
  });
});

export {};
