import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getFilms = (state: State) => state[NameSpace.Films].films;

export const getLoadedFilmsStatus = (state: State) =>
  state[NameSpace.Films].isDataLoaded;

export const getGenreFilms = (state: State) => state[NameSpace.Films].genre;

export const getFilmsFetchingError = (state: State) =>
  state[NameSpace.Films].error;
