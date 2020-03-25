import React from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./auth/Auth";
import Callback from "./Callback";
import Public from "./Public";

function App({ history }) {
  const auth = new Auth(history);

  return (
    <>
      <Nav auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={props =>
            auth.isAuthenticated() ? (
              <Profile auth={auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/callback"
          render={props => <Callback auth={auth} {...props} />}
        />
        <Route path="/public" component={Public} />
      </div>
    </>
  );
}

export default App;
