import React, { Component } from "react";
import Outcome from "./Outcome";
class Interface extends Component {
  render() {
    return (
      <div>
        <Outcome />
        <div className="scoreBoard">
          <a href="">Dealer Score: </a>
          <a href="">Player Score: </a>
        </div>
        <div className="buttons">
          <button id="deal">Deal</button>
          <button id="hit">Hit</button>
          <button id="stand">Stand</button>
        </div>
      </div>
    );
  }
}

export default Interface;
