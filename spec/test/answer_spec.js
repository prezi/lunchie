var assert = require('assert')

date_list = require('./../../lib/answer').date_list;
shuffleTimeArray = require('./../../lib/answer').shuffleTimeArray;

// compare two arrays in JavaScript,
// http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}   

suite('answer.js', function() {

  test('date_list', function() {

    var test_store = { Lilo: '14:00',
      Judit: '14:00',
      Matyas: '14:00',
      Eniko: '14:00',
      Ferenc: '14:00',
      Balazs: '14:00' };

    var store_result = { '14:00': [ 'Lilo', 'Judit', 'Matyas', 'Eniko', 'Ferenc', 'Balazs' ] };
    var store_result2 = { '14:00': [ 'Lilo', 'Judit', 'Matyas', 'Eniko', 'Ferenc', 'Balazs' ] };

    var fourteen_result = [ 'Lilo',
      'Judit',
      'Matyas',
      'Eniko',
      'Ferenc',
      'Balazs' ];

    assert.equal(6, date_list(test_store)['14:00'].length);
    assert.equal(true, date_list(test_store)['14:00'].equals(fourteen_result));
    assert.equal(store_result, shuffleTimeArray(store_result2));
    
  });

  test('shuffle', function(){

    var name_list = [ 'Lilo', 'Judit', 'Matyas', 'Eniko', 'Ferenc', 'Balazs', 'Zoe', 'Alaa', 'Kieu', 'Mohammed', 'Mykola', 'Khaled' ];

    var name_list2 = [ 'Lilo', 'Judit', 'Matyas', 'Eniko', 'Ferenc', 'Balazs', 'Zoe', 'Alaa', 'Kieu', 'Mohammed', 'Mykola', 'Khaled' ];

    assert.equal(name_list2, shuffle(name_list));

  });

});

