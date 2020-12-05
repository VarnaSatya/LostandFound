import React from "react";
// import sections
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";
import DropDown from "../components/sections/DropDown";
import Nav from "../components/sections/nav";
import axios from "axios";
import ReactDOM from "react-dom";
import "./mystyles.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

var element;

function isthere() {
  axios
    .get("/signedin")
    .then((response) => {
      element = response.data.user;
      console.log("From home " + response.data.user);
      element = response.data.user;
    })
    .catch((err) => console.log("error at home"));
}

function LoggedIn() {
  return (
    <>
      <Nav />
      <DropDown />
      <FeaturesTiles />
    </>
  );
}

function NoLogIn() {
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
}

const Home = () => {
  return <Ret />;
};

class Ret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: "",
    };
  }
  componentDidMount = () => {
    this.getItem();
  };
  getItem = async () => {
    axios
      .get("/signedin")
      .then((response) => {
        element = response.data.user;
        console.log("From home " + response.data.user);
        element = response.data.user;
        console.log("element " + element);
        if (element == "-") this.setState({ element: "false" });
        else this.setState({ element: "true" });
        this.forceUpdate();
      })
      .catch((err) => console.log("error at home"));
  };
  render() {
    if (this.state.element === "true") {
      return <LoggedIn />;
    } else {
      return <NoLogIn />;
    }
  }
}

export default Home;
