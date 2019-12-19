import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import Axios from "axios";
// import { APIURL } from "../suport/apiUrl";
import { connect } from "react-redux";
import {
  LoginSuccessAction,
  Loginthunk,
  Login_error
} from "./../redux/actions";
import Loader from "react-loader-spinner";

class Login extends Component {
  state = {
    error: "",
    loading: false
  };

  onLoginClick = () => {
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    this.props.Loginthunk(username, password);
  };

  render() {
    console.log(this.props.AuthLog);
    if (this.props.AuthLog) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
        <div className=" mt-3 d-flex justify-content-center">
          <div
            style={{ width: "500px", border: "1px solid black" }}
            className="rounded p-2"
          >
            <h1>Login</h1>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input
                type="text"
                className="username"
                style={{
                  border: "transparent",
                  width: "100%",
                  fontSize: "20px"
                }}
                ref="username"
                placeholder="Username"
              />
            </div>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input
                type="password"
                className="username"
                style={{
                  border: "transparent",
                  width: "100%",
                  fontSize: "20px"
                }}
                ref="password"
                placeholder="Password"
              />
            </div>
            {this.props.Auth.error === "" ? null : (
              <div className="alert alert-danger mt-2">
                {this.props.Auth.error}{" "}
                <span
                  onClick={this.props.Login_error}
                  className="float-right font-weight-bold"
                >
                  X
                </span>
              </div>
            )}
            <div className="mt-4">
              {this.props.Auth.loading ? (
                <Loader
                  type="NotSpecified"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              ) : (
                <button className="btn btn-primary" onClick={this.onLoginClick}>
                  Login
                </button>
              )}
            </div>
            <div className="mt-2">
              <Link to={"/register"}> Register </Link> in here (in case you haven't registered into our website :)
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MapStateToprops = state => {
  return {
    AuthLog: state.Auth.login,
    Auth: state.Auth
  };
};

export default connect(MapStateToprops, {
  LoginSuccessAction,
  Loginthunk,
  Login_error
})(Login);
