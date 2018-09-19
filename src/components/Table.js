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
    deckRemaining: {},
    cards: {},
    playerHand: [],
    dealerHand: []
  };
  getDeck = () => {
    // fetch a deck and draw all 52 cards
    // create card/deck array that players can draw from.
    // go through deck array and set KQJ values to 10
    // create dealer & player "hand" arrays and add 2 cards.
    // use a timeout on the dealer drawing cards.
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
                cards: data.cards,
                deckRemaining: data.remaining,
                playerHand: [],
                dealerHand: []
              });
            });
        }
      });
  };
  playerHit = () => {
    const cards = [...this.state.cards];
    const rmvCard = cards.splice(1, 1);
    const playerHand = [...this.state.playerHand, ...rmvCard];
    this.setState({
      cards: cards,
      playerHand: playerHand
    });
  };
  dealerHit = () => {
    const cards = [...this.state.cards];
    const rmvCard = cards.splice(1, 1);
    const dealerHand = [...this.state.dealerHand, ...rmvCard];
    this.setState({
      cards: cards,
      dealerHand: dealerHand
    });
  };
  shuffleDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/8hqxk8fao730/shuffle/")
      .then(results => results.json())
      .then(data => {
        this.setState({
          deckStatus: data,
          deckRemaining: data.remaining
        });
      });
  };

  render() {
    return (
      <div>
        <div id="admin">
          <p>Admin Pannel - To Be Removed</p>
          <button onClick={this.shuffleDeck}>Shuffle Deck</button>
          <button onClick={this.getDeck}>Get/Load Deck</button>
          <button onClick={this.playerHit}>Player Hit</button>
          <button onClick={this.dealerHit}>Dealer Hit</button>
        </div>
        <div className="table">
          <Hand cards={this.state.dealerHand} />
          <Interface getDeck={this.getDeck} />
          <Hand cards={this.state.playerHand} />
        </div>
      </div>
    );
  }
}
export default Table;
