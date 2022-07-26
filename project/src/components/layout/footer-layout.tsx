import Logo from '../logo/logo';

function FooterElement() {
  return (
    <footer className="page-footer">
      <Logo isInFooter/>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default FooterElement;
