import React from "react";
import "./mystyles.css";
import axios from "axios";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
    };
  }

  render() {
    var signup = () => {
      history.push("/signup");
      window.location.reload(false);
    };
    var submitted = () => {
      console.log(this.state.username + " " + this.state.password);
      if (this.state.username == "" || this.state.username == "") {
        {
          this.setState({
            errorMessage: "Invalid Username or Password, try again",
          });
        }
      } else {
        axios({
          url: "/user",
          method: "POST",
          data: {
            username: this.state.username,
            password: this.state.password,
          },
        })
          .then((data) => {
            //console.log(JSON.stringify(data) + " Done posting");
            if (data.status == 204) {
              console.log("Invalid");
              this.setState({
                errorMessage: "Invalid Username or Password, try again",
              });
              axios({
                url: "/signedin",
                method: "POST",
                data: {
                  username: "-",
                },
              });
              //console.log(JSON.stringify(data) + " Done posting");
            } else {
              console.log(data);
              axios({
                url: "/signedin",
                method: "POST",
                data: {
                  username: this.state.username,
                },
              });
              history.push("/home");
              window.location.reload(false);
            }
          })
          .catch((err) => console.log("error while posting " + err));
      }
    };

    var onChanging = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      this.setState({ [name]: value });
    };
    return (
      <div className="holder">
        <div>
          <h1 className="heading">LOGIN</h1>
          <h4 className="subheading">Username</h4>
          <input
            className="entering"
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={onChanging}
          ></input>
          <br />
          <br />
          <h4 className="subheading">Password</h4>
          <input
            className="entering"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={onChanging}
          ></input>
          <p id="placeForError">{this.state.errorMessage}</p>
          <br />
          <br />
          <input className="submission" type="submit" onClick={submitted} />
          <br />
        </div>
        <div>
          <div>
            <br />
            <br />
            <input
              className="goBack"
              type="button"
              value="Sign Up!"
              onClick={signup}
            ></input>
            <br />
            <br />
            <br />
            <img src="https://istobranding.com/u/projects_con/2018/08/logo_3.jpg"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default FirstPage;

/*
<li>
        <a href="http://localhost:3000/home">Next</a>
      </li>
      */
