import React, { Component } from "react";
import Card from "./Card";

class Hand extends Component {
  render() {
    return (
      <div>
        <Card img="https://deckofcardsapi.com/static/img/KH.png" />
        <Card img="https://deckofcardsapi.com/static/img/8C.png" />
      </div>
    );
  }
}

export default Hand;
