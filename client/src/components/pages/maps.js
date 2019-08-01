import React, { Component } from 'react';
import GoogleMapReact, { Marker } from 'google-map-react';
import { geolocated } from "react-geolocated";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      API_KEY: '',
      center: {
        lat: 40.49,
        lng: -74.50,
      },
      zoom: 11
    };
  }

  componentDidMount() {
    this.getKeys();
  }

  getKeys = () => {
    axios
      .post("/api/tasks/getKeys", {})
      .then(res => {

        this.setState({
          API_KEY: res.data.GOOGLEMAPS_API_KEY
        })
      })
      .catch(err => {
        console.log("Errored out when getting task data: " + err);
      });
  }

  render() {

    const { API_KEY, center, zoom } = this.state;

      return  API_KEY === '' ?
        null
      : ! this.props.isGeolocationAvailable ? (
        // <div>Your browser does not support Geolocation</div>
        null
      ) : !this.props.isGeolocationEnabled ? (
          // <div>Geolocation is not enabled</div>
          null
      ) : this.props.coords ? (
          <div className="container" style={{ height: '60vh', width: '80%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={{
              lat: this.props.coords.latitude || center.lat,
              lng: this.props.coords.longitude || center.lng
            }}
            defaultZoom={zoom}
          >
            {/* <AnyReactComponent
              lat={this.props.coords.latitude}
              lng={this.props.coords.longitude}
              text="My Marker"
            /> */}
            {/* <Marker
              name={'Your position'}
              // position={
              //   {
              //     lat: this.props.coords.latitude ? this.props.coords.latitude : center.lat,
              //     lng: this.props.coords.longitude ? this.props.coords.longitude : center.lng
              //   }
              // }
              draggable={false}
            /> */}
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
