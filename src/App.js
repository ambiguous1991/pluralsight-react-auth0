import React from "react";
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
        <PrivateRoute auth={auth} path="/profile" component={Profile} />
        <Route
          path="/callback"
          render={props => <Callback auth={auth} {...props} />}
        />
        <Route path="/public" component={Public} />
        <PrivateRoute auth={auth} path="/private" component={Private} />
        <PrivateRoute
          auth={auth}
          path="/courses"
          component={Courses}
          scopes={["read:courses"]}
        />
      </div>
    </>
  );
}

export default App;
