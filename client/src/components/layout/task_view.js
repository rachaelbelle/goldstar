import React, { Component } from "react";
import Axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Modal, Button, TextInput, Icon } from 'react-materialize';
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';

class Tasks extends Component {

    state = {
        userData: [],
        showModal: false,
        taskStars: '',
        taskName: ''
    };

    componentDidMount() {
        this.getTasks()
    }

    getTasks = () => {
        const data = [
            {
                stars: 2,
                name: 'Buy groceries'
            },
            {
                stars: 3,
                name: 'Apply to 5 jobs'
            }
        ]
        this.setState({ userData: data })
    }

    openModal = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = () => {
        // console.log("Closing modal")
        this.setState({
            showModal: false
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

    saveTask = () => {
        //make call to db
        //axios post data to express route
        //ICEBOX if error show error
        //if no error then save
        const { userData, taskName, taskStars } = this.state;

        // console.log("New Task data is: ");
        // console.log(taskName+", "+taskStars);

        let newData = userData.slice(0);
        let newTask = {
            stars: taskStars,
            name: taskName
        };
        newData.push(newTask);

        // console.log("New array is: ")
        // console.log(newData)

        this.closeModal();
        this.setState({
            userData: newData,
            taskName: '',
            taskStars: 0
        })
    }

    render() {
        const { user } = this.props.auth;
        const { userData, showModal, taskName, taskStars } = this.state;
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
                    <h1 style={{ "fontSize": "3vw" }}>Ready to kill it today, {user.name.split(" ")[0]}?</h1>
                    <ul>{
                        userData.map(task =>
                            <li key={task.name} style={{ margin: 10, display: "inline-block" }} className="container left-align">
                                <div  style={{
                                                "fontSize": "5vw",

                                                '*, *:before, *:after': {
                                                    "fontSize": "5vw",
                                                    "verticalAlign": "middle"
                                                }
                                            }}
                                > 
                                    <StarRatingComponent
                                        name={task.name}
                                        starCount={task.stars}
                                        value={task.stars}
                                        editing={false}
                                    />
                                    <span style={{"fontSize": "2vw", paddingLeft: "25px"}} >Name: {task.name} </span> 
                                </div>
                            </li>
                        )
                    }
                    </ul>
                    <Modal header="Adding task" open={showModal} trigger={<Button >Click to add new Task</Button>}>
                        <p style={{ "fontSize": "2vw" }}>
                            Don't fear adding... you can do it <span style={{color: "gold"}}> {user.name.split(" ")[0]}!</span>
                        </p>
                        <form>
                            <TextInput label="Task name" data-length={10} value={taskName} onChange={this.taskNameUpdate} />
                            <StarRatingComponent
                                name="rate1"
                                //   style ={{
                                //       width: "140px",

                                //   }}
                                starCount={5}
                                value={taskStars}
                                onStarClick={this.taskStarUpdate.bind(this)}
                            />
                        </form>
                        <Button waves="light" style={{ marginRight: '5px' }} onClick={this.closeModal}>
                            Cancel
                    </Button>
                        <Button type="submit" waves="light" onClick={this.saveTask}>
                            Save
                        <Icon right>
                                send
                        </Icon>
                        </Button>
                    </Modal>


                    <p style={{ "fontSize": "2vw" }}>Want to see how great you're already doing?</p>
                    <p style={{ "fontSize": "2vw" }}>Go to My Achievements</p>
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


Tasks.propTypes = {
    auth: PropTypes.object.isRequired
}
export default connect(
    mapStateToProps
)(Tasks)
