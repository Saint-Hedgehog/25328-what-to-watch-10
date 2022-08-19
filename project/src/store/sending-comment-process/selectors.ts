import {NameSpace } from '../../const';
import {State} from '../../types/state';

export const getLoadedSendingCommentData = (state: State) =>
  state[NameSpace.SendingComment].isFetching;

export const getSendingCommentError = (state: State) =>
  state[NameSpace.SendingComment].error;

export const getCommentSendingStatus = (state: State) =>
  state[NameSpace.SendingComment].commentSendingStatus;
