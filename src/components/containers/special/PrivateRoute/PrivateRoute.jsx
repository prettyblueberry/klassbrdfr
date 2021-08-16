import * as React from "react";
import {
  Route,
  Redirect
} from 'react-router-dom';

export default function PrivateRoute ({component, isLogin, roles = [], redirectPath,  ...rest}) {
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) => isLogin === true
        ? <Component {...props} />
        : <Redirect to={{pathname: redirectPath, state: {from: props.location}}} />}
    />
  )
}