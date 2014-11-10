// # answer.js #

// ## In this file you can find functions to shuffle participants and create nice messages which will be sent ##

var User = require('./../model').User;

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
function shuffleTimeArray(lunch_groups) {
    for (time in lunch_groups) {
        lunch_groups[time] = shuffle(lunch_groups[time]);
    }
    return lunch_groups;
}

function retrieveGroups(timeslot, maxSize) {
User.findAll({ where: { rounded_time  : timeslot } }).success(function(users) {
      // generate groups here 
      // this code will be interpretued after retriving all the correct data from db
      // users array here contain the correct data 
      generateGroups(users, maxSize);
})
}

function generateGroups(users, maxSize){
    var array = Array.prototype.slice.apply(users);
    if (array.length == 0) return [];
    var chunkSize = array.length / Math.ceil(array.length / maxSize);
    var result = [array.slice(0,chunkSize)].concat(generateGroups( array.slice(chunkSize), maxSize));
    console.log(result);
    return result;
    }

module.exports.generateGroups = generateGroups;
