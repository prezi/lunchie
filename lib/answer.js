// # answer.js #

// ## this file contains functions about retrieving groups from the db and generating lunch groups ##

var User = require('./../model').User;
var utilities = require('../lib/utilities');
var minTimeforLunch = require('./../globals').minTimeforLunch;
var maxTimeforLunch = require('./../globals').maxTimeforLunch;

// @parm : fn , the callback function of retrieveGroups function , so after generating the groups this function will be called
// with the final configruation of the  lunch groups 
function findUsers(timeslot) {
    User.findAll({
        where: {
            rounded_time: timeslot
        }
    }).success(function(users) {
        var currentUsers = [];
        users.forEach(function(usr) {
            currentUsers.push(usr.values);
        })
    return currentUsers;    

}

function retrieveGroups(timeslot, maxSize, fn) {
    // User.findAll({
    //     where: {
    //         rounded_time: timeslot
    //     }
    // }).success(function(users) {
    //     var currentUsers = [];
    //     users.forEach(function(usr) {
    //         currentUsers.push(usr.values);
    //     })
        var currentUsers = findUsers(timeslot);
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

function queryForTime(timeslot){
    return findUsers(timeslot).length;
}
function queryForAllTimes(){
    response = "";
    //iterate thru the times
    current = minTimeforLunch;
    while (current < maxTimeforLunch){
        hours = parseInt(current / 60);
        minutes = current % 60;
        response += renderAnswerForQuery(hours + ":" + minutes);
        current += 15;        
    }
    //returns with a string
    return response;
}

function renderAnswerForQuery(timeslot){
    var num = queryForTime(hours + ":" + minutes);
    var response = "";
    if (num == 0){
        response += "Nobody signed up for " + hours + ":" + minutes + ". ";
    }
    else {
        response += hours + ":" + minutes + " " + num;
        if (num == 1) {
            response += "person. ";
        } else {
            response += "people. ";
        }
    }
    return response;
}

module.exports.retrieveGroups = retrieveGroups;
module.exports.queryForAllTimes = queryForAllTimes;
module.exports.renderAnswerForQuery = renderAnswerForQuery;