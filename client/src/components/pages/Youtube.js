import React from 'react';
import YouTube from 'react-youtube';
 
class video extends React.Component {
  
    constructor() {
        super();
     

        let myVideos = [
            {
                title: "Some title",
                id: "EE7L3OXGLO8"
            },
            {
                title: "Title 2",
                id: "_gJyJ8NvZgg"
            }
        ]

        this.state = {
            name: '',
            videos: myVideos,
            currentVideo: 'HofCckYqvJg'
        };
      }  
  
    changeVideo = (data) => {
        //get video id
        let id = 'HofCckYqvJg'

        this.setState({
            currentVideo: id
        })
    }


    render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    const {currentVideo} = this.state;
 
    return (
        <>    
            <YouTube
                videoId={currentVideo}
                opts={opts}
                onReady={this._onReady}
            />
            {
            <a herf="#" on click="console.log('The link was clicked.'); return
             false">
                click me
            </a>
             
                
                /*
            somehow show list of videos
            onClick={this.changeVideo}
            */}
        </>
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
 
export default video;