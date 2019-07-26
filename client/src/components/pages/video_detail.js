import React from 'react';
import { Button } from 'react-bootstrap'

const VideoDetail = (props) => {
    const video = props.video;

    if(!video){
        return <div>Loading...</div>;
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail">
            <div className="video-container">
                <iframe title="video" src={url} frameborder="0" allowfullscreen></iframe>
            </div>                
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;