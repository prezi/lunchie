
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

function convertTimeToMintues(time){
	var splittedDate = time.split(':');
	var hours = parseInt(splittedDate[0]);
	var minutes = parseInt(splittedDate[1]);
	return hours * 60 + minutes;
}

var minTimeforLunch = convertTimeToMintues("12:30") ;
var maxTimeforLunch = convertTimeToMintues("14:59") ;


// return -1 ==> invalid time for lunch
// return 0  ==> too late to register 
// return 1  ==> okay , valid time 

function checkLunchTime(userRequstedTime){
	
	var userRoundedTime = roundTime(userRequstedTime);

	var userRequstedTimeInMintues = convertTimeToMintues(userRoundedTime);


	if(userRequstedTimeInMintues < minTimeforLunch || userRequstedTimeInMintues > maxTimeforLunch)
		return -1 ; 

	var currentDate = new Date();

	var userDate = new Date();
	userDate.setHours(userRoundedTime.split(':')[0]);
	userDate.setMinutes(userRoundedTime.split(':')[1]);
	userDate.setMinutes(userDate.getMinutes()-16);


	var userNotifyTimeInMinutes = convertTimeToMintues(userDate.getHours()+":"+userDate.getMinutes()) ;
	var serverTimeInMinutes = convertTimeToMintues(currentDate.getHours()+":"+currentDate.getMinutes()) ;
	
	if(serverTimeInMinutes <= userNotifyTimeInMinutes )
		return 1 ;

	return 0 ; 
}

module.exports.roundTime = roundTime;
module.exports.checkLunchTime = checkLunchTime;