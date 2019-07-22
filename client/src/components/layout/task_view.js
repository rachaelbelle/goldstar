import React, { Component } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Modal, Button, TextInput, Icon } from 'react-materialize';
import { Link } from "react-router-dom";

class Tasks extends React.Component {

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

    taskStarUpdate = (data) => {
        this.setState({
            taskStars: data.currentTarget.value,
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
            taskStars: ''
        })
    }

    render() {
        const { user } = this.props.auth;
        const { userData, showModal, taskName, taskStars } = this.state;
        return (
            <>
                <>
                    <h1>Ready to kill it today, {user.name}?</h1>
                    <ul>{
                        userData.map(task =>
                            <li>Stars: {task.stars} Name: {task.name}</li>
                        )
                    }
                    </ul>
                    <Modal header="Modal Header" open={showModal} trigger={<Button >Click to add new Task</Button>}>
                        <p>
                            Please type stuff
                    </p>
                        <form>
                            <TextInput label="Task name" data-length={10} value={taskName} onChange={this.taskNameUpdate} />
                            <TextInput label="Difficulty" data-length={10} value={taskStars} onChange={this.taskStarUpdate} />
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


                    <p>Want to see how great you're already doing?</p>
                    <p>Go to My Achievements</p>
                    <p>Need some motivation?</p>
                    <p>Go to motivational videos or check out other users' tasks</p>
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

const mapStateToProps = state => ({
    auth: state.auth
})


Tasks.propTypes = {
    auth: PropTypes.object.isRequired
}
export default connect(
    mapStateToProps
)(Tasks)
