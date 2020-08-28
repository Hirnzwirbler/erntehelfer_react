  
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import BoardFarmer from "./components/board-farmer.component";
import BoardHelper from "./components/board-helper.component";
import Impressum from "./components/impressum.component";

/**
 * Represents the whole Web Application
 */
class App extends Component {
  /**
   * 
   * @param {Any} props - It's a React thing
   */
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showFarmerBoard: false,
      showHelperBoard: false,
      currentUser: undefined
    };
  }

  /**
   * Checks the roles of the logged in user
   */
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showFarmerBoard: user.roles.includes("ROLE_FARMER"),
        showHelperBoard: user.roles.includes("ROLE_HELPER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  /**
   * Logs out the current user
   */
  logOut() {
    AuthService.logout();
  }

  /**
   * Render of the navbar
   */
  render() {
    const { currentUser, showAdminBoard, showFarmerBoard, showHelperBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Erntehelfer Portal
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/impressum"} className="nav-link">
                  Impressum
                </Link>
              </li>

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {showFarmerBoard && (
                <li className="nav-item">
                  <Link to={"/farmer"} className="nav-link">
                    Farmer Board
                  </Link>
                </li>
              )}

              {showHelperBoard && (
                <li className="nav-item">
                  <Link to={"/helper"} className="nav-link">
                    Helper Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/farmer" component={BoardFarmer} />
              <Route path="/helper" component={BoardHelper} />
              <Route path="/impressum" component={Impressum} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;