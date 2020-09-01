import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...props }) => {
  const profile = true;

  if (profile) {
    return <Redirect to="/" />;
  }

  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
