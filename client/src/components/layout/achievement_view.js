import React, { Component } from "react";
import axios from "axios";
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

    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            showModal: false,
            taskStars: 0,
            taskName: '',
        };
    }

    componentDidMount() {
        this.getAchievements()
    }

    getAchievements = () => {
        //input being a string
        // const data = API.get()
        // const data = [
        //     {
        //         curStars: 2,
        //         maxStars: 2,
        //         name: 'Buy groceries'
        //     },
        //     {
        //         curStars: 3,
        //         maxStars: 3,
        //         name: 'Apply to 5 jobs'
        //     },
        //     {
        //         curStars: 1,
        //         maxStars: 1,
        //         name: 'Eat Breakfast'
        //     }
        // ]
        // this.setState({ userData: data })

        axios
            .post("/api/tasks/getAllCompletedTasks", this.props.auth.user)
            .then(res => {

                console.log("Got data from DB, will set that in achievement view");
                this.setState({ 
                    userData: res.data 
                })
            })
            .catch(err => {
                console.log("Errored out when getting task data: " + err);
            });
    }



    render() {
        const { user } = this.props.auth;
        const { userData } = this.state;
        let totalStars = 0;
        let liElements = [];

        userData.forEach(task => {
            totalStars += task.curStars;
            liElements.push(
                
                  <li key={task.name}  className="tabs col s10 left left-align">
                        <StarRatingComponent
                            className="tab col s1 m1 l1 left left-align"
                            name={task.name}
                            starCount={task.maxStars}
                            value={task.curStars}
                            editing={false}
                            renderStarIcon={(index, value) => {
                                return (
                                  <span>
                                      {(index <= value) ? <FontAwesomeIcon id='goldStarSolid' icon={faStar}/> : <FontAwesomeIcon icon={faStarEmpty}/>}
                                  </span>
                                );
                              }}
                            />
                        <span id="taskname" className="tab col s5 m5 l5 left left-align"> {task.name} </span>
                  </li>
                
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
                    <p style={{ "fontSize": "2vw" }}>Welcome back <span style={{color: "gold"}}> {user.name.split(" ")[0]}</span>! Here are the gold stars you've earned so far:</p>
                    <ul className="row" style={{ margin: 10, display: "inline-block" }}>{liElements}</ul>
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
