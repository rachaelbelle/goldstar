import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft ,faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from "../../actions/authActions";

import quote from 'inspirational-quotes';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      author: '',
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {

    this.setQuote();
    this.timerId = setInterval( () => {
      this.setQuote();
    }, 10 * 1000);
    
  }

  componentWillUnmount() {

    clearInterval(this.timerId);
  }

  setQuote = () => {
    let myQuote = quote.getQuote();
    
    this.setState({
      text: myQuote.text,
      author: myQuote.author
    })
  }

  render() {
    const { user } = this.props.auth;
    const { text, author } = this.state;

    console.log("Quote: "+text+", by: "+author);

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4 style={{ "fontSize": "3vw" }}>
              Welcome, {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1" style={{ "fontSize": "2vw" }}>
                So glad to have you here! Welcome to { " " }
                <span style={{ fontFamily: "monospace" }}>GOLDSTAR
                  <span style={{ color: "gold" }}>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                </span>
              </p>
              <p>
                <FontAwesomeIcon icon={faQuoteLeft} />
                {text}
                <FontAwesomeIcon icon={faQuoteRight} />
              </p>
              <p style={{fontStyle: "italic"}}>
                {author}
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
                  letterSpacing: "1px",
                  fontSize: "12px",
                  color: "black",
                  margin: "2px"
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
