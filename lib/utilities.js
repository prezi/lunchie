if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

// random shuffle array function
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// round time to the nearest quarter 
function roundTime(requestedTime) {

    var splittedDate = requestedTime.split(':');

    var hours = parseInt(splittedDate[0]);

    var minutes = parseInt(splittedDate[1]);

    var minutesMod15 = minutes % 15;

    minutes = (minutesMod15 < 8) ? minutes - (minutesMod15) : minutes + (15 - minutesMod15);

    if (minutes == 60) {
        hours++;
        minutes = 0;
    }

    if ((minutes.toString()).length < 2) {
        minutes = '0' + minutes;
    }

    var roundedTime = '{0}:{1}'.format(hours.toString(), minutes.toString());

    return roundedTime;
}

// check only if hours is greater than 24 or if minutes is greater than 59
// time param is well formated 
function isValidTimeFormat(time) {
    var splittedDate = time.split(':');
    var hours = parseInt(splittedDate[0]);
    var minutes = parseInt(splittedDate[1]);
    if (hours > 24 || minutes > 59)
        return false;
    return true;
}

function convertTimeToMinutes(time) {
    var splittedDate = time.split(':');
    var hours = parseInt(splittedDate[0]);
    var minutes = parseInt(splittedDate[1]);
    return hours * 60 + minutes;
}

var minTimeforLunch = require('./../globals').minTimeforLunch;
var maxTimeforLunch = require('./../globals').maxTimeforLunch;

function getEarlierTimeToRegister() {

    var curServerDate = new Date();

    var hours = curServerDate.getHours();
    var minutes = curServerDate.getMinutes();

    minutes = minutes + (30 - (minutes % 15));

    if (minutes >= 60) {
        minutes = minutes - 60;
        hours++;
    }

    var currentTimeInMinutes = hours * 60 + minutes;

    if (currentTimeInMinutes <= minTimeforLunch) {
        return '12:30';

    } else if (currentTimeInMinutes > minTimeforLunch && currentTimeInMinutes <= maxTimeforLunch) {
        if ((minutes.toString()).length < 2) {
            minutes = '0' + minutes;
        }
        return '{0}:{1}'.format(hours.toString(), minutes.toString());
    } else {
        // too late to register
        return 0;
    }
}

// return server time in string format ==> invalid time for lunch
// return 0  ==> too late to register 
// return 1  ==> okay , valid time 

function checkLunchTime(userLunchTime) {

    var earlierTimeToRegister = getEarlierTimeToRegister();

    if (earlierTimeToRegister === 0) {
        // too late to register
        return 0;
    }

    if (!isValidTimeFormat(userLunchTime)) {
        // invalid lunch time 
        return earlierTimeToRegister;
    }

    var requestedTime = convertTimeToMinutes(userLunchTime);

    var currentTimeInMinutes = convertTimeToMinutes(earlierTimeToRegister);

    var minTimeforLunchTmp = Math.max(minTimeforLunch, currentTimeInMinutes);

    if (requestedTime >= minTimeforLunchTmp && requestedTime <= maxTimeforLunch) {
        return 1;
    }

    return earlierTimeToRegister;

}

module.exports.roundTime = roundTime;
module.exports.checkLunchTime = checkLunchTime;
module.exports.shuffle = shuffle;