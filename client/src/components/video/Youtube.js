import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
//importing supporting pages
import SearchBar from './Search_bar';
import VideoList from './video_list'
import VideoDetail from './video_detail';
//importing packages
import YTSearch from 'youtube-api-search';
//importing logoutuser functionality
import { logoutUser } from "../../actions/authActions";

//const API_KEY = 'AIzaSyAIT-FfbTd5D7I5FtSY7XfaltbUN0zvRKg';
let API_KEY='';

class video extends Component {
    constructor(props) {
        super(props);

        //if we are in heroku, the api key will be part of the system environments... otehrwise, import from .env file
        if(process.env.NODE_ENV === 'production'){
          API_KEY = process.env.YOUTUBE_API_KEY
        } else {
          API_KEY = 'AIzaSyAIT-FfbTd5D7I5FtSY7XfaltbUN0zvRKg';
        }
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Motivational Videos');

    }

    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };

    videoSearch(searchTerm) {
      YTSearch({key: API_KEY, term: searchTerm}, (data) => {
        console.log(data);
          this.setState({
              videos: data,
              selectedVideo: data[0]
            });
      });
    }
      render() {
        return (
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
                <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}/>
              </div>
              <div className="col s12 m12 l8">
                <VideoDetail video={this.state.selectedVideo}/>
              </div>
              <div className="col s12 m12 l4">
                <VideoList
                  onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
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