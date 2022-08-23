import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {createAPI} from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>{
    const defaultArray = getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false
    });
    return defaultArray;
  },
});
