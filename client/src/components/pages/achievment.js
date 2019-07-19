import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

class Earnings extends Component {

    state = {
        listAchievments :[]
    }


    render() {
        return (
            <div>
                <h1>Today's Earnings</h1>
                <p>Welcome back! Here are the gold stars you've earned so far:</p>
                <ul>{this.state.listAchievments}</ul>
            </div>
        );
        }

}  


export default Earnings;