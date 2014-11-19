// # answer.js #

// ## In this file you can find functions to shuffle participants and create nice messages which will be sent ##

var User = require('./../model').User;

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
/*
function shuffleTimeArray(lunch_groups) {
    for (time in lunch_groups) {
        lunch_groups[time] = shuffle(lunch_groups[time]);
    }
    return lunch_groups;
}*/

// @parm : fn , the callback function of retrieveGroups function , so after generating the groups this function will be called
// with the final configruation of the  lunch groups 

function retrieveGroups(timeslot, maxSize , fn) {
  User.findAll({ where: { rounded_time  : timeslot } }).success(function(users) {
        var currentUsers = [];
        users.forEach(function (usr) {
          currentUsers.push(usr.values);
        })
        
        // shuffle the users group
        shuffle(currentUsers);

        // return the result to the callback function of the caller in notifyLunchPartners function
        fn(generateGroups(currentUsers, maxSize));
  })
}

function generateGroups(users, maxSize){
    var array = Array.prototype.slice.apply(users);
    if (array.length == 0) return [];
    var chunkSize = array.length / Math.ceil(array.length / maxSize);
    var result = [array.slice(0,chunkSize)].concat(generateGroups( array.slice(chunkSize), maxSize));
    return result;
  }

module.exports.retrieveGroups = retrieveGroups;
