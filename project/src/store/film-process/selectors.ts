import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getFilm = (state: State) => state[NameSpace.Film].film;

export const getFetchedFilmStatus = (state: State) =>
  state[NameSpace.Film].isFetching;

export const getError = (state: State) => state[NameSpace.Film].error;

export const getFilmStatus = (state: State) => state[NameSpace.Film].film?.isFavorite;
