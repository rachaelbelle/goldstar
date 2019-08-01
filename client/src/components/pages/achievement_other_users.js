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
import { faStar, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

class EarningsOthers extends Component {

    constructor(props) {
        super(props);

        this.addTask = this.addTask.bind(this);

        this.state = {
            userData: [],
            showModalOK: false,
            showModalError: false,
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        this.getAchievements()
    }

    addTask = (taskId) => {

        if (typeof taskId !== 'undefined' && taskId && taskId !== null && taskId !== ''
            && taskId.target.id !== null && taskId.target.id !== '') {

            axios
                .post("/api/tasks/getTaskById", { id: taskId.target.id })
                .then(res => {

                    let newData = res.data;
                    newData.curStars = 0;
                    newData.user = this.props.auth.user;
                    newData.completed = false;
                    delete newData.date;
                    delete newData._id;
                    delete newData.__v;

                    axios
                        .post("/api/tasks/createNewTask", newData)
                        .then(res => {

                            console.log("Successfully created new task in DB.");
                        })
                        .catch(err => {
                            console.log("Errored when trying to save task");
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log("Errored when trying to get other users task");
                    console.log(err);
                });
        }
    }


    getAchievements = () => {
        axios
            .post("/api/tasks/getCompletedTasksNotUser", this.props.auth.user)
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
        let liElements = [];

        userData.forEach(task => {
            liElements.push(
                <div className="container">
                    <li key={task._id} id="tasks" className="row" onClick={this.addTask}>
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
                        <span id={task._id} className="col s4 m4 l4 offset-s2 offset-m2 offset-l2"> {task.name} </span>
                        <span id={task._id}>
                            <FontAwesomeIcon id='goldStarSolid' pull="left" icon={faPlus} />
                        </span>
                    </li>
                </div>

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
                    <h1 style={{ "fontSize": "4vw" }}>Completed Tasks From Other Users</h1>
                    <p style={{ "fontSize": "2vw" }}>Hi <span style={{ color: "gold" }}> {user.name.split(" ")[0]}</span>, lets add a task from a list of other users completed tasks:</p>
                    <ul style={{ margin: 10 }} className="row">{liElements}</ul>
                </div>

				<div className="container valign-wrapper">
                  <div className="row">
                    <div style={{ display: "inline-block" }} className="landing-copy col 12">
					   <Link
                          key="task_btn"
                          to="/tasks"
                          style={{
                          width: "12vw",
                        }}
                         className="btn waves-effect waves-light hoverable yellow accent-3">
								Tasks
							</Link>
							<Link
								key="video_btn"
								to="/video"
								style={{
								width: "25vw",
								}}
								className="btn waves-effect waves-light hoverable yellow accent-3">
								Motivational Videos
							</Link>
                                <Link
                                    key="map_btn"
                                    to="/maps"
                                    style={{
                                        width: "25vw",
                                    }}
                                    className="btn waves-effect waves-light hoverable yellow accent-3">
                                    User Locations
              				</Link>
                            </div>
                        </div>
                        <div className="container">
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
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

EarningsOthers.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    { logoutUser }
)(EarningsOthers);
