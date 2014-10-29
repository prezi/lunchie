// # collect.js #

// ## Functions to process and collect the incoming messages ##


var store = {};
var jid_store = {};

//string formatting method to easily insert strings.
//Source: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match;
    });
  };
}

//converts time requests to nearest 15 minutes
//creates two JSON objects: one storing the username and time slot, one storing the username and jid
function collect(name, msg, jid) {
    console.log("msg passed into collect is " + msg);
    if(/\d{1,2}:\d{1,2}/i.test(msg)) {
        var hours, minutes;
        var splitted_date = msg.split(':');
        hours = parseInt(splitted_date[0]);
        minutes = parseInt(splitted_date[1]);
        
        //Converts 12h format to 24h format
        if (hours >= 0 && hours < 3) {
            hours += 12;
        }
        //Checks the range
        if (hours < 11 || hours > 23 || (hours === 12 && minutes< 00) || minutes < 0 || 59 < minutes) {
            throwError('datecheck','date ({0}) does not fit in time interval: 12:30-14:59'.format(msg));
        } else {
            //Rounds minutes to 15 minutes
            // minutes=Math.floor((minutes/15)) * 15;
            minutes = Math.floor((minutes/2)) * 2;
            //Store the user
            if ((minutes.toString()).length > 1 ) {
                var time = '{0}:{1}'.format(hours.toString(), minutes.toString());
            } else {
                var time = '{0}:{1}'.format(hours.toString(), "0"+ minutes.toString());
            }

            store[name] = [time];
            jid_store[name] = [jid];
        }
    }
}

if (!module.parent) {
}

// For Mocha unit test located in spec directory
module.exports.collect= collect;
module.exports.store = store;
module.exports.jid_store = jid_store;
