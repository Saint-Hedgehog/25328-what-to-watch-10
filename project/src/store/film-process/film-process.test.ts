import errorHandle from '../../services/error-handle';
import {makeFakeFilm} from '../../utils/mocks';
import { loadFilmByIdAction } from '../api-actions';
import { filmData, resetError } from './film-process';
// import {
//   filmData,
//   loadFilmByIdRequest,
//   loadFilmByIdSuccess,
//   loadFilmByIdError,
//   resetError
// } from './film-process';

const fakeFilm = makeFakeFilm(1);

describe('Редьюсер: FilmData', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(filmData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
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

    expect(filmData.reducer(state, { type: loadFilmByIdAction.pending.type }))
      .toEqual({
        film: null,
        isFetching: true,
        error: null,
      });
  });

  it('должен сохранить film в store', () => {
    const state = {
      film: null,
      isFetching: true,
      error: null,
    };
    expect(filmData.reducer(state, { type: loadFilmByIdAction.fulfilled.type, payload: fakeFilm }))
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
      filmData.reducer(state, { type: loadFilmByIdAction.rejected.type, payload: 'Sorry cant find that!'}))
      .toEqual({
        film: fakeFilm,
        isFetching: false,
        error: { error: 'Sorry cant find that!' },//???
      });

    const spy = jest.mock('../../services/error-handle');
    expect(spy).toHaveBeenCalled();
  });

  it('должен перевести error в null', () => {
    const state = {
      film: null,
      isFetching: false,
      error: {
        message: 'Request failed with status code 404',
        name: 'Error'
      },
    };
    expect(filmData.reducer(state, resetError()))
      .toEqual({
        film: null,
        isFetching: false,
        error: null,
      });
  });
});

export {};
