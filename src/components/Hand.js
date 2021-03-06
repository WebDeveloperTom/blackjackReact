import React, { Component } from "react";
import Card from "./Card";

class Hand extends Component {
  render() {
    const { cards } = this.props;
    return (
      <div className="hand">
        {Object.keys(cards).map(item => {
          // key will only work for one deck
          return <Card key={cards[item].code} card={cards[item]} />;
        })}
      </div>
    );
  }
}

export default Hand;
