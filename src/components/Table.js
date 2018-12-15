import React, { Component } from "react";
import Hand from "./Hand";
import Interface from "./Interface";
import "../App.css";
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
class Table extends Component {
  state = {
    deckID: "",
    deckStatus: {},
    cards: {},
    playerHand: [],
    playerScore: [],
    dealerHand: [],
    dealerScore: 0,
    bust: false
  };

  componentDidMount() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(response => response.json())
      .then(data => {
        this.setState({
          deckID: data.deck_id
        });
      })
      .then(() => {
        this.getDeck();
      });
  }

  getDeck = () => {
    // fetch a deck and draw all 52 cards done
    // create card/deck array that players can draw from. done
    // go through deck array and set KQJ values to 10 done
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/shuffle/`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          deckStatus: data
        });
      })
      .then(data => {
        if (this.state.deckStatus.success) {
          fetch(
            `https://deckofcardsapi.com/api/deck/${
              this.state.deckID
            }/draw/?count=52`
          )
            .then(results => results.json())
            .then(data => {
              //need to rename variable
              const setValues = data.cards;
              //Change K,Q,J value to 10s and A to 11
              Object.keys(setValues).forEach(function(item) {
                if (
                  setValues[item].value === "JACK" ||
                  setValues[item].value === "QUEEN" ||
                  setValues[item].value === "KING"
                ) {
                  setValues[item].value = 10;
                } else if (setValues[item].value === "ACE") {
                  setValues[item].value = 11;
                } else {
                  setValues[item].value = Number(setValues[item].value);
                }
              });
              this.setState({
                cards: data.cards
              });
            });
        }
      });
  };

  playerHit = () => {
    const cards = [...this.state.cards];
    const rmvCard = cards.splice(1, 1);
    const playerHand = [...this.state.playerHand, ...rmvCard];
    //work out players score
    const hand = playerHand.map(item => {
      return item.value;
    });
    let score = this.checkScore(hand);
    //if score >21, check for Aces(11s) then reduce score by 10 for each ace.

    this.setState({
      cards: cards,
      playerHand: playerHand,
      playerScore: score
    });
  };
  checkScore = hand => {
    let score = hand.reduce(function(total, num) {
      return total + num;
    }, 0);
    if (score > 21) {
      hand.forEach(function(item) {
        if (item === 11) {
          score -= 10;
        }
      });
    }
    return score;
  };
  //Dealer logic
  // if everyone !blackjack || !bust
  // must hit until the cards total 17 or more points.
  //dealer also hits on a "soft" 17, i.e. a hand containing an ace and one or more other cards totaling six.)
  playerStand = () => {
    while (this.state.dealerScore < 17) {
      this.dealerHit();
    }
  };
  dealerHit = () => {
    const cards = [...this.state.cards];
    const rmvCard = cards.splice(1, 1);
    const dealerHand = [...this.state.dealerHand, ...rmvCard];
    //work out players score
    const hand = dealerHand.map(item => {
      return item.value;
    });
    let score = this.checkScore(hand);
    //if score >21, check for Aces(11s) then reduce score by 10 for each ace.

    this.setState({
      cards: cards,
      dealerHand: dealerHand,
      dealerScore: score
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
          <p>Deck ID is: {this.state.deckID}</p>
          <button onClick={this.shuffleDeck}>Shuffle Deck</button>
          {this.state.playerScore > 21 ? (
            <button>BUST</button>
          ) : (
            <button onClick={this.playerHit}>Player Hit</button>
          )}

          <button onClick={this.dealerHit}>Dealer Hit</button>
          <button onClick={this.newGame}>New Game</button>
        </div>
        <div className="table">
          <Hand cards={this.state.dealerHand} />
          <Interface
            playerScore={this.state.playerScore}
            playerHand={this.state.playerHand}
            dealerHand={this.state.dealerHand}
            dealerScore={this.state.dealerScore}
          />
          <Hand cards={this.state.playerHand} />
        </div>
      </div>
    );
  }
}
export default Table;
