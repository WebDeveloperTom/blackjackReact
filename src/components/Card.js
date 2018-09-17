import React, { Component } from "react";

class Card extends Component {
  render() {
    const { img } = this.props;
    return (
      <div>
        <img src={img} alt="" />
      </div>
    );
  }
}
export default Card;
