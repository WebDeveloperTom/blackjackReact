import React, { Component } from "react";
import Hand from "./Hand";
import Interface from "./Interface";
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// Deck ID = 8hqxk8fao730
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S
class Table extends Component {
  state = {
    deckID: "8hqxk8fao730"
  };
  getDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(results => results.json())
      .then(data => {
        console.log(data);
        this.setState({
          deckStatus: data
        });
      });
  };

  render() {
    return (
      <div className="table">
        <Hand />
        <Interface getDeck={this.getDeck} />
        <Hand />
      </div>
    );
  }
}
export default Table;
