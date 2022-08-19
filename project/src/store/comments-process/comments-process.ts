import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentsData} from '../../types/state';

const initialState: CommentsData = {
  comments: [],
  isFetching: false,
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    loadCommentsRequest: (state) => {
      state.isFetching = true;
    },
    loadCommentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.isFetching = false;
    },
    loadCommentsError: (state) => {
      state.isFetching = false;
    },
  },
});

export const {
  loadCommentsSuccess,
  loadCommentsRequest,
  loadCommentsError
} = commentsData.actions;
