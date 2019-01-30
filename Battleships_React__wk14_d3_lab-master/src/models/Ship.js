
class Ship {
  constructor(arrayOfSquareIDs){
    this.squareIDs = arrayOfSquareIDs;

  }

  isHit(clickID){
    for (var i = 0; i < this.squareIDs.length; i++) {
      if (this.squareIDs[i] === clickID) {
        this.squareIDs.splice(i, 1);
        return true
      }
    }
    return false;
  }

  isSunk(){
    return this.squareIDs.length === 0;
  }
}

export default Ship;
