import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function MyListLink() {
  return (
    <Link to={AppRoute.SignIn} className="btn btn--list film-card__button" >
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">0</span>
    </Link>
  );
}

export default React.memo(MyListLink);
