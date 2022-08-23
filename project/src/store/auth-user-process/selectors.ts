import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getUser = (state: State) => state[NameSpace.User].user;

export const getUserError = (state: State) => state[NameSpace.User].error;

export const getFetchedUser = (state: State) => state[NameSpace.User].isFetching;
