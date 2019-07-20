import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

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
            <h4>
              <b>Welcome, </b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
              So glad you have you here! Welcome to {" "}
                <span style={{ fontFamily: "monospace" }}>GOLDSTAR</span>  ★
              </p>
            </h4>
            <div >
              <Link
                to="/achievements"
                style={{
                  width: "195px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "black",
                }}
                className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
              >
                Achievements
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
