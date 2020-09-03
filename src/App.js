import React from "react";
import { ProfileProvider } from "./context/profile.context";
// import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.scss";

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute exact path="/signin">
          <SignIn />
        </PublicRoute>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
