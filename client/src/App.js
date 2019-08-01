import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
// import Chatpage from "./components/chatpage/Chatpage";

//import Earnings from "./components/pages/achievment";
import Star from "./components/pages/Star";
import video from "./components/pages/Youtube";
import SearchBar from "./components/pages/Search_bar";
import SimpleMap from "./components/pages/maps";
import Weather from "./components/pages/weather";
import Geo from "./components/pages/geo";


import "./App.css";
import Earnings from "./components/layout/achievement_view";
import Tasks from "./components/layout/task_view";
// import navicon from "./components/pages/navicon";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/achievements" component={Earnings} />
              <PrivateRoute exact path="/star" component={Star}/>
              <PrivateRoute exact path="/video" component={video}/>
              <PrivateRoute exact path="/tasks" component={Tasks} /> 
              <PrivateRoute exact path="/maps" component={SimpleMap} />
              <PrivateRoute exact path="/weather" component={Weather}/>
              <PrivateRoute exact path="/demo" component={Geo}/>
              {/* <PrivateRoute exact path="/chatpage" component={Chatpage} /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
