import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getPromoFilm = (state: State) => state[NameSpace.PromoFilm].film;

export const getLoadedPromoFilmStatus = (state: State) =>
  state[NameSpace.PromoFilm].isFetching;

export const getErrorPromoFilm = (state: State) =>
  state[NameSpace.PromoFilm].error;
