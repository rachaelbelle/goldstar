import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <div className="nav-wrapper white">
            <Link to="/"
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "4vw",
              }}
              className="col s12 brand-logo center black-text"
            >
              <p style={{ color: "gold" }}>
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
