import React, { Component } from "react";

class Card extends Component {
  render() {
    const { card } = this.props;
    return (
      <div>
        <img src={card.image} alt="" />
      </div>
    );
  }
}
export default Card;
