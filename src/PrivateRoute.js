import React from "react";
import { Route, Redirect } from "react-router-dom";

function isLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { role } = isLogin();
  if (!role) {
    return (
      <Redirect
        to={{
          pathname: "/signin"
        }}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={props => {
        if (role === "manager" || role === "admin") {
          return <Component role={role} {...props} />;
        }
        if (role === "developer") {
          return <Component role={role} {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
