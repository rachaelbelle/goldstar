import React, { Component } from "react";
import Axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
// import API from "./apiland"
// api is...
// const api = {
//     get: function() {
//         Axios.get("/achievements")
//     }
// }


class Earnings extends Component {

    state = {
        userData: []
    }

    componentDidMount() {
        this.getAchievements()
    }

    getAchievements = () => {
        //input being a string
        // const data = API.get()
        const data = [
            {
                stars: 2,
                name: 'Buy groceries'
            },
            {
                stars: 3,
                name: 'Apply to 5 jobs'
            },
            {
                stars: 1,
                name: 'Eat Breakfast'
            }
        ]
        this.setState({ userData: data })
    }



    render() {
        const { user } = this.props.auth;
        const { userData } = this.state;
        let totalStars = 0;
        let liElements = [];

        userData.forEach(task => {
            totalStars += task.stars;
            liElements.push(
                <div>
                  <li key={task.name}  className="container left-align">
                        <StarRatingComponent
                            name={task.name}
                            starCount={task.stars}
                            value={task.stars}
                            editing={false}
                            renderStarIcon={(index, value) => {
                                return (
                                  <span>
                                      {(index <= value) ? <FontAwesomeIcon id='goldStarSolid' icon={faStar}/> : <FontAwesomeIcon icon={faStarEmpty}/>}
                                  </span>
                                );
                              }}
                            />
                        <span style={{"fontSize": "2vw", paddingLeft: "25px"}}> {task.name} </span>
                  </li>
                </div>
            );
        });

        return (
            <>
                <div style={{ marginTop: "4rem", "fontSize": "0.5vw" }} className="row ">
                    <div className="col s10 m6 l4">
                        <Link to="/dashboard" className="btn-flat waves-effect">
                            <i className="material-icons ">keyboard_backspace</i>
                            Back to dashboard
                        </Link>
                    </div>
                </div>
                <>
                    <h1 style={{ "fontSize": "3vw" }}>Today's Earnings</h1>
                    <p style={{ "fontSize": "2vw" }}>Welcome back {user.name.split(" ")[0]}! Here are the gold stars you've earned so far:</p>
                    <ul style={{ margin: 10, display: "inline-block" }}> {liElements} </ul>
                    <p style={{ "fontSize": "2vw" }}>You have earned {totalStars}
                        <span style={{ color: "gold" }}>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        {(totalStars > 1)?"s":null} today.</p>
                    <p style={{ "fontSize": "2vw" }}>Ready to earn some more stars?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to My Tasks</p>
                    <p style={{ "fontSize": "2vw" }}>Need some motivation?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to motivational videos or check out other users' tasks</p>
                </>
            </>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})


Earnings.propTypes = {
    auth: PropTypes.object.isRequired
}
export default connect(
    mapStateToProps
)(Earnings)
