import React, { Component } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import API from "./apiland"
// api is...
// const api = {
//     get: function() {
//         Axios.get("/achievements")
//     }
// }




class Earnings extends React.Component {

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
            liElements.push(<li>Stars: {task.stars}, Name: {task.name}</li>);
        });

        return (
            <>
                <>
                    <h1>Today's Earnings</h1>
                    <p>Welcome back {user.name}! Here are the gold stars you've earned so far:</p>
                    <ul>{
                        // removing map so we dont traverse the array twice, once for stars, and once for li elements
                        // userData.map(task => 
                        //     <li>Stars: {task.stars}, Name: {task.name}</li>
                        // )
                        liElements
                    }
                    </ul>
                    <p>You have earned {totalStars} stars today.</p>
                    <p>Ready to earn some more stars?</p>
                    <p>Go to My Tasks</p>
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


Earnings.propTypes = {
    auth: PropTypes.object.isRequired
}
export default connect(
    mapStateToProps
)(Earnings)
