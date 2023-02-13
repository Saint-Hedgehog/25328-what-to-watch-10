import React, { MouseEventHandler } from 'react';

type Props = {
  handleFavoriteButtonClick: MouseEventHandler<HTMLButtonElement>,
  isFavorite: boolean,
  favoriteFilmsLength: number
}

function MyListBtn({handleFavoriteButtonClick, isFavorite, favoriteFilmsLength}: Props) {
  return (
    <button
      onClick={handleFavoriteButtonClick}
      className="btn btn--list film-card__button"
      type="button"
    >
      {isFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      )}
      <span>My list</span>
      <span className="film-card__count">{favoriteFilmsLength}</span>
    </button>
  );
}

export default React.memo(MyListBtn);
