import React, { Component } from "react";
import Hand from "./Hand";
import Interface from "./Interface";
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
// Deck ID = 8hqxk8fao730
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
class Table extends Component {
  state = {
    deckID: "8hqxk8fao730",
    deckStatus: {},
    deckRemaining: {}
  };
  getDeck = () => {
    // fetch a deck and draw all 52 cards
    // create card/deck array that players can draw from.
    // go through deck array and set KQJ values to 10
    // create dealer & player "hand" arrays and add 2 cards.
    fetch("https://deckofcardsapi.com/api/deck/8hqxk8fao730/shuffle/")
      .then(results => results.json())
      .then(data => {
        console.log(data);
        this.setState({
          deckStatus: data
        });
      })
      .then(date => {
        if (this.state.deckStatus.success) {
          fetch(
            "https://deckofcardsapi.com/api/deck/8hqxk8fao730/draw/?count=52"
          )
            .then(results => results.json())
            .then(data => {
              this.setState({
                deckStatus: data.cards,
                deckRemaining: data.remaining
              });
            });
        }
      });
  };
  playerHit = () => {
    // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=52
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
