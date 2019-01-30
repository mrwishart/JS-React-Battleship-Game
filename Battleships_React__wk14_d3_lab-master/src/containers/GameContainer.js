import React, {Component, Fragment} from 'react';
import GameGrid from "../components/GameGrid.js";
import PubSub from "../helpers/PubSub.js";
import Win from "../components/Win.js";

class GameContainer extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      playerOneClicks: {},
      playerTwoClicks: {},
      gameWon: false,
      playerOnesTurn: true
    }
    this.currentClick = null;
    this.bindEvents();
  }

  bindEvents(){
    PubSub.subscribe("Game:clickProcessed", (event) => {
      const clickResult = event.detail;
      if (clickResult !== null){
      this.processResult(clickResult);
    }
    })

    PubSub.subscribe("Game:gameWon", (event) => {
      this.processWin()
    })
  }

  processWin(){
    this.setState({gameWon: true})
  }

  processResult(clickResult){
    const currentClicks = this.returnPlayerClicks();
    currentClicks[this.currentClick] = clickResult;
    this.updateGrid(currentClicks);
    this.changeTurn();
  }

  handleClick(squareId){
    this.currentClick = squareId;
    const gameObject = {
      squareID: squareId,
      isPlayerOneTurn: this.state.playerOnesTurn
    }
    PubSub.publish("GameContainer:click", gameObject);
  }

  returnPlayerClicks(){
    return this.state.playerOnesTurn ? this.state.playerOneClicks : this.state.playerTwoClicks;
  }

  changeTurn(){
    this.setState({playerOnesTurn: !this.state.playerOnesTurn});
  }

  updateGrid(currentClicks){
    if (this.state.playerOnesTurn){
      this.updatePlayerOneGrid(currentClicks);
    } else {
      this.updatePlayerTwoGrid(currentClicks);
    }
  }

  updatePlayerOneGrid(currentClicks){
    this.setState({playerOneClicks: currentClicks});
  }

  updatePlayerTwoGrid(currentClicks){
    this.setState({playerTwoClicks: currentClicks});
  }

  playerOneGrid(){
    return this.state.playerOnesTurn && !this.state.gameWon;
  }

  playerTwoGrid(){
    return !this.state.playerOnesTurn && !this.state.gameWon;
  }

  render(){
    return (
      <Fragment>
      <h2>Jake and Paul's Awesome Skirmish Vessels</h2>
      <GameGrid containerClickHandler={this.handleClick} currentClicks={this.state.playerOneClicks} clickable={this.playerOneGrid()}/>
      <GameGrid containerClickHandler={this.handleClick} currentClicks={this.state.playerTwoClicks} clickable={this.playerTwoGrid()}/>
      <Win gameWon={this.state.gameWon}/>
      </Fragment>
    );
  }
}


export default GameContainer;
