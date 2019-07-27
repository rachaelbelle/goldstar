import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "25vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Welcome to Gold Star.
            </h4>
            <p className="flow-text grey-text text-darken-1">
                In a fast-paced world, it can be hard to keep your eye on the prize. Use this handy tool to keep track of your daily tasks,
                celebrate the little wins in life, and find motivation when you need it the most!
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "black",
                }}
                className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "black",
                }}
                className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
