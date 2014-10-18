var assert = require('assert')

business_logic = require('./../../lib/collect').business_logic;

suite('collect.js', function() {

  test('business_logic', function() {

    // store can only handle unique names -- should provide error if key already exists in hash map /
    // another Gabor has already registered
    // must use "Gabor2" or something as the key

  	// no check to see if employee actually exists. someone could spam random users
  	// assume that no one is malicious
    assert.equal("Data successfully recorded.", business_logic('Lilo;14:00'));
    // assert.equal("Data successfully recorded.", business_logic('Lilo;12:29')); // should this work? 
    assert.equal("Data successfully recorded.", business_logic('Lilo;12:30')); // edge case
    assert.equal("Data successfully recorded.", business_logic('Lilo;14:59')); // edge case

    assert.equal("Data successfully recorded.", business_logic('Lilo;14:00'));
    assert.equal("Data successfully recorded.", business_logic('Matyas;14:20'));
    assert.equal("Data successfully recorded.", business_logic('!!!;14:20'));
    assert.equal(undefined, business_logic('Lilo;15:00'));
    assert.equal(undefined, business_logic('Lilo;12:00'));
    assert.equal(undefined, business_logic('Matyas;140:00'));
    assert.equal(undefined, business_logic('Matyas;14:2980'));
    assert.equal(undefined, business_logic('Matyas;140:2980'));
  });


});

