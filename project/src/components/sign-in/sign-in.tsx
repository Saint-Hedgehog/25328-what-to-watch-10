import React from 'react';
import {useAppSelector} from '../../hooks/hooks';
import {getFetchedAuthStatus} from '../../store/change-auth-status-process/selectors';
import Footer from '../footer/footer';
import Loader from '../loader/loader';
import Logo from '../logo/logo';
import SignInForm from './sign-in-form/sign-in-form';

function SignIn() {
  const isFetching = useAppSelector(getFetchedAuthStatus);

  return (
    <Loader show={isFetching}>
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <SignInForm />
        </div>
        <Footer />
      </div>
    </Loader>
  );
}
export default React.memo(SignIn);
