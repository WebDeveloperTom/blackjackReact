import React, { Component } from "react";
import Outcome from "./Outcome";
class Interface extends Component {
  render() {
    return (
      <div>
        <Outcome />
        <div className="scoreBoard">
          <a id="dealerScore" href="">
            Dealer Score: {this.props.dealerScore}
          </a>
          <a href="">Player Score:{this.props.playerScore}</a>
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
