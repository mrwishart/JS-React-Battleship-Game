
class Player {
  constructor(ships){
    this.ships = ships;
  }

  checkIfHit(squareID){
    for (var i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      if( ship.isHit(squareID) ) {
        if (ship.isSunk()) {
          this.ships.splice(i, 1);
        }
        return true;
      }
    }
    return false;
  }

}

export default Player;
