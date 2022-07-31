import { setIncVisibleFilmsState } from '../../../../../store/actions';
import { useAppDispatch } from '../../../../../store/main';

const ShowMoreButtonElement = () => {
  const dispatch = useAppDispatch();

  const handleShowMoreButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setIncVisibleFilmsState());
  };

  return (
    <div className="catalog__more">
      <button onClick={handleShowMoreButtonClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

export default ShowMoreButtonElement;
