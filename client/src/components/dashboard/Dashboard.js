import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4 style={{ "fontSize": "4vw" }}>
              <b>Welcome, </b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1" style={{ "fontSize": "2vw" }}>
                So glad you have you here! Welcome to {" "}
                <span style={{ fontFamily: "monospace" }}>GOLDSTAR
                  <span style={{ color: "gold" }}>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                </span>
              </p>
            </h4>
            <div style={{display:"inline-block" }} className="">
              <Link
                key="achievement_btn"
                to="/achievements"
                style={{
                  width: "195px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "black",
                  margin: "5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
              >
                Achievements
              </Link>
              <Link
                key="task_btn"
                to="/tasks"
                style={{
                  width: "195px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "black",
                  margin: "5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
              >
                Tasks
              </Link>
              <Link
                key="video_btn"
                to="/video"
                style={{
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "black",
                  margin: "5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
              >
                Motivational Videos
              </Link>
            </div>
            <div></div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                color: "black",
                margin: "10px"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
