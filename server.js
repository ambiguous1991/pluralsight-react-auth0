const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API"
  });
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private API"
  });
});

app.get("/courses", checkJwt, checkScope(["read:courses"]), function(req, res) {
  res.json({
    courses: [
      { id: 1, title: "some course title" },
      { id: 2, title: "another course title" }
    ]
  });
});

app.listen(3001);

console.log(app);
console.log("Server listens on " + process.env.REACT_APP_API_URL);
