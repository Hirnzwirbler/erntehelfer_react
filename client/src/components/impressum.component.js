import React, { Component } from "react";

/**
 * Represents the Impressum page
 * This is a placeholder for now
 */
export default class Impressum extends Component {
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
   * Renders the impressum page
   */
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Impressum</h3>
        </header>
      </div>
    );
  }
}