const assert = require('assert');
const Ship = require('../models/Ship.js');
const Player = require('../models/Player.js');

describe('ship', function() {
  let ship;
  let ship2;
  let ship3;
  let arrayOfShips;
  let player;

  beforeEach(function(){
    ship = new Ship([1,2,3]);
    ship2 = new Ship([8,9]);
    ship3 = new Ship([13]);
    arrayOfShips = [ship, ship2, ship3];
    player = new Player(arrayOfShips);
  })

  it('should have an array of ships', function(){
    assert.strictEqual(3, player.ships.length);
  })

  it('should register a hit', function(){
    assert.strictEqual(true, player.checkIfHit(9));
  })

  it('should register a miss', function(){
    assert.strictEqual(false, player.checkIfHit(10));
  })

  it('should register a ship sinking', function(){
    player.checkIfHit(13);
    assert.strictEqual(2, player.ships.length);
  })
  }
)
