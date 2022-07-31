import {createAction} from '@reduxjs/toolkit';
import {FiltersHash} from '../components/utils/const';

const INITIAL_VISIBLE_FILMS = 'INITIAL_VISIBLE_FILMS';
const INC_VISIBLE_FILMS = 'INC_VISIBLE_MOVIES';

const setGenresStateAction = createAction(FiltersHash.All, (value) => ({
  payload: value,
}));
const setInitialVisibleFilmsState = createAction(INITIAL_VISIBLE_FILMS);
const setIncVisibleFilmsState = createAction(INC_VISIBLE_FILMS);

export {
  setGenresStateAction,
  setInitialVisibleFilmsState,
  setIncVisibleFilmsState
};
