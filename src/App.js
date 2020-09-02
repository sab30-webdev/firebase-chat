import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.scss";

function App() {
  return (
    <Switch>
      <PublicRoute exact path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
