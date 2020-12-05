import React from "react";
import { SectionTilesProps } from "../../utils/SectionProps";
import "./App.css";
import ReactDOM from "react-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import Button from "../elements/Button";

class Nav extends React.Component {
  render() {
    var logout = () => {
      console.log("LOGOUT");
      axios
        .delete("/signedin")
        .then((res) => console.log("Logged out succesfully"))
        .catch((err) => console.log("Error while signing out- " + err));
    };
    return (
      <div className="topnav">
        <a className="active" href="#home">
          Home
        </a>
        <div className="topnav-right">
          <a href="http://localhost:3000/removeitem">REMOVE A FOUND ITEM</a>
          <a href="http://localhost:3000/submittingitem">SUBMIT A FOUND ITEM</a>
          <a href="http://localhost:3000" onClick={logout}>
            LOGOUT
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
