const assert = require('assert');
const Ship = require('../models/Ship.js');

describe('ship', function(){
  beforeEach(function(){
    ship = new Ship([1,2,3]);
  })

  it('should have an array of positions', function(){
    assert.deepStrictEqual(3, ship.squareIDs.length)
  })

  it('should detect a hit', function(){
    assert.strictEqual(true, ship.isHit(1));
    assert.strictEqual(2, ship.squareIDs.length)
  })

  it('should detect a miss', function(){
    assert.strictEqual(false, ship.isHit(10));
  })

  it('shouldnt be initially sunk', function(){
    assert.strictEqual(false, ship.isSunk());
  })

  it('should detect when sunk', function(){
    ship.isHit(1);
    ship.isHit(2);
    ship.isHit(3);
    assert.strictEqual(true, ship.isSunk())
  })
})
