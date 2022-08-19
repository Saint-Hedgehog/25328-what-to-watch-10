import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getFavoriteFilms = (state: State) =>
  state[NameSpace.Favorite].films;

export const getLoadedFavoriteFilmsStatus = (state: State) =>
  state[NameSpace.Favorite].isFetching;

export const getErrorFavoriteFilms = (state: State) =>
  state[NameSpace.Favorite].error;

export const getFavoriteFilmsLength = (state: State) =>
  state[NameSpace.Favorite].films.length;

