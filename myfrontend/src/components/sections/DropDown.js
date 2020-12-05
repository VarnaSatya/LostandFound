import React from "react";
import "./App.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import fetch from "node-fetch";
var location, category;
var selLocn, selCate;
var items;

class Dd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "-",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    axios
      .get("/getSelected")
      .then((response) => {
        const sel = response.data;
        selLocn = sel.location;
        selCate = sel.category;
        console.log("THIS  " + selLocn + " " + selCate);
        if (this.props.check == "Location") {
          console.log("if statement" + selLocn);
          this.setState({ val: selLocn });
        } else {
          console.log("else statement" + selCate);
          this.setState({ val: selCate });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("selected--" + this.state.val);
  };

  handleChange(e) {
    console.log("Selected!!");
    this.setState({ val: e.target.value });
    if (this.props.check == "Location") {
      selLocn = e.target.value;
      this.props.updateTextCB(selLocn);
      console.log(selLocn);
    } else if (this.props.check == "Category") {
      selCate = e.target.value;
      console.log(selCate);
    }
  }

  render() {
    return (
      <div id="App">
        <div className="select-container">
          <select
            className="o"
            value={this.state.val}
            onChange={this.handleChange}
            onClick={this.handleChange}
          >
            {this.props.sel.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

const DropDownOptions = () => {
  class Choosing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        locn: [],
        cate: [],
        sl: [],
        sc: [],
      };
    }
    componentDidMount = () => {
      this.getItem();
    };
    getItem = () => {
      axios
        .get("/getSelected")
        .then((response) => {
          const sel = response.data;
          selLocn = sel.location;
          selCate = sel.category;
          console.log("THIS  " + selLocn + " " + selCate);
        })
        .catch((err) => {
          console.log(err);
        });
      axios.get("/getItems").then((response) => {
        var data = response.data;
        //console.log("DATA!!! " + JSON.stringify(data));
        location = data.map((i, index) => i.location);
        location = location.filter(function (item, pos) {
          return location.indexOf(item) === pos;
        });
        if (selLocn == "-") selLocn = location[0];
        console.log("SELLOCN " + selLocn);
        data = data.map(function (x) {
          return { location: x.location, category: x.category };
        });
        //console.log("DATA!!! " + JSON.stringify(data));
        category = data.filter(function (x) {
          //console.log("data location " + x.location);
          return x.location == selLocn;
        });
        console.log("CATEGORY-----" + category);
        category = category.map((i, index) => i.category);
        category = category.filter(function (item, pos) {
          return category.indexOf(item) === pos;
        });
        console.log("CATEGORY-----" + category);
        if (selCate == "-") selCate = category[0];
        console.log("SELLOCN: " + selLocn + "SELCATE: " + selCate);
        this.setState({
          items: data,
          locn: location,
          cate: category,
          sl: selLocn,
          sc: selCate,
        });
      });
    };

    updateText1 = (selection) => {
      console.log(this.state.items);
      category = this.state.items.filter(function (x) {
        //console.log("data location " + x.location);
        return x.location == selection;
      });
      selLocn = selection;
      category = category.map((i, index) => i.category);
      category = category.filter(function (item, pos) {
        return category.indexOf(item) === pos;
      });
      this.setState({ sl: selLocn, cate: category, sc: category[0] });
      selCate = category[0];
      console.log(this.state.cate);
    };

    selectedParams = async () => {
      console.log(selLocn + " " + selCate);
      this.setState({
        sl: selLocn,
        sc: selCate,
      });
      const selected = { location: selLocn, category: selCate };
      console.log(selected);
      axios({
        url: "/selected",
        method: "POST",
        data: selected,
      })
        .then(() => console.log("Done posting"))
        .catch((err) => console.log("error while posting " + err));
      window.location.reload(false);
    };

    render() {
      console.log("Here");
      return (
        <div id="selecting">
          <h1>SELECT CATEGORIES</h1>
          <h5>LOCATION</h5>
          <Dd
            sel={this.state.locn}
            updateTextCB={this.updateText1}
            check="Location"
          />
          <h5>CATEGORY</h5>
          <Dd
            sel={this.state.cate}
            updateTextCB={this.updateText1}
            check="Category"
          />
          <br />
          <input
            className="submission"
            type="submit"
            onClick={this.selectedParams}
          />
        </div>
      );
    }
  }
  return <Choosing></Choosing>;
};

export default DropDownOptions;
