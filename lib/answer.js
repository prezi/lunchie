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

function generateGroups(timeslot, maxSize) {
    lunch_groups = User
  .findAll({ where: { rounded_time: timeslot } })
  .complete(function(err, timeslot) {
    if (!!err) {
      console.log('An error occurred while searching for this time:', err)
    } else if (!timeslot) {
      console.log('No users have been found for this slot.')
    }
  })

	var array = Array.prototype.slice.apply(lunch_groups);
    if (array.length == 0) return [];
    var chunkSize = array.length / Math.ceil(array.length / maxSize);
    var result = [array.slice(0,chunkSize)].concat(generateGroups(timeslot, array.slice(chunkSize), maxSize));
    console.log(result);
    return result;
}

// function generateGroups(time, lunch_groups, maxSize) { 
//     var lunch_group = lunch_groups[time];
//     if (lunch_group == undefined) {
//         return [];
//     }
//     var chunkSize = lunch_group.length / Math.ceil(lunch_group.length / maxSize);
//     var result0 = lunch_group.slice(0,chunkSize);
//     var result = result0.concat(generateGroups(time, lunch_group.slice(chunkSize), maxSize));
    
//     return result;
// }

module.exports.generateGroups = generateGroups;
