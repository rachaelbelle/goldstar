import React, { Component } from 'react';
import SearchBar from './Search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './video_list'
import VideoDetail from './video_detail';
const API_KEY = 'AIzaSyAIT-FfbTd5D7I5FtSY7XfaltbUN0zvRKg';

class video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Motivational Videos');

    }

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
        );
      }

}
        
export default video;