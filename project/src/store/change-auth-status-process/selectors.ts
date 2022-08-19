import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.Auth].authorizationStatus;

export const getFetchedAuthStatus = (state: State) =>
  state[NameSpace.Auth].isFetching;
