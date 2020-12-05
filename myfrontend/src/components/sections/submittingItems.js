import React from "react";
import axios from "axios";

import "./submission.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

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
          <a href="http://localhost:3000/removeitem">REMOVE A FOUND ITEM</a>
          <a className="active" href="#submittingitem">
            SUBMIT A FOUND ITEM
          </a>
          <a href="http://localhost:3000" onClick={logout}>
            LOGOUT
          </a>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    errorMessage: "",
    name: "",
    location: "",
    description: "",
    category: "Bottles and Flasks",
    email_id: "",
    number: "",
    photo: "",
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log("Name " + name + "value" + value);
    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();
    const payload = {
      name: this.state.name,
      location: this.state.location,
      desc: this.state.description,
      category: this.state.category,
      email: this.state.email_id,
      phone: this.state.number,
      image: this.state.photo,
    };
    console.log("submitted " + JSON.stringify(payload));

    if (
      payload.name == "" ||
      payload.category == "" ||
      payload.location == ""
    ) {
      this.setState({
        errorMessage: "cannot leave name,category or location fields empty",
      });
    } else {
      if (payload.image == "")
        payload.image =
          "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483097.jpg";
      axios({
        url: "/save",
        method: "POST",
        data: payload,
      })
        .then((res) => {
          console.log("Data has been sent to the server");
          console.log(res);
          if (res.status == 204) {
            history.push("/nologin");
            window.location.reload(false);
          } else if (res.status != 204) {
            console.log("else");
            history.push("/removeitem");
            window.location.reload(false);
          }
        })
        .catch(() => {
          console.log("Internal server error");
        });
    }
  };

  render() {
    console.log("State: ", this.state);

    //JSX
    return (
      <div>
        <Nav />
        <div className="apps">
          <h1 className="headings" text-align="left">
            Submission Page
          </h1>
          <br />
          <form onSubmit={this.submit}>
            <div>Name:</div>
            <br />
            <div className="form-inputs">
              <input
                type="text"
                name="name"
                placeholder="Enter Name of item"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>Location:</div>
            <br />
            <div className="form-inputs">
              <input
                type="text"
                name="location"
                cols="40"
                placeholder="Enter location where item was found"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>Description:</div>
            <br />
            <div className="form-inputs">
              <textarea
                placeholder="Describe the item found"
                name="description"
                cols="30"
                rows="10"
                value={this.state.body}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <br />
            <label className="form-inputs">
              Pick the Category the item belongs to:
            </label>
            <br />
            <select
              value={this.state.value}
              onChange={this.handleChange}
              width="500px"
              className="optionss"
              name="category"
            >
              <option value="Bottles and Flasks">Bottles and Flasks</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Perfume and Deodorants">
                Perfume and Deodorants
              </option>
              <option value="Containers">Containers</option>
              <option value="Bags and Wallets">Bags and Wallets</option>
              <option value="Wrist Watches">Wrist Watches</option>
              <option value="Stationary">Stationary</option>
              <option value="Musical instruments">Musical instruments</option>
              <option value="Others">Others</option>
            </select>
            <br />
            <br />
            <div>Contact Number:</div>
            <br />
            <div className="form-inputs">
              <input
                type="tel"
                maxLength="10"
                name="number"
                placeholder="Enter contact number"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <br />
            </div>
            <div>Photo:</div>
            <br />
            <div className="form-inputs">
              <input
                type="url"
                name="photo"
                placeholder="Copy paste the link of png file"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <p id="emptycond">{this.state.errorMessage}</p>
            <br />
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
