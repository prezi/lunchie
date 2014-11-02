var assert = require('assert')

collect = require('../all_in.js').collect; //collect(name, msg, jid)
dateList = require('../all_in.js').dateList; //dateList(store)
generateGroups = require('../all_in.js').generateGroups; //generateGroups(timeslot, time_array, maxSize)
getLunchPartners = require('../all_in.js').getLunchPartners; //getLunchPartners(timeslot)
cancelLunch = require('../all_in.js').cancelLunch; //cancelLunch(mention_name)
notify_lunch_partners = require('../all_in.js').notify_lunch_partners; //notify_lunch_partners(robot, lunch_time)

store = require('../all_in.js').store;
jid_store = require('../all_in.js').jid_store;
lunchGroups = require('../all_in.js').lunchGroups;

collect('Zoe', '13:00', '12694_1283811@chat.hipchat.com');
collect('Kieu', '14:00', '12694_1283812@chat.hipchat.com');
collect('Alaa', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa0', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa1', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa2', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa3', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa4', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa5', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa6', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa7', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa8', '13:00', '12694_1283813@chat.hipchat.com');
collect('Alaa9', '13:00', '12694_1283813@chat.hipchat.com');

suite('collect', function() {
  test('get the time from store', function() {
    assert.equal('13:00', store['Zoe']);
    assert.equal('14:00', store['Kieu']);
    assert.equal('13:00', store['Alaa']);
  });
  test('get the jid from jid_store', function() {
    assert.equal('12694_1283811@chat.hipchat.com', jid_store['Zoe']);
    assert.equal('12694_1283812@chat.hipchat.com', jid_store['Kieu']);
    assert.equal('12694_1283813@chat.hipchat.com', jid_store['Alaa']);
  });
});

suite('dateList', function() {
  test('ret changes the key-value pairs of store', function(){
    assert.equal('Kieu', dateList(store)['14:00']);
    assert.equal("Zoe", dateList(store)['13:00'][0]);
    assert.equal("Alaa", dateList(store)['13:00'][1]);
  });
});

suite('generateGroups', function() {
  // generateGroups('14:00',dateList(store),4);

  test('groups by time', function() {
    assert.equal('Kieu', generateGroups('14:00',dateList(store)['14:00'],4));
    // assert.equal(["Zoe","Alaa"], generateGroups('13:00',dateList(store)['13:00'],4));
    assert.equal('Zoe', generateGroups('13:00',dateList(store)['13:00'][0],4));
    assert.equal('Alaa', generateGroups('13:00',dateList(store)['13:00'][1],4));

  });
  test('number of generated groups', function() {
    assert.equal(1, (generateGroups('14:00',dateList(store),4).length));
  });
});

// suite('getLunchPartners', function() {
//   test('collect', function() {

//   });
// });

// suite('cancelLunch', function() {
//   test('collect', function() {

//   });
// });

// suite('notify_lunch_partners', function() {
//   test('collect', function() {

//   });
// });