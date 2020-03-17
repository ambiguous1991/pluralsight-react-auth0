import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./auth/Auth";

function App({ history }) {
  const auth = new Auth(history);

  return (
    <>
      <Nav />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...[props]} />}
        />
        <Route path="/profile" exact component={Profile} />
      </div>
    </>
  );
}

export default App;
