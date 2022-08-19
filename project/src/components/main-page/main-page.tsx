import FilmsCatalog from './films-catalog/films-catalog';
import Footer from '../footer/footer';
import PromoFilm from '../promo-film/promo-film';

function MainPage() {
  return (
    <>
      <PromoFilm />
      <div className="page-content">
        <FilmsCatalog />
        <Footer />
      </div>
    </>
  );
}
export default MainPage;
