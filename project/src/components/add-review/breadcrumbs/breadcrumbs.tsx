import {Link} from 'react-router-dom';
import {AppRoute, TabNames} from '../../../const';
import {Film} from '../../../types/film';

type Props = {
  film: Film;
};

const Breadcrumbs = ({film}: Props) => {
  const {id, name} = film;
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.Film}/${id}${TabNames.Overview}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <div className="breadcrumbs__link">Add review</div>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
