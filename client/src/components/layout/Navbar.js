import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {
  render() {
    return (
      <div className="container">
          <div className="nav-wrapper">
            <Link to="/"
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: '5vw',
                height: "1vh",
                lineHeight: "0",
              }}
              className="col 5 brand-logo center"
            >
                <p style={{color:"gold"}}>
                  <FontAwesomeIcon icon={faStar} />
                  GOLD STAR
                  <FontAwesomeIcon icon={faStar} />
                </p>
            </Link>
          </div>
      </div>
    );
  }
}

export default Navbar;
