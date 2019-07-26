import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Modal, Button, TextInput, Icon } from 'react-materialize';
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Tasks extends Component {

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
        this.getTasks()
    }

    getTasks = () => {
        // const data = [
        //     {
        //         curStars: 1,
        //         maxStars: 2,
        //         name: 'Buy groceries'
        //     },
        //     {
        //         curStars: 2,
        //         maxStars: 5,
        //         name: 'Apply to 5 jobs'
        //     }
        // ]

        axios
            .post("/api/tasks/getUndoneTasks", this.props.auth.user)
            .then(res => {

                // if( res.data.length === 0 ) {
                //     console.log("Tasks returned are 0, will use local table");
                //     this.setState({ 
                //         userData: data, 
                //     })
                // } else {
                console.log("Got data from DB, will set that in task view");
                this.setState({
                    userData: res.data,
                })
                // }

            })
            .catch(err => {
                console.log("Errored out when getting task data: " + err);
            });

    }

    openModal = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = () => {
        // console.log("Closing modal")
        this.setState({
            showModal: false,
            taskName: '',
            taskStars: 0
        })
    }

    taskNameUpdate = (data) => {
        this.setState({
            taskName: data.currentTarget.value,
            showModal: true
        })
    }

    taskStarUpdate(nextValue, prevValue, name) {

        this.setState({
            taskStars: nextValue,
            showModal: true
        })
    }

    uiStarUpdate = (nextValue, prevValue, name) => {

        if (prevValue >= nextValue) {
            //*** TODO: add a modal saying you cant remove stars
            return null;
        }

        const { userData } = this.state;
        let taskId = '';
        let maxStars;
        let completed = false;
        let newTaskArray = [];

        userData.forEach(task => {
            if (task.curStars === prevValue && task.name === name) {
                taskId = task._id;
                maxStars = task.maxStars;
            }
        })

        if (nextValue === maxStars) {
            completed = true;
        }

        const updateTask = {
            newStars: nextValue,
            name,
            taskId,
            completed
        };

        axios
            .post("/api/tasks/updateTask/", updateTask)
            .then(res => {

                if (completed) {
                    newTaskArray = userData.filter(function (task) { return task._id !== taskId });
                } else {
                    newTaskArray = userData.map(task => {
                        if (task._id === taskId) {
                            task.curStars = nextValue
                            return task;
                        } else {
                            return task;
                        }
                    })
                }


                this.setState({
                    userData: newTaskArray
                })

            })
            .catch(err => {
                console.log("Errored out when getting task data: " + err);
            });
    }

    saveTask = () => {

        //*** TODO check that task name and difficulty is not already created */

        const { userData, taskName, taskStars } = this.state;

        // console.log("New Task data is: ");
        // console.log(taskName+", "+taskStars);

        console.log("My user is: ");
        console.log(this.props.auth.user)

        let newData = userData.slice(0);
        let newTask = {
            curStars: 0,
            maxStars: taskStars,
            name: taskName,
            user: this.props.auth.user,
        };


        axios
            .post("/api/tasks/createNewTask", newTask)
            .then(res => {

                console.log("Successfully created new task in DB: ");
                console.log(res.data);
                newData.push({ curStars: 0, maxStars: taskStars, name: taskName, '_id': res.data._id, completed: false });


                this.closeModal();
                this.setState({
                    userData: newData,
                })
            })
            .catch(err => {
                console.log("Errored when trying to save task");
                console.log(err);
                this.closeModal();
            });
    }

    render() {
        const { user } = this.props.auth;
        const { userData, showModal, taskName, taskStars } = this.state;

        console.log("user is: ");
        console.log(user);

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
                    {
                        (userData && userData.length > 0)
                            ? <h1 style={{ "fontSize": "3vw" }}>Ready to kill it today, {user.name.split(" ")[0]}?</h1>
                            : <h1 style={{ "fontSize": "3vw" }}>You are Killing it {user.name.split(" ")[0]}! Lets add some more <FontAwesomeIcon id='goldStarSolid' icon={faStar} /> !</h1>
                    }
                    {
                        (userData && userData.length > 0)
                            ? <ul className="row" style={{ margin: 10 }}>
                                {
                                    userData.map(task =>
                                        <li key={task._id} className="col s10 m10 l10 left left-align">
                                            <StarRatingComponent
                                                className="col s4 m4 l4"
                                                name={task.name}
                                                starCount={task.maxStars}
                                                value={task.curStars}
                                                onStarClick={this.uiStarUpdate.bind(this)}
                                                renderStarIcon={(index, value) => {
                                                    return (
                                                        <span>
                                                            {(index <= value) ? <FontAwesomeIcon id='goldStarSolid' pull="left" icon={faStar} /> : <FontAwesomeIcon pull="left" icon={faStarEmpty} />}
                                                        </span>
                                                    );
                                                }}
                                            />
                                            <span id="taskname" className="col s5 m5 l5 left left-align offset-s1 offset-m1 offset-l1"> {task.name} </span>
                                        </li>
                                    )
                                }
                            </ul>
                            : null
                    }
                    <Modal header="Adding task" open={showModal} trigger={<Button >Click to add new Task</Button>}>
                        <p style={{ "fontSize": "2vw" }}>
                            Don't fear adding... you can do it <span style={{ color: "gold" }}> {user.name.split(" ")[0]}!</span>
                        </p>
                        <form>
                            <TextInput label="Task name" data-length={10} value={taskName} onChange={this.taskNameUpdate} />
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={taskStars}
                                onStarClick={this.taskStarUpdate.bind(this)}
                                renderStarIcon={(index, value) => {
                                    return (
                                        <span>
                                            {(index <= value) ? <FontAwesomeIcon id='goldStarSolid' icon={faStar} /> : <FontAwesomeIcon icon={faStarEmpty} />}
                                        </span>
                                    );
                                }}

                            />
                        </form>
                        <Button waves="light" style={{ marginRight: '5px' }} onClick={this.closeModal}>
                            Cancel
                    </Button >
                        <Button type="submit" waves="light" onClick={this.saveTask}>
                            Save
                        <Icon right>
                                send
                        </Icon>
                        </Button>
                    </Modal>

                    <></>
                    {/* <p style={{ "fontSize": "2vw" }}>Want to see how great you're already doing?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to My Achievements</p>
                    <p style={{ "fontSize": "2vw" }}>Need some motivation?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to motivational videos or check out other users' tasks</p> */}
                    <div style={{ display: "inline-block" }} className="">
                        <Link
                            key="achievement_btn"
                            to="/achievements"
                            style={{
                                width: "195px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                color: "black",
                                margin: "5px",
                            }}
                            className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
                        >
                            Achievements
              </Link>
              <Link
                key="video_btn"
                to="/video"
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
                    <div></div>
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


Tasks.propTypes = {
    auth: PropTypes.object.isRequired
}
export default connect(
    mapStateToProps
)(Tasks)
