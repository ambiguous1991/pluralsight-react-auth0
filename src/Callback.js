import React, { Component } from "react";

class Callback extends Component {
  componentDidMount() {
    //Handle auth if expected values in url
    console.log(this.props.location.hash);
    if (/access_token|id_token|error/.test(this.props.location)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL");
    }
  }

  render() {
    return <h1>Loading...</h1>;
  }
}

export default Callback;
