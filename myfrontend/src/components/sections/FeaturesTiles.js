import React from "react";
import { SectionTilesProps } from "../../utils/SectionProps";
import "./App.css";
import ReactDOM from "react-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import Button from "../elements/Button";

const FeaturesTiles = (
  {
    /*className,
  //topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props*/
  }
) => {
  var item;

  class ItemFull extends React.Component {
    render() {
      var name = item[this.props.ind].name;
      var image = item[this.props.ind].image;
      var desc = item[this.props.ind].desc;
      //location
      var location = item[this.props.ind].location;
      var phone = item[this.props.ind].phone;
      var email = item[this.props.ind].email;
      var category = item[this.props.ind].category;

      function whenClicked() {
        //ReactDOM.render(<Page />, document.getElementById("root"));
        window.location.reload(false);
      }

      return (
        <div className="itemzoom">
          <h1 className="heading">{name}</h1>
          <img className="bigphoto" src={image} />
          <div id="info">
            <p>{desc}</p>
            <p>CATEGORY: {category}</p>
            <p>LOCATION: {location}</p>
            <p>CONTACT INFO:</p>
            <p>phone number: {phone}</p>
            <p>email-id: {email}</p>
            <Button onClick={whenClicked}>Go Back</Button>
          </div>
          <br />
          <br />
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
        height: "430px",
        width: "330px",
        backgroundColor: "SlateBlue",
        padding: "10px",
        //fontFamily: "Calibri"
      };
      function changeBackground(e) {
        e.target.style.background = "gray";
      }
      function changeBack(e) {
        e.target.style.background = "SlateBlue";
      }
      function Clicked(ind) {
        ReactDOM.render(
          <ItemFull ind={ind} name={item[ind].name} />,
          document.getElementById("root")
        );
      }
      return (
        <div
          id="container"
          style={mystyle}
          onMouseOver={changeBackground}
          onMouseOut={changeBack}
          onClick={() => Clicked(this.props.ind)}
        >
          <h3 backgroundcolor="transparent">{this.props.name}</h3>
          <img className="photo" src={this.props.image} alt="image" />
          <p backgroundcolor="transparent">{this.props.desc}</p>
        </div>
      );
    }
  }

  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        item: [],
      };
    }
    componentDidMount = () => {
      this.getItem();
    };
    getItem = async () => {
      axios
        .get("/getSelectedItems")
        .then((response) => {
          const data = response.data;
          this.setState({ item: data });
          item = data;
          //console.log(listItem);
          console.log("Got it");
        })
        .catch(() => {
          console.log("data");
        });
    };
    render() {
      return (
        <div className="rowC">
          {" "}
          {this.state.item.map((i, index) => (
            <ItemBox
              key={index}
              name={i.name}
              image={i.image}
              desc={i.desc}
              ind={index}
            />
          ))}{" "}
        </div>
      );
    }
  }

  return <Page />;
};

//FeaturesTiles.propTypes = propTypes;
//FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
