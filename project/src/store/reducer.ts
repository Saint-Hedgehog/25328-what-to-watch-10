import {createReducer} from '@reduxjs/toolkit';
import {InitialStateType} from '../types/types';
import {VISIBLE_FILMS_STEP_COUNT} from '../components/utils/const';
import {setGenresStateAction, setInitialVisibleFilmsState, setIncVisibleFilmsState} from './actions';

const initialeState: InitialStateType = {
  selectedGenre: '',
  visibleFilms: 0,
};

const commonReducer = createReducer(initialeState, (builder) => {
  builder
    .addCase(setGenresStateAction, (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(setInitialVisibleFilmsState, (state) => {
      state.visibleFilms = VISIBLE_FILMS_STEP_COUNT;
    })
    .addCase(setIncVisibleFilmsState, (state) => {
      state.visibleFilms += VISIBLE_FILMS_STEP_COUNT;
    });
});

export default commonReducer;
