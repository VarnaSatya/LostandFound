import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

var NoLogIn = () => {
  var clicked = () => {
    history.push("/");
    window.location.reload(false);
  };
  return (
    <div className="goBack">
      <h1>sign in please</h1>
      <br />
      <input
        className="back"
        type="button"
        onClick={clicked}
        value="Go to Login Page"
      />
    </div>
  );
};

export default NoLogIn;
