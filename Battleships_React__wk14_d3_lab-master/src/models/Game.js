import PubSub from "../helpers/PubSub.js";

class Game {
  constructor(playerA, playerB){
    this.player = [playerA, playerB];
    this.playerPicks = [[],[]];
    this.currentPlayer = 0;
    this.currentClick = null;
  }

  bindEvents(){
    PubSub.subscribe("GameContainer:click", (event) => {
      this.processClick(event.detail);
    })
  }

  processClick({squareID, isPlayerOneTurn}){

    this.updateCurrentPlayer(isPlayerOneTurn);
    this.updateCurrentClick(squareID)

    if (this.isAlreadyClicked()) {
      PubSub.publish("Game:clickProcessed", null);
    }
    else
    {
      const result = this.checkHitOrMiss();
      PubSub.publish("Game:clickProcessed", result);

      this.updatePlayerPicks();

      if (this.isWon()) {
        PubSub.publish("Game:gameWon", this.currentPlayer);
      }
    }
  }

  checkHitOrMiss(){
    return this.player[this.currentPlayer].checkIfHit(this.currentClick);
  }

  updateCurrentPlayer(isPlayerOne){
    this.currentPlayer = isPlayerOne ? 0 : 1;
  }

  updatePlayerPicks(){
    this.playerPicks[this.currentPlayer].push(this.currentClick);
  }

  updateCurrentClick(squareID){
    this.currentClick = squareID;
  }

  isAlreadyClicked(){
    return this.playerPicks[this.currentPlayer].includes(this.currentClick)
  }

  isWon(){
    return this.player[this.currentPlayer].ships.length === 0;
  }
}

export default Game;
