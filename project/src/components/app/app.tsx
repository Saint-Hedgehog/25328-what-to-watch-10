import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {checkAuthAction, loadFilmsAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/hooks';
import {store} from '../../store/store';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Movie from '../movie/movie';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../../hocs/private-route/private-route';

store.dispatch(checkAuthAction());

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFilmsAction());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.SignIn} element={<SignIn />} />
      <Route path={AppRoute.MyList} element={
        <PrivateRoute>
          <MyList />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Film}>
        <Route path={AppRoute.DefaultFilm} element={<Movie />} />
        <Route path={AppRoute.DefaultAddReview} element={
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        }
        />
      </Route>
      <Route path={AppRoute.DefaultVideoPlayer} element={<Player />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
