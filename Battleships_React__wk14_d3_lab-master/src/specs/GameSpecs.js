const assert = require('assert');
const Ship = require('../models/Ship.js');
const Player = require('../models/Player.js');
const Game = require('../models/Game.js');

describe('ship', function() {
  let ship;
  let ship2;
  let ship3;
  let arrayOfShips;
  let player;
  let game;

  beforeEach(function(){
    ship = new Ship([1,2,3]);
    ship2 = new Ship([8,9]);
    ship3 = new Ship([13]);
    arrayOfShips = [ship, ship2, ship3];
    player = new Player(arrayOfShips);
    game = new Game(player);
  })

  it('should have a player', function(){
    assert.strictEqual(player, game.player);
  })

  it('should start with no clicks', function(){
    assert.strictEqual(0, game.playerPicks.length)
  })

  it('should register a click', function(){
    game.processClick(3);
    assert.strictEqual(1, game.playerPicks.length)
  })

  it('should register a double click', function(){
    game.processClick(3);
    assert.strictEqual(null, game.processClick(3));
  })

  it('should register a hit', function(){
    assert.strictEqual(true, game.processClick(3));
  })

  it('should register a miss', function(){
    assert.strictEqual(false, game.processClick(30));
  })

  it('should know game is not won', function(){
    assert.strictEqual(false, game.isWon())
  })

  it('should know game is  won', function(){
    game.processClick(1)
    game.processClick(2)
    game.processClick(3)
    game.processClick(8)
    game.processClick(9)
    game.processClick(13)
    assert.strictEqual(true, game.isWon())
  })



  }
)
