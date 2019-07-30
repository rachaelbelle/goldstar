import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";
//import auth specific methods
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//importing npm packages
import StarRatingComponent from 'react-star-rating-component';
//imorting styling packages
import { Modal, Button, TextInput, Icon } from 'react-materialize';
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

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	componentDidMount() {
		this.getTasks()
	}

	getTasks = () => {
		axios
			.post("/api/tasks/getUndoneTasks", this.props.auth.user)
			.then(res => {
				console.log("Successfully got Task data from back-end.");
				this.setState({
					userData: res.data,
				})
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
			//*** TODO: add a modal saying, congratulations for completing the task!
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

				console.log("Successfully created new task in DB with id: " + res.data._id);
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
			<div className="container">
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
							? <h1 style={{ "fontSize": "3vw" }}>What amazing thing will you achieve today, {user.name.split(" ")[0]}?!</h1>
							: <h1 style={{ "fontSize": "3vw" }}>So very proud of you {user.name.split(" ")[0]}! Lets add some more <FontAwesomeIcon id='goldStarSolid' icon={faStar} /> !</h1>
					}
					{
						(userData && userData.length > 0)
							? <ul className="row" style={{ margin: 10 }}>
								{
									userData.map(task =>
										<li key={task._id} className="">
											<StarRatingComponent
												className="col s3 m3 l3"
												name={task.name}
												starCount={task.maxStars}
												value={task.curStars}
												onStarClick={this.uiStarUpdate.bind(this)}
												renderStarIcon={(index, value) => {
													return (
														<span>
															{(index <= value) ? <FontAwesomeIcon id='goldStarSolid' pull="left" icon={faStar} /> : <FontAwesomeIcon id='goldStarEmpty' pull="left" icon={faStarEmpty} />}
														</span>
													);
												}}
											/>
											<span id="taskname" className="col s6 m6 l6 offset-s1 offset-m1 offset-l1"> {task.name} </span>
										</li>
									)
								}
							</ul>
							: null
					}

					<Modal header="Adding task" open={showModal} trigger={<Button className="btn modal-btn btn-medium waves-effect waves-light hoverable yellow accent-3" >Add new Task</Button>}>
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
											{(index <= value) ? <FontAwesomeIcon id='goldStarSolid' icon={faStar} /> : <FontAwesomeIcon id='goldStarEmpty' icon={faStarEmpty} />}
										</span>
									);
								}}
							/>
						</form>
						<Button className="btn btn-large waves-effect waves-light hoverable yellow accent-3" waves="light" style={{ marginRight: '5px' }} onClick={this.closeModal}>
							Cancel
            </Button >
						<Button className="btn btn-large waves-effect waves-light hoverable yellow accent-3" type="submit" waves="light" onClick={this.saveTask}>
							Save
              <Icon right>
								send
                </Icon>
						</Button>
					</Modal>

					<>
						<p></p>
					</>
					<div style={{ display: "inline-block" }} className="col 12">
						<Link
							key="achievement_btn"
							to="/achievements"
							style={{
								width: "195px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								color: "black",
								margin: "5px"
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
							className="btn btn-large waves-effect waves-light hoverable yellow accent-3">
							Motivational Videos
			</Link>
						<>
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
								className="btn btn-large waves-effect waves-light hoverable yellow accent-3">
								Logout
							</button>
						</>
					</div>
				</>
			</div>
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
	mapStateToProps,
	{ logoutUser }
)(Tasks);
