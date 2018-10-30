import React, { Component } from "react";
import Hand from "./Hand";
import Interface from "./Interface";
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
// Deck ID = khfqtlx30ban
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
class Table extends Component {
  state = {
    deckID: "khfqtlx30ban",
    deckStatus: {},
    cards: {},
    playerHand: [],
    playerScore: [],
    dealerHand: [],
    dealerScore: []
  };

  getDeck = () => {
    // fetch a deck and draw all 52 cards done
    // create card/deck array that players can draw from. done
    // go through deck array and set KQJ values to 10 done
    // create dealer & player "hand" arrays and add 2 cards.
    // use a timeout on the dealer drawing cards.
    // draw X cards function
    fetch("https://deckofcardsapi.com/api/deck/khfqtlx30ban/shuffle/")
      .then(results => results.json())
      .then(data => {
        this.setState({
          deckStatus: data
        });
      })
      .then(data => {
        if (this.state.deckStatus.success) {
          fetch(
            "https://deckofcardsapi.com/api/deck/khfqtlx30ban/draw/?count=52"
          )
            .then(results => results.json())
            .then(data => {
              const setValues = data.cards;
              //Change K,Q,J value to 10s and A to 11
              Object.keys(setValues).map(item => {
                if (
                  setValues[item].value === "JACK" ||
                  setValues[item].value === "QUEEN" ||
                  setValues[item].value === "KING"
                ) {
                  setValues[item].value = "10";
                }
                if (setValues[item].value === "ACE") {
                  setValues[item].value = "11";
                }
              });
              this.setState({
                cards: data.cards,
                playerHand: [],
                dealerHand: []
              });
            });
        }
      });
  };
  calcScore = hand => {
    //recieve the hand array
    // go through each card in the hand and get .value
    // convert .value to number and push into new array?
    //if score >21, check for Aces(11s) then reduce score by 10 for each ace.
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
  //Dealer logic
  // if everyone !blackjack || bust
  // must hit until the cards total 17 or more points.
  //dealer also hits on a "soft" 17, i.e. a hand containing an ace and one or more other cards totaling six.)
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
    fetch("https://deckofcardsapi.com/api/deck/khfqtlx30ban/shuffle/")
      .then(results => results.json())
      .then(data => {
        this.setState({
          deckStatus: data
        });
      });
  };
  newGame = () => {
    this.getDeck();
    this.playerHit();
    this.playerHit();
    this.dealerHit();
    this.dealerHit();
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
          <button onClick={this.newGame}>New Game</button>
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
