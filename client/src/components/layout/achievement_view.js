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

                <li key={task._id} className="">
                    <StarRatingComponent
                        className="col s3 m3 l3"
                        name={task.name}
                        starCount={task.maxStars}
                        value={task.curStars}
                        editing={false}
                        renderStarIcon={(index, value) => {
                            return (
                                <span>
                                    {(index <= value) ? <FontAwesomeIcon id='goldStarSolid' pull="left" icon={faStar} /> : <FontAwesomeIcon pull="left" icon={faStarEmpty} />}
                                </span>
                            );
                        }}
                    />
                    <span id="taskname" className="col s6 m6 l6 offset-s1 offset-m1 offset-l1"> {task.name} </span>
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
                    <p style={{ "fontSize": "2vw" }}>Welcome back <span style={{ color: "gold" }}> {user.name.split(" ")[0]}</span>! Here are the gold stars you've earned so far:</p>
                    <ul style={{ margin: 10 }} className="row">{liElements}</ul>
                    <p style={{ "fontSize": "2vw" }}>You have earned {totalStars}
                        <span style={{ color: "gold" }}>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        {(totalStars > 1) ? "s" : null} today.</p>
                    {/* <p style={{ "fontSize": "2vw" }}>Ready to earn some more stars?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to My Tasks</p>
                    <p style={{ "fontSize": "2vw" }}>Need some motivation?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to motivational videos or check out other users' tasks</p> */}
                    <div style={{ display: "inline-block" }} className="">

                        <Link
                            key="task_btn"
                            to="/tasks"
                            style={{
                                width: "195px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                color: "black",
                                margin: "5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
                        >
                            Earn Stars
                        </Link>
                        <Link
                            key="star_btn"
                            to="/star"
                            style={{
                                width: "300px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                color: "black",
                                margin: "5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
                        >
                            Motivational Videos
                        </Link>
                    </div>
                    <></>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                            color: "black",
                            margin: "10px"
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
                    >
                        Logout
                    </button>
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
