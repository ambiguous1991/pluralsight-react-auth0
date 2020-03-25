import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";

function App({ history }) {
  const auth = new Auth(history);
  const [isTokenRenewed, setIsTokenRenewed] = useState(false);

  useEffect(() => {
    if (!isTokenRenewed) {
      auth.renewToken(() => {
        setIsTokenRenewed(true);
      });
    }
  }, [isTokenRenewed, auth]);

  const content = (
    <AuthContext.Provider value={auth}>
      <Nav />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />
        <PrivateRoute path="/profile" component={Profile} />
        <Route
          path="/callback"
          render={props => <Callback auth={auth} {...props} />}
        />
        <Route path="/public" component={Public} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute
          path="/courses"
          component={Courses}
          scopes={["read:courses"]}
        />
      </div>
    </AuthContext.Provider>
  );

  return isTokenRenewed ? content : "Loading...";
}

export default App;
