import {Navigate, RouteProps, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {getAuthorizationStatus} from '../../store/change-auth-status-process/selectors';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} state={{prevRoute: location.pathname}} />
  );
}

export default PrivateRoute;
