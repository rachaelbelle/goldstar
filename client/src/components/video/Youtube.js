import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";
//importing supporting pages
import SearchBar from './Search_bar';
import VideoList from './video_list'
import VideoDetail from './video_detail';
//importing packages
import YTSearch from 'youtube-api-search';
//importing logoutuser functionality
import { logoutUser } from "../../actions/authActions";

class video extends Component {
  constructor(props) {
    super(props);

    this.getKeys();

    this.state = {
      videos: [],
      selectedVideo: null,
      API_KEY: '',
    };
  }

  getKeys = () => {
    axios
      .post("/api/tasks/getKeys", this.props.auth.user)
      .then(res => {

        this.videoSearch('Motivational Videos', res.data.YOUTUBE_API_KEY);

          this.setState({
              API_KEY: res.data.YOUTUBE_API_KEY
          })
      })
      .catch(err => {
          console.log("Errored out when getting task data: " + err);
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  videoSearch(searchTerm, key) {

      YTSearch({ key: key, term: searchTerm }, (data) => {
        //console.log(data);
        this.setState({
          videos: data,
          selectedVideo: data[0]
        });
      });

  }

  render() {

    const { API_KEY } = this.state;

    return (

      (typeof API_KEY === 'undefined' || API_KEY === null || API_KEY === '')?
        null
      :
      <>
        <>
          <div style={{ marginTop: "4rem", "fontSize": "0.5vw" }} className="row ">
            <div className="col s10 m6 l4">
              <Link to="/dashboard" className="btn-flat waves-effect">
                <i className="material-icons ">keyboard_backspace</i>
                Back to dashboard
                        </Link>
            </div>
          </div>
        </>
        <div className="container-fluid">
          <div className="row">
            <div className="col s12">
              <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm, API_KEY)} />
            </div>
            <div className="col s12 m12 l8">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="col s12 m12 l4">
              <VideoList
                onVideoSelect={userSelected => this.setState({ selectedVideo: userSelected })}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "inline-block" }} className="">
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
      </>
    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth
})

video.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(video);