import React from 'react';
// import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";

class Star extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 0
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;

    return (
      <>
        <>
          <h2>Rating from state: {rating}</h2>
          <StarRatingComponent
            name="rate1"
              style ={{
                  width: "10px",
              }}
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s4 offset-s4">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Star;
