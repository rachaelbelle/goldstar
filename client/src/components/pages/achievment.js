import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import {Navbar} from 'react-bootstrap';

class Earnings extends Component {

  state = {
    listAchievments: []
  }


  render() {
    return (
      <div className="container">
        <div>
          <h1>Today's Earnings</h1>
          <p>Welcome back! Here are the gold stars you've earned so far:</p>
          <ul>{this.state.listAchievments}</ul>
        </div>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s4 offset-s4">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
                </Link>
          </div>
        </div>
      </div>
    );
  }

}


export default Earnings;
