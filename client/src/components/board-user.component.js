import React, { Component } from "react";

import UserService from "../services/user.service";

/**
 * Represents the User Board
 * This is a placeholder for now
 */
export default class BoardUser extends Component {
  /**
   * @constructor
   * @param {Any} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  /**
   * Checks the token
   */
  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  /**
   * renders the User Board
   */
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}