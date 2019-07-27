import React from "react";
import { Motion, spring } from "react-motion";
import {
  GoogleMap,
  Polyline,
  FitBounds,
  ZoomControl,
  CustomControl,
} from "react-google-map-components";
 
class DirectionMap extends React.Component {
  state = { step: 0 };
 
  render() {
    const { step } = this.state;
    const { maps, path, style, center } = this.props;
 
    return (
        <div></div>
    //   <GoogleMap zoom={9} maps={maps} style={style} center={center}>
    //     <ZoomControl />
 
    //     <FitBounds latLngBounds={path} />
 
    //     <Polyline path={path} strokeOpacity={0.3} />
 
    //     <CustomControl position="BOTTOM_CENTER">
    //       {step === 0 ? (
    //         <button onClick={() => this.setState({ step: path.length - 1 })}>
    //           Start
    //         </button>
    //       ) : (
    //         <button onClick={() => this.setState({ step: 0 })}>Revert</button>
    //       )}
    //     </CustomControl>
 
    //     <Motion
    //       defaultStyle={{ position: 0 }}
    //       style={{ position: spring(step, { stiffness: 10, damping: 26 }) }}
    //     >
    //       {x => <Polyline path={path.slice(0, x.position)} />}
    //     </Motion>
    //   </GoogleMap>
    );
  }
}

export default DirectionMap;