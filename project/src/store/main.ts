import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import commonReducer from './reducer';


const store = configureStore({
  reducer: commonReducer,
// Если требуется отключить Redux DevTools.
// devTools: false,
});

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// НУЖНО БУДЕТ ЗАТИПИЗИРОВАТЬ ДВЕ НИЖНИЕ ФУНКЦИИ!!!! 1.43.28 время для видео

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
export type {State, AppDispatch};
export {
  useAppSelector,
  useAppDispatch
};
