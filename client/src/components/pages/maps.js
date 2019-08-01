import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import GoogleMapReact, { Marker } from 'google-map-react';
import { geolocated } from "react-geolocated";
import Marker from './marker';
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
      : 
          <div className="container" style={{ height: '60vh', width: '80%' }}>
          {
            (this.props && this.props.coords && this.props.coords.latitude && this.props.coords.longitude) 
            ?
              
                <GoogleMapReact
                  bootstrapURLKeys={{ key: API_KEY }}
                  defaultCenter={{
                    lat: center.lat,
                    lng: center.lng
                  }}
                  center={{lat: this.props.coords.latitude, lng: this.props.coords.longitude}}
                  defaultZoom={zoom}
                >
                </GoogleMapReact>
            :
              <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={{
                  lat: center.lat,
                  lng: center.lng
                }}
                defaultZoom={zoom}
              >
              </GoogleMapReact>
            }
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
          
        </div>

  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SimpleMap);
