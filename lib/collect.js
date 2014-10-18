//global variable in which we can store the subscribed people
var store={};

// //string formatting method to easily insert strings.
// //Source: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
// if (!String.prototype.format) {
//   String.prototype.format = function() {
//     var args = arguments;
//     return this.replace(/{(\d+)}/g, function(match, number) { 
//       return typeof args[number] != 'undefined'
//         ? args[number]
//         : match
//       ;
//     });
//   };
// }

//function which has to be replaced if we merge it into hubot
function Reply(msg) {
	console.log(msg);
}

//function which has to be replaced if we merge it into hubot
function throwError(location,msg) {
	Reply('ERROR in {0}, message: {1}'.format(location, msg));
}

//the main function which parses the input string,
//and stores, updates, deletes the store etc.. 
//@line: USER;HH:MM OR USER@cancel
//checks whether the message is time
//	if it's time, then checks wther if it's in the right range (12:30-14:59)
//		if the time is correct, then assigns the user of that time 
//	if it isn't a time, checks wether it's a cancel message
//		if it's a cancel message and the user is in the sotre, deletes it, and confirms
//	all else branches are handled with error messages.
function business_logic(line) {
	// returns undefined if time format is incorrect
	// otherwise returns "Data successfully recorded." 
	function convert_time_to_24_hour_format(msg) {
		var hours, minutes;
		var splitted_date = msg.split(':');
		hours = parseInt(splitted_date[0]);
		minutes = parseInt(splitted_date[1]);
		
		//converts 12h format to 24h format
		if (hours>=0 && hours<3) {
			hours+=12;
		}
		//chekcs the range
		if (hours<12 || hours>14 || (hours===12 && minutes<30) || minutes<0 || 59<minutes) {
			throwError('datecheck','date ({0}) does not fit in time interval: 12:30-14:59'.format(msg));
		} else {
			//rounds the minutes to 15 minutes
			minutes=Math.floor((minutes/15))*15;
			//stores
			var time='{0}:{1}'.format(hours.toString(),minutes.toString());
			
			// bug for 14:00 -- was resulting in 14:0
			if (time.length < 5) {
				time += 0; 
			}

			store[name]=time;
			return "Data successfully recorded."
		}
	}


	var splitted_line, name, msg;
    splitted_line=line.split(';');
    msg=splitted_line[1];
    name=splitted_line[0];
	
	// is message a time value?
	if (/\d{1,2}:\d{1,2}/i.test(msg)) {
		return convert_time_to_24_hour_format(msg);
	} else { 
		// if it's not a time-message
		if (msg.toLowerCase() === 'cancel') {
			if (name in store) {
				// if it's cancel and the USER is in the store, delete the user's entry
				delete store[name];
				Reply("You successfully cancelled your lunch appointment.")
			} else {
				throwError('Cancel lunch', "You requested to cancel lunch, but you did not have any appointment.");
			}
		} else {
			if (msg.length == 0) {
				throwError('dateParser', "Your message is empty");	
			} else {			
				throwError('dateParser', "I couldn't understand your message. You wrote: {0}".format(time));
			}
			
		}
	}
}

if (!module.parent) {
 	// this is the main module
 	var inf='input.txt';

 	//cmd argument parse
	process.argv.forEach(function (val, index, array) {
		if (index==2) {
			inf=val;
		}
	});

	//file reading line-by-line
	var fs = require('fs'),
	    readline = require('readline');

	var rd = readline.createInterface({
	    input: fs.createReadStream(inf),
	    output: process.stdout,
	    terminal: false
	});

	rd.on('line', function(line) {
		if (line.length > 0) {
			business_logic(line);
		}
	});
	//after file reading
	rd.on('pause', function() {
		for (key in store) {
			console.log("lunchmate {0} timeslot: {1}".format(key,store[key]));
		}
	})
}

// //for test
// business_logic('Lilo;14:00');
// business_logic('Judit;14:00');
// business_logic('Matyas;14:00');
// business_logic('Eniko;14:00');
// business_logic('Ferenc;14:00');
// business_logic('Balazs;14:00');
// // console.log(store);

// for Mocha unit test located in spec directory
module.exports.business_logic = business_logic;

