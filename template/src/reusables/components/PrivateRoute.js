import Loading from './Loading';

import { Redirect } from 'react-router-dom';
import { isValidElement } from 'react';

export default function PrivateRoute(props) {
  const { authenticated, redirectObj = null, children, ...rest } = props;
  const { location } = rest;

  if (redirectObj) {
    const redirectTo = { from: location, ...redirectObj };
    return <Redirect to={redirectTo} />;
  }

  return (
    <Route {...rest}>
      {authenticated && isValidElement(children) && children}
      {!authenticated && <Loading fullscreen={true} />}
    </Route>
  );
}
