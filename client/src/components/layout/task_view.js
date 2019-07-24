import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Modal, Button, TextInput, Icon } from 'react-materialize';
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';

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
        const data = [
            {
                curStars: 1,
                maxStars: 2,
                name: 'Buy groceries'
            },
            {
                curStars: 2,
                maxStars: 5,
                name: 'Apply to 5 jobs'
            }
        ]

        axios
        .post("/api/tasks/getUndoneTasks", this.props.auth.user)
        .then(res => {
            
            if( res.data.length === 0 ) {
                console.log("Tasks returned are 0, will use local table");
                this.setState({ 
                    userData: data, 
                })
            } else {
                console.log("Got data from DB, will set that in task view");
                this.setState({ 
                    userData: res.data, 
                })
            }

        })
        .catch(err => {
            console.log("Errored out when getting task data: "+err);
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

    uiStarUpdate(nextValue, prevValue, name){
        debugger;

        const { userData } = this.state;
        const user = this.props.auth.user.name;

        const updateTask = {
            oldStars: prevValue,
            newStars: nextValue,
            name,
            user
        };

        axios
        .post("/api/tasks/updateTask/", updateTask)
        .then(res => {
            
            debugger;

            userData.forEach( task => {
                if( task.name === name ){
                    task.stars = nextValue;
                }
            })

            this.setState({
                userData
            })

        })
        .catch(err => {
            console.log("Errored out when getting task data: "+err);
        });

       

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
            curStars: 0,
            maxStars: taskStars,
            name: taskName,
            user: this.props.auth.user,
        };
        newData.push(newTask);

        axios
        .post("/api/tasks/createNewTask", newTask)
        .then(res => {

            console.log(res.data);
            debugger;

        })
        .catch(err =>
            {
                console.log("Errored when trying to save task");
            }
        );

        this.closeModal();
        this.setState({
            userData: newData,
        })
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
                    <h1 style={{ "fontSize": "3vw" }}>Ready to kill it today, {user.name.split(" ")[0]}?</h1>
                    <ul>{
                        userData.map(task =>
                            <li key={task.name} style={{ margin: 10, display: "inline-block" }} className="container left-align">
                                    <StarRatingComponent
                                        name={task.name}
                                        starCount={task.maxStars}
                                        value={task.curStars}
                                        onStarClick={this.uiStarUpdate.bind(this)}
                                    />
                                    <span style={{"fontSize": "2vw", paddingLeft: "25px"}} >Name: {task.name} </span> 
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
