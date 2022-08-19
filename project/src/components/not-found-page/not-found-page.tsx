import Footer from '../footer/footer';
import Logo from '../logo/logo';

const NotFoundPage = () => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <Logo/>
    </header>

    <div className="sign-in user-page__content">
      <div className="sign-in__message">
        <h1>404&ensp;
          <small>Page not found</small>
        </h1>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFoundPage;
