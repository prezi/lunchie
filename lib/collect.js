// # collect.js #

// ## Functions to process and collect the incoming messages ##

// *You can run this file like this: node collect.js input.txt
// Where the lines of input.txt look like this:*
// <pre><code>USERNAME;HH:MM 
// <br />**OR**
// <br />USERNAME;cancel</code></pre>

//<br />

// Global variable **store**:
// global variable in to store the subscribed people
// the answer.js file needs this variable.

var store={};
var jid_store={};

//string formatting method to easily insert strings.
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


//Function which has to be replaced if we merge it into hubot.
//Its only purpose is to write the message on the console to check the output.
function Reply(msg) {
	console.log(msg);
}

//function which has to be replaced if we merge it into hubot
function throwError(location,msg) {
	Reply('ERROR in {0}, message: {1}'.format(location, msg));
}

// ## Main function, ##
//which parses the input string and stores, updates, deletes the store etc.. 
//<br />@line: USER;HH:MM OR USER;cancel
//<br />checks if the message is time
// * if it's time, then checks if it's in the right range (12:30-14:59)
//  *	if the time is correct, then assigns the user of that time 
// * if it isn't a time, checks if it's a cancel message
//  *	if it's a cancel message and the user is in the store, deletes it, and confirms
//<br />	all else branches are handled with error messages.
function business_logic(name, msg, jid) {

	// var splitted_line, name, msg;

    // splitted_line=line.split(';');
    // msg=splitted_line[1];
    // name=splitted_line[0];
	
	//Is message a time value?
	console.log("msg passed into business_logic is " + msg);
	if(/\d{1,2}:\d{1,2}/i.test(msg)) {
		var hours, minutes;
		var splitted_date=msg.split(':');
		hours=parseInt(splitted_date[0]);
		minutes=parseInt(splitted_date[1]);
		
		//Converts 12h format to 24h format
		if (hours>=0 && hours<3) {
			hours+=12;
		}
		//Checks the range
		if (hours<12 || hours>23 || (hours===12 && minutes<30) || minutes<0 || 59<minutes) {
			throwError('datecheck','date ({0}) does not fit in time interval: 12:30-14:59'.format(msg));
		} else {
			//Rounds minutes to 15 minutes
			minutes=Math.floor((minutes/15)) * 15;
			//Store the user
			var time='{0}:{1}'.format(hours.toString(),minutes.toString());
			
			//Bug for 14:00 -- was resulting in 14:0
			if (time.length < 5) {
				time += 0; 
			}

			store[name]=[time];
			jid_store[name]=[jid];
			// return "Data successfully recorded."
		}
	} else {
		//If it's not a time-message
		if (msg.toLowerCase()==='cancel') {
			if (name in store) {
				//If message is 'cancel' and the USER is in the store, it deletes the user.
				delete store[name];
				delete jid_store[name];
				Reply("You successfully cancelled your lunch appointment.")
			} else {
				throwError('Cancel lunch',"You cancelled the lunch, but you didn't had any appointment yet.");
			}
		} else {
			if (msg.length==0) {
				throwError('dateParser',"Your message is empty");	
			} else {			
				throwError('dateParser',"I couldn't understand your message. you wrote: {0}".format(time));
			}
			
		}
	}
	console.log("store from business_logic " + store);
	console.log("jid_store from business logic " + jid_store);
}

if (!module.parent) {
 	// # This is the main module #
 	var inf='input.txt';

 	//cmd argument parsing
	process.argv.forEach(function (val, index, array) {
	if (index==2) {
		inf=val;
	}
	});

	//File reading line-by-line
	var fs = require('fs'),
	    readline = require('readline');

	var rd = readline.createInterface({
	    input: fs.createReadStream(inf),
	    output: process.stdout,
	    terminal: false
	});

	rd.on('line', function(line) {
		if (line.length>0) {
			business_logic(line);
		}
	});
	//Event bindign after file read -> test output.
	rd.on('pause',function(){ 
		for(key in store) {
			console.log("lunchmate {0} timeslot: {1}".format(key,store[key]));
		}
	})
}

// // ## For test ##
// business_logic('Lilo;14:00');
// business_logic('Judit;14:00');
// business_logic('Matyas;14:00');
// business_logic('Eniko;14:00');
// business_logic('Ferenc;14:00');
// business_logic('Balazs;14:00');
// // console.log(store);

// For Mocha unit test located in spec directory
module.exports.business_logic = business_logic;
module.exports.store = store;
module.exports.jid_store = jid_store;
