import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft ,faQuoteRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

    //need this so the quote can populate as soon as the page loads
    this.setQuote();
    //then every other 10 seconds, a new quote will populate
    this.timerId = setInterval( () => {
      this.setQuote();
    }, 10 * 1000);

  }

  componentWillUnmount() {
    //when we want to change pages, we need to clear the interval
    clearInterval(this.timerId);
  }

 setQuote = () => {
    let myQuote = quote.getQuote();
    while( myQuote.text.length >= 150 ){
      myQuote = quote.getQuote();
    }

    this.setState({
      text: myQuote.text,
      author: myQuote.author
    })
  } 

  render() {
    const { user } = this.props.auth;
    const { text, author } = this.state;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4 style={{ "fontSize": "3vw" }}>
              Welcome, {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1" style={{ "fontSize": "3vw" }}>
                So glad to have you here! Welcome to { " " }
                <span style={{ fontFamily: "monospace" }}>GOLDSTAR
                  <span style={{ color: "gold" }}>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                </span>
              </p>
              <p style={{ "fontSize": "4vh" }}>
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
                  width: "17vw",
                  //borderRadius: "3px",
                  //height: "6vh",
                  //letterSpacing: "1.5px",
                  //color: "black",
                  //margin: "5px",
                }}
                className="btn waves-effect waves-light hoverable yellow accent-3"
              >
                Achievements
              </Link>
              <Link
                key="task_btn"
                to="/tasks"
                style={{
                  width: "12vw",
                  //borderRadius: "3px",
                  //height: "6vh",
                  //letterSpacing: "1.5px",
                  //color: "black",
                  //margin: "5px"
                }}
                className="btn waves-effect waves-light hoverable yellow accent-3"
              >
                Tasks
              </Link>
              <Link
                key="video_btn"
                to="/video"
                style={{
                  width: "25vw",
                  //borderRadius: "3px",
                  //height: "6vh",
                  //letterSpacing: "1px",
                  //fontSize: "12px",
                  //color: "black",
                  //margin: "2px"
                }}
                className="btn waves-effect waves-light hoverable yellow accent-3"
              >
                Motivational Videos
              </Link>
            </div>
            <div></div>
            <Link
              key="logout"
              to="#"
              style={{
                width: "22vw",
                //borderRadius: "3px",
                //letterSpacing: "1.5px",
                marginTop: "1rem",
                //color: "black",
                //margin: "10px"
              }}
              onClick={this.onLogoutClick}
              className="btn waves-effect waves-light hoverable yellow accent-3"
            >
              <span style={{ marginRight: "1rem" }}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              </span>
              Logout
            </Link>

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
