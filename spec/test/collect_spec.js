var assert = require('assert')

collect = require('./../../lib/collect').collect;

suite('collect.js', function() {

  test('collect', function() {

    // store can only handle unique names -- should provide error if key already exists in hash map /
    // another Gabor has already registered
    // must use "Gabor2" or something as the key

  	// no check to see if employee actually exists. someone could spam random users
  	// assume that no one is malicious
    assert.equal("Data successfully recorded.", collect("Lilo", "14:00"));
    // assert.equal("Data successfully recorded.", collect('Lilo;12:29')); // should this work? 
    assert.equal("Data successfully recorded.", collect("Lilo", "12:30")); // edge case
    assert.equal("Data successfully recorded.", collect("Lilo", "14:59")); // edge case

    assert.equal("Data successfully recorded.", collect("Lilo", "14:00"));
    assert.equal("Data successfully recorded.", collect("Matyas", "14:20"));
    assert.equal("Data successfully recorded.", collect("!!!", "14:20"));
    assert.equal(undefined, collect("Lilo", "15:00"));
    assert.equal(undefined, collect("Lilo", "12:00"));
    assert.equal(undefined, collect("Matyas", "140:00"));
    assert.equal(undefined, collect("Matyas", "14:2980"));
    assert.equal(undefined, collect("Matyas", "140:2980"));
  });


});

