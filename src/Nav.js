import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

class Nav extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ isAuthenticated, login, logout, userHasScopes }) => (
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/public">Public</Link>
              </li>
              {isAuthenticated() && (
                <li>
                  <Link to="/private">Private</Link>
                </li>
              )}
              {isAuthenticated() && userHasScopes(["read:courses"]) && (
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
              )}
              <li>
                <button onClick={isAuthenticated() ? logout : login}>
                  {isAuthenticated() ? "Log out" : "Log in"}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Nav;
