
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

// random shuffle array function
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


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

  if ((minutes.toString()).length < 2 ) {
      minutes = '0' + minutes;
  }

  var roundedTime = '{0}:{1}'.format(hours.toString(), minutes.toString());
  
  return roundedTime;
}



function isValidTimeFormat(time){
	var splittedDate = time.split(':');
	var hours = parseInt(splittedDate[0]);
	var minutes = parseInt(splittedDate[1]);
	if(hours > 24 || minutes > 59)
		return false;
	return true;
}

function convertTimeToMinutes(time){
	var splittedDate = time.split(':');
	var hours = parseInt(splittedDate[0]);
	var minutes = parseInt(splittedDate[1]);
	return hours * 60 + minutes;
}

var minTimeforLunch = convertTimeToMinutes("12:30") ;
var maxTimeforLunch = convertTimeToMinutes("14:59") ;


function getServerTimeForMessage() {
  var curServerDate = new Date();
  var hours = curServerDate.getHours();
  var minutes = curServerDate.getMinutes();
  minutes = (minutes % 15 < 8) ? minutes + (15 - (minutes % 15)) : minutes + (30 - (minutes % 15));
  if (minutes >= 60) {
    minutes = minutes - 60;
    hours++;
  }
  
  var currentTimeInMinutes = hours * 60 + minutes;
  if (currentTimeInMinutes <= minTimeforLunch) { 
    return '12:30';
  } else if (currentTimeInMinutes > minTimeforLunch && currentTimeInMinutes <= maxTimeforLunch) {
    if ((minutes.toString()).length < 2 ) {
      minutes = '0' + minutes;
    }
    return '{0}:{1}'.format(hours.toString(), minutes.toString());
  } else {
    return 0;
  }
}

// return server time in string format ==> invalid time for lunch
// return 0  ==> too late to register 
// return 1  ==> okay , valid time 

function checkLunchTime(userRequstedTime){
  var serverTimeForMessage = getServerTimeForMessage();
  if (serverTimeForMessage === 0) return 0;
	if (!isValidTimeFormat(userRequstedTime)) return serverTimeForMessage;

  var currentTimeInMinutes = convertTimeToMinutes(serverTimeForMessage);
  var requestedTimeForLunch = convertTimeToMinutes(userRequstedTime);
  var minTimeforLunchTmp = (minTimeforLunch < currentTimeInMinutes) ? currentTimeInMinutes : minTimeforLunch;
  if(requestedTimeForLunch >= minTimeforLunchTmp && requestedTimeForLunch <= maxTimeforLunch) {
    return 1;
  }
  return serverTimeForMessage;
}

module.exports.roundTime = roundTime;
module.exports.checkLunchTime = checkLunchTime;
module.exports.shuffle = shuffle;