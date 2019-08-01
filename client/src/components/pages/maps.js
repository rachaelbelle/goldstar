import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { geolocated } from "react-geolocated";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  constructor(props) {
    super(props);

    console.log(props.auth);

    this.state = {
      API_KEY: ''
    };
  }

  static defaultProps = {
    center: {
      lat: 40.49,
      lng: -74.50,
    },
    zoom: 11
  };

  componentDidMount() {
    this.getKeys();
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

  render() {
    return ! this.props.isGeolocationAvailable ? (
      // <div>Your browser does not support Geolocation</div>
      null
    ) : !this.props.isGeolocationEnabled ? (
        // <div>Geolocation is not enabled</div>
        null
    ) : this.props.coords ? (
        <div className="container" style={{ height: '60vh', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDvvrD2UTA3fnclxk1SwYUymFOuZ5Vf4yg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.coords.latitude}
            lng={this.props.coords.longitude}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SimpleMap);
