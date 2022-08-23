import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getComments = (state: State) => state[NameSpace.Comments].comments;

export const getFetchedCommentsStatus = (state: State) =>
  state[NameSpace.Comments].isFetching;
