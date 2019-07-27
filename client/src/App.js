import React, { Component } from "react";
import { Provider } from "react-redux";
//auth specific imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
//middleware and private routes
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
//UI pages - layout
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
//UI pages - auth
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//UI - post login pages
import Dashboard from "./components/dashboard/Dashboard";
// import Chatpage from "./components/chatpage/Chatpage";

//import Earnings from "./components/pages/achievment";
import Star from "./components/pages/Star";
import video from "./components/pages/Youtube";
import SearchBar from "./components/pages/Search_bar";
import DirectionMap from "./components/pages/maps";

//Styling
import "./App.css";

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

console.log("&&&&&&&&&&&&&& Process ENV Variables UI &&&&&&&&&&&&&&&&&&");
console.log(process.env);


class App extends Component {

  render() {

    console.log("*********** Process ENV Variables UI *******");
    console.log(process.env);

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
              <PrivateRoute exact path="/video" component={video}/>
              <PrivateRoute exact path="/tasks" component={Tasks} />
              <PrivateRoute exact path="/maps" component={DirectionMap} />
              {/* <PrivateRoute exact path="/chatpage" component={Chatpage} /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
