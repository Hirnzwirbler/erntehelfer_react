import React, { Component } from "react";

import UserService from "../services/user.service";

/**
 * Represents the Helper Board
 * Is a placeholder for now
 */
export default class BoardHelper extends Component {
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
   * Checks the role of the user and the token
   */
  componentDidMount() {
    UserService.getHelperBoard().then(
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
   * Renders the Helper Board
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