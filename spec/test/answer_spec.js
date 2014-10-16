var assert = require('assert')

date_list = require('./../../lib/answer').date_list;

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

    var test_store1 = { Lilo: '14:00',
      Judit: '14:00',
      Matyas: '14:00',
      Eniko: '14:00',
      Ferenc: '14:00',
      Balazs: '14:00' };

    var test_store2 = { Lilo: '14:00',
      Judit: '12:30',
      Matyas: '14:00',
      Eniko: '14:00',
      Ferenc: '12:30',
      Balazs: '14:00' };

    var store_result1 = { '14:00': [ 'Lilo', 'Judit', 'Matyas', 'Eniko', 'Ferenc', 'Balazs' ] };

    var fourteen_result1 = ['Lilo',
                            'Judit',
                            'Matyas',
                            'Eniko',
                            'Ferenc',
                            'Balazs' ];

    var store_result2 = { '14:00': [ 'Lilo', 'Matyas', 'Eniko', 'Balazs' ],
                          '12:30': [ 'Judit', 'Ferenc' ] }; 

    assert.equal(6, date_list(test_store1)['14:00'].length);
    assert.equal(true, date_list(test_store1)['14:00'].equals(fourteen_result1));

    assert.equal(4, date_list(test_store2)['14:00'].length);
    assert.equal(2, date_list(test_store2)['12:30'].length);
    assert.equal(false, date_list(test_store2)['14:00'].equals(fourteen_result1));

    // compare two Objects in JS
    // http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
    assert.equal(true, JSON.stringify(store_result2) === JSON.stringify(date_list(test_store2)));

  });


});

