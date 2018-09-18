import React, { Component } from "react";
import Card from "./Card";

class Hand extends Component {
  render() {
    const { cards } = this.props;
    return (
      <div className="hand">
        {Object.keys(cards).map(item => {
          console.log(cards[item]);
          return <Card card={cards[item]} />;
        })}
      </div>
    );
  }
}

export default Hand;
