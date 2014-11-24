// # answer.js #

// ## this file contains functions about retrieving groups from the db and generating lunch groups ##

var User = require('./../model').User;
var utilities = require('../lib/utilities');

// @parm : fn , the callback function of retrieveGroups function , so after generating the groups this function will be called
// with the final configruation of the  lunch groups 

function retrieveGroups(timeslot, maxSize, fn) {
    User.findAll({
        where: {
            rounded_time: timeslot
        }
    }).success(function(users) {
        var currentUsers = [];
        users.forEach(function(usr) {
            currentUsers.push(usr.values);
        })

        // shuffle the users group
        utilities.shuffle(currentUsers);

        // return the result to the callback function of the caller in notifyLunchPartners function
        fn(generateGroups(currentUsers, maxSize));
    })
}

function generateGroups(users, maxSize) {
    var array = Array.prototype.slice.apply(users);
    if (array.length == 0) return [];
    var chunkSize = array.length / Math.ceil(array.length / maxSize);
    var result = [array.slice(0, chunkSize)].concat(generateGroups(array.slice(chunkSize), maxSize));
    return result;
}

module.exports.retrieveGroups = retrieveGroups;