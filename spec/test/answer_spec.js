var assert = require('assert')

date_list = require('./../../lib/answer').date_list;

suite('answer.js', function() {

  test('date_list', function() {

    var test_store = { Lilo: '14:00',
      Judit: '14:00',
      Matyas: '14:00',
      Eniko: '14:00',
      Ferenc: '14:00',
      Balazs: '14:00' };

    var store_result = { '14:00': [ 'Lilo', 'Judit', 'Matyas', 'Eniko', 'Ferenc', 'Balazs' ] };

    var fourteen_reuslt = [ 'Lilo',
      'Judit',
      'Matyas',
      'Eniko',
      'Ferenc',
      'Balazs' ];

    assert.equal(6, date_list(test_store)['14:00'].length);

  });


});

