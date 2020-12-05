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
        <a href="http://localhost:3000/home">Home</a>
        <div className="topnav-right">
          <a className="active" href="#removeitem">
            REMOVE A FOUND ITEM
          </a>
          <a href="http://localhost:3000/submittingitem">SUBMIT A FOUND ITEM</a>
          <a href="http://localhost:3000" onClick={logout}>
            LOGOUT
          </a>
        </div>
      </div>
    );
  }
}

class ItemBox extends React.Component {
  render() {
    const mystyle = {
      border: "10px solid #161716",
      borderRadius: "25px",
      color: "white",
      height: "600px",
      width: "100%",
      backgroundColor: "SlateBlue",
      padding: "10px",
    };

    var rem = () => {
      console.log(this.props.locn + " " + this.props.cate);
      axios
        .delete("/submitteditems", {
          data: {
            name: this.props.name,
            location: this.props.locn,
            desc: this.props.desc,
            category: this.props.cate,
            email: this.props.email,
            phone: this.props.phone,
          },
        })
        .then((res) => {
          console.log("Successfully deleted item");
        })
        .catch((err) => console.log("error while deleting " + err));
      window.location.reload(true);
    };

    return (
      <div id="container" className="rowCBig" style={mystyle}>
        <div className="info">
          <h3>{this.props.name}</h3>
          <p>{this.props.desc}</p>
          <p>LOCATION: {this.props.locn}</p>
          <p>CATEGORY: {this.props.cate}</p>
          <p>EMAIL-ID: {this.props.email}</p>
          <p>PHONENO: {this.props.phone}</p>
          <br />
          <button className="remB" onClick={rem}>
            REMOVE SUBMISSION
          </button>
        </div>
        <img className="photo-right" src={this.props.image} alt="image" />
      </div>
    );
  }
}

class DisplayItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: [] };
  }
  componentDidMount = () => {
    axios
      .get("/submitteditems")
      .then((response) => {
        const data = response.data;
        console.log("submitted " + JSON.stringify(data));
        this.setState({ submitted: data });
        console.log("Got it");
      })
      .catch((err) => {
        console.log("Error during getting submitted items");
      });
  };
  render() {
    console.log("Condition " + this.state.submitted);
    if (
      JSON.stringify(this.state.submitted) != "[]" &&
      JSON.stringify(this.state.submitted) != null &&
      this.state.submitted != ""
    ) {
      return (
        <div>
          <Nav />
          <div className="cont">
            {this.state.submitted.map((i, index) => (
              <ItemBox
                key={index}
                name={i.name}
                locn={i.location}
                cate={i.category}
                phone={i.phone}
                email={i.email}
                image={i.image}
                desc={i.desc}
                ind={index}
              />
            ))}
          </div>
        </div>
      );
    } else {
      console.log("here");
      return (
        <div>
          <Nav />
          <h1>Haven't submitted anything</h1>
        </div>
      );
    }
  }
}

export default DisplayItems;
