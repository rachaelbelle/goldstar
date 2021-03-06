import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
//importing logout user specific functions
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//importing npm packages
import StarRatingComponent from 'react-star-rating-component';
//importing styling packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        this.getAchievements()
    }

    getAchievements = () => {
        axios
            .post("/api/tasks/getAllCompletedTasks", this.props.auth.user)
            .then(res => {

                //console.log("Got data from DB, will set that in achievement view");
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
            <div className="container-fluid">
                <div style={{ marginTop: "4rem", "fontSize": "0.5vw" }} className="row ">
                    <div className="col s10 m6 l4">
                        <Link to="/dashboard" className="btn-flat waves-effect">
                            <i className="material-icons ">keyboard_backspace</i>
                            Back to dashboard
                        </Link>
                    </div>
                </div>

                <div style={{ height: "100vh" }} className="container">

                    <h1 style={{ "fontSize": "3vw" }}>Today's Achievements</h1>
                    <p style={{ "fontSize": "2vw" }}>Welcome back <span style={{ color: "gold" }}> {user.name.split(" ")[0]}</span>! Here are the gold stars you've earned so far:</p>
                    <ul style={{ margin: 10 }} className="row">{liElements}</ul>
                    <p style={{ "fontSize": "2vw" }}>You have earned {totalStars}
                        <span style={{ color: "gold" }}>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        {(totalStars > 1) ? "s" : null} today.
                </p>

                    <div className="container valign-wrapper center-align">
                        <div className="row">
                            <div style={{ display: "inline-block" }} className="landing-copy col 12 center-align">
                                <Link
                                    key="task_btn"
                                    to="/tasks"
                                    style={{
                                        width: "12vw",
                                        //borderRadius: "3px",
                                        //height: "6vh",
                                        //letterSpacing: "1.5px",
                                        //color: "black",
                                        //margin: "5px"
                                    }}
                                    className="btn waves-effect waves-light hoverable yellow accent-3"
                                >
                                   <span className="buttonText" style={{ verticalAlign: 'middle' }}> Tasks </span>
                                </Link>
                                <Link
                                    key="video_btn"
                                    to="/video"
                                    style={{
                                        width: "25vw",
                                        //borderRadius: "3px",
                                        //height: "6vh",
                                        //letterSpacing: "1px",
                                        //fontSize: "12px",
                                        //color: "black",
                                        //margin: "2px"
                                    }}
                                    className="btn waves-effect waves-light hoverable yellow accent-3"
                                >
                                    Motivational Videos
              </Link>
                            </div>
                            <div >
                                <Link
                                    key="logout"
                                    to="#"
                                    style={{
                                        width: "22vw",
                                        //borderRadius: "3px",
                                        //letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                        //color: "black",
                                        //margin: "10px"
                                    }}
                                    onClick={this.onLogoutClick}
                                    className="btn waves-effect waves-light hoverable yellow accent-3"
                                >
                                    <span style={{ marginRight: "1rem" }}>
                                        <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                                    </span>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    mapStateToProps,
    { logoutUser }
)(Earnings);
