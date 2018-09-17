import React, { Component } from "react";
import Hand from "./Hand";
import Interface from "./Interface";
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
class Table extends Component {
  state = {
    var: 1
  };
  render() {
    return (
      <div className="table">
        <Hand />
        <Interface />
        <Hand />
      </div>
    );
  }
}
export default Table;
