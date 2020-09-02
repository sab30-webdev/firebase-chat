import React from "react";
import { ProfileProvider } from "./context/profile.context";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { Switch } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.scss";

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute exact path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
