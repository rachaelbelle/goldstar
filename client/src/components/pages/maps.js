import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import GoogleMapReact, { Marker } from 'google-map-react';
import { geolocated } from "react-geolocated";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

//const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AnyReactComponent = ({ text }) => <FontAwesomeIcon id='goldStarSolid' icon={faStar} />;

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
          <div className="container-fluid">
            <div style={{ marginTop: "4rem", "fontSize": "0.5vw" }} className="row ">
                <div className="col s10 m6 l4">
                    <Link to="/dashboard" className="btn-flat waves-effect">
                        <i className="material-icons ">keyboard_backspace</i>
                        Back to dashboard
                </Link>
                </div>
            </div>
            <div className="container" style={{ height: '80vh', width: '80%', marginBottom: "2rem" }}>
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
                    <AnyReactComponent
                    lat={this.props.coords.latitude}
                    lng={this.props.coords.longitude}
                    text="You are here"
                    /> 
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
                  <AnyReactComponent
                    lat={center.lat}
                    lng={center.lng}
                    text="Bootcamp"
                  /> 
                </GoogleMapReact>
              }
              
              {/*<Marker
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
        </div>

  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SimpleMap);
