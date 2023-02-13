import classNames from 'classnames';
import React from 'react';

import {Link, useLocation} from 'react-router-dom';

type Props = {
  isFooter?: boolean;
};

function Logo({isFooter}: Props) {
  const location = useLocation();
  const isBaseName = location.pathname.length === 1;
  const linkClass = classNames('logo__link', {
    'logo__link--light': isFooter,
  });

  return (
    <div className="logo">
      {isBaseName ? (
        <Link to='/' title='/main' style={{pointerEvents: 'none'}} className={linkClass}>
          <span
            className="logo__letter logo__letter--1"
            data-testid="logo-letter-1"
          >
            W
          </span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      ) : (
        <Link to="/" title='/main' className={linkClass}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      )}
    </div>
  );
}

export default React.memo(Logo);
