var assert = require('assert')

business_logic = require('./../../lib/collect').business_logic;
  


suite('nextPrime', function() {

  test('business_logic', function() {
    assert.equal("Data successfully recorded.", business_logic('Lilo;14:00'));
    assert.equal("Data successfully recorded.", business_logic('Lilo;14:20'));
    assert.equal(undefined, business_logic('Lilo;12:00'));
    assert.equal(undefined, business_logic('Lilo;14:2980'));
  });


});



