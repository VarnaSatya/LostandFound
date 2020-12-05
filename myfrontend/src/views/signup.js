import React from "react";
import "./mystyles.css";
import axios from "axios";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function validateEmail(emailID) {
  var atpos = emailID.indexOf("@");
  var dotpos = emailID.lastIndexOf(".");
  if (atpos < 1 || dotpos - atpos < 2) {
    return false;
  }
  return true;
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      emailid: "",
      successMessage: "",
    };
  }
  render() {
    var onChanging = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      this.setState({ [name]: value });
    };

    var signin = () => {
      history.push("/");
      window.location.reload(false);
    };

    var create = () => {
      console.log(validateEmail(this.state.emailid));
      if (
        this.state.username == "" ||
        this.state.username == "" ||
        this.state.emailid == "" ||
        validateEmail(this.state.emailid) == false
      ) {
        {
          this.setState({
            errorMessage: "Invalid Username/Password/Emailid, try again",
          });
        }
      } else {
        axios({
          url: "/createuser",
          method: "POST",
          data: {
            username: this.state.username,
            password: this.state.password,
            email: this.state.emailid,
          },
        })
          .then((res) => {
            console.log("DATA: " + JSON.stringify(res));
            if (res.status == 204)
              this.setState({
                errorMessage:
                  "Account already exists with this email-id, try again",
                successMessage: "",
              });
            else if (res.status == 206)
              this.setState({
                errorMessage: "Username exists, try again",
                successMessage: "",
              });
          })
          .catch((err) => console.log("error signup " + err));
        this.setState({
          successMessage: "Account created succesfully!",
          errorMessage: "",
        });
      }
    };

    return (
      <div className="holder">
        <div>
          <h1 className="heading">SIGNUP</h1>
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
          <h4 className="subheading">Email-id</h4>
          <input
            className="entering"
            type="email"
            placeholder="Email-id"
            name="emailid"
            value={this.state.emailid}
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
          <p id="placeForSuccess">{this.state.successMessage}</p>
          <br />
          <br />
          <input className="submission" type="submit" onClick={create} />
        </div>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <input
            className="goBack"
            type="button"
            value="Go back to SignIn page"
            onClick={signin}
          ></input>
          <br />
          <br />
          <img src="https://istobranding.com/u/projects_con/2018/08/logo_3.jpg"></img>
        </div>
      </div>
    );
  }
}

export default Signup;
