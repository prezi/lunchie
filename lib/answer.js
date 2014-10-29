// # answer.js #

// ## In this file you can find functions to shuffle participants and create nice messages which will be sent ##

store = require('./../lib/collect').store;
jid_store = require('./../lib/collect').jid_store;

var lunchGroups = {};

var fs = require("fs");

//Participants are stored in an array, they are shuffled randomly for the roulette. 
//Source: http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//This is a helper function to shuffle the arrays associated with the time-keys
function shuffleTimeArray(time_array)
{
	for (var key in time_array)
	{
		//Calling shuffle multiple times, because in practice
		//it seems that calling shuffle only once is not that random what we wanted
		time_array[key]=shuffle(time_array[key]);
		time_array[key]=shuffle(time_array[key]);
		time_array[key]=shuffle(time_array[key]);
	}
	return time_array;
}

//Receives a list of names with the associated timeslot and
//returns a JSON object where each timeslot is associated with a list of names.
function dateList(store){
	var ret={}; 
	for (var key in store){
		var timeval=store[key];

		if (timeval in ret) {
			ret[timeval].push(key);
		} else {
			ret[timeval]=[key];
		}
	}
	return ret;
}

//function generates groups based on one time slot
function generateGroups(timeslot, time_array, maxSize) {
	var array = Array.prototype.slice.apply(time_array);
	// console.log(array.length)
    if (array.length == 0) return [];
    var chunkSize = array.length / Math.ceil(array.length / maxSize);
    var result = [array.slice(0,chunkSize)].concat(generateGroups(timeslot, array.slice(chunkSize), maxSize));
    return result;
}

//should return array of users
function getLunchPartners(timeslot){
	var time_arrays = dateList(store);
	time_arrays = shuffleTimeArray(time_arrays);

	for (key in time_arrays) {
		group = generateGroups(key, time_arrays[key] , 4);
  		for (var i=0; i<group.length; i++) {
       		for (var j=0; j<group[i].length; j++){
            	group[i][j] = {mention_name:group[i][j], jid: jid_store[group[i][j]]};
            }
		    lunchGroups[key] = group;
		}
	}
	console.log(lunchGroups);
	console.log(lunchGroups[timeslot]);
	return lunchGroups[timeslot];
}

//The "main" part of the file where the previous functions are called.
if (!module.parent) {
}


//for Mocha unit test located in spec directory
module.exports.dateList = dateList;
//To be called in notify.js script
module.exports.getLunchPartners = getLunchPartners;
module.exports.get_lunch_partners = get_lunch_partners;