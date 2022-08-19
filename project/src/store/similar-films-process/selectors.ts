import {NameSpace } from '../../const';
import {Film} from '../../types/film';
import {State} from '../../types/state';

export const getSimilarFilms = (state: State): Film[] | [] =>
  state[NameSpace.Similar].similarFilms;
