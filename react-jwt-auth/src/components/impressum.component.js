import React, { Component } from "react";

export default class Impressum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

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