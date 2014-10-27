// # answer.js #

// ## In this file you can find functions to shuffle participants and create nice messages which will be sent ##

// *You can run this file like this: node answer.js input.js
// Where the lines of input.js look like this:*
// <pre><code>
// var store={
//	'USERNAME1':'HH:MM',
//	'USERNAME2':'HH:MM',
//	'USERNAME3':'HH:MM'
// }
// </code></pre>

// var store = {
// 'Lilo': '14:00',
// 'Judit': '14:00',
// 'Matyas': '14:00',
// 'Eniko': '14:00',
// 'Ferenc': '14:00',
// 'Balazs': '14:00',
// 'Kieu':'12:00',
// 'Tim': '12:00',
// 'John': '12:00'};

// var jid_store = {
// 'Lilo': '12694_1283794@chat.hipchat.com',
// 'Judit': '12694_1283794@chat.hipchat.com',
// 'Matyas': '12694_1283794@chat.hipchat.com',
// 'Eniko': '12694_1283794@chat.hipchat.com',
// 'Ferenc': '12694_1283794@chat.hipchat.com',
// 'Balazs': '12694_1283794@chat.hipchat.com',
// 'Kieu':'12694_1283794@chat.hipchat.com',
// 'Tim': '12694_1283794@chat.hipchat.com',
// 'John':'12694_1283794@chat.hipchat.com'};

// var store = {
// 	'Lilo': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Judit': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Matyas': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Eniko': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Ferenc': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Balazs': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Kieu':['14:00', '12694_1283794@chat.hipchat.com'],
// 	'Tim': ['14:00', '12694_1283794@chat.hipchat.com'],
// 	'John': ['14:00', '12694_1283794@chat.hipchat.com']
// };

store = require('./../lib/collect').store;
jid_store = require('./../lib/collect').jid_store;

var lunchGroups = {};

var fs = require("fs");

//Functions to help using other js file
//where the store JSON string is located
function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}

function get_lunch_partners(time) {
	return [[ { mention_name: 'Balazs', jid: '12694_1283794@chat.hipchat.com' },
	{ mention_name: 'Matyas', jid: '12694_1283794@chat.hipchat.com' },
	{ mention_name: 'Ferenc', jid: '12694_1283794@chat.hipchat.com' } ],
	[ { mention_name: 'Alaa', jid: '12694_1283794@chat.hipchat.com' },
	{ mention_name: 'Zoe', jid: '12694_1283794@chat.hipchat.com' },
	{ mention_name: 'Kieu', jid: '12694_1283794@chat.hipchat.com' }]]
	//return [["AlaaShafaee", "BalazsDano", "KieuTran", "zoe"], ["Sara"]];
}

//String formatting method to easily insert strings.
//Source: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

//Participants are stored in an array, they are shuffled randomly for the roulette. 
//Source: http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
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

//When only 1 person signs up for a specific time, this message will be sent.
//'Hey @someone! You signed up for lunch at 13:30. 
//Sorry to say, but nobody else signed up for this timeslot. 
//Don't worry, I'm sure, that you can find some buddies to have lunch with. :]'
function sendAlternativeMessage(name_list,time)
{
	console.log('Hey {0}! You signed up for lunch at {1}. \
Sorry to say, but nobody else signed up for this timeslot. \
Don\'t worry, I\'m sure, that you can find some buddies to have lunch with. :]'.format(name_list[0],time) );
}

//Receives a list of names with the associated timeslot and
//returns a JSON object where each timeslot is associated with a list of names.
function date_list(store){
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

//function generates groups based on one time slot(key)
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
	var time_arrays=date_list(store);
	//Then it shuffles each array
	time_arrays=shuffleTimeArray(time_arrays);

	//So it can forms groups and sends the messages
	for (key in time_arrays) {
		group = generateGroups(key, time_arrays[key] , 4);
		// console.log("**These are the shuffled time groups:", group);

  		for (var i=0; i<group.length; i++) {
        // console.log("This is the individual groups in a timeslot", group[i]);

       		for (var j=0; j<group[i].length; j++){

            	group[i][j] = {mention_name:group[i][j], jid: jid_store[group[i][j]]};
            }
            // console.log(group)
		    lunchGroups[key] = group;
		// // console.log(key, generateGroups(key, time_arrays[key], 4));
		}
	}
	// console.log("**lunchgroups", lunchGroups['14:00'][0]);
	// console.log("**first-user name", lunchGroups['14:00'][0][0].mention_name)
	// console.log("lunch groups: ");
	// console.log(lunchGroups);
	console.log(lunchGroups[timeslot]);
	return lunchGroups[timeslot];
}

//The "main" part of the file where the previous functions are called.
if (!module.parent) {
 	//default input
  	var inf='input0.txt';

  	//This is for arg parsing
	process.argv.forEach(function (val, index, array) {
	  if (index==2) {
	  		inf=val;
	  }
	});

	//And including the store variable
	include(inf);

	getLunchPartners("12:00");
}

	//So it first creates the namelist for the different timeslots
// 	var time_arrays=date_list(store);
// 	//Then it shuffles each array
// 	time_arrays=shuffleTimeArray(time_arrays);

// 	//So it can forms groups and sends the messages
// 	for (key in time_arrays) {
// 		group = generateGroups(key, time_arrays[key] , 4);
// 		// console.log("**These are the shuffled time groups:", group);

//   		for (var i=0; i<group.length; i++) {
//         // console.log("This is the individual groups in a timeslot", group[i]);

//        		for (var j=0; j<group[i].length; j++){

//             	group[i][j] = {mention_name:group[i][j], jid: jid_store[group[i][j]]};
//         }
//         // console.log(group)
// 		lunchGroups[key] = group;
// 		// // console.log(key, generateGroups(key, time_arrays[key], 4));
// 		}
// 	}
// 	console.log("**lunchgroups", lunchGroups['14:00'][0]);
// 	console.log("**first-user name", lunchGroups['14:00'][0][0].mention_name)
// 	// return lunchGroups;
// }

//for Mocha unit test located in spec directory
module.exports.date_list = date_list;
//To be called in notify.js script
module.exports.getLunchPartners = getLunchPartners;
module.exports.get_lunch_partners = get_lunch_partners;
// module.exports.store = store;