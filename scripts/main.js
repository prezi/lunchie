// Description:
//   lunch roulette for grouping employees
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot 13:00


collect = require('./../lib/collect').collect;

var usrMsgs = require('../MessagesEN');
var minTimeforLunch = 12 * 60 + 30 ;
var maxTimeforLunch = 14 * 60 + 59 ;

module.exports = function(robot) {
	robot.respond(/\b([0-9]{2})\:([0-9]{2})\b/i, function(msg) {
		var isCorrectTimeResult = isCorrectTimeForLunch(msg.match[1],msg.match[2]);
		if(isCorrectTimeResult === 1){
			var mention_name = msg.message.user.mention_name;
			var time = msg.match[1] + ":" + msg.match[2];
			var jid = msg.message.user.jid;
			collect(mention_name, time, jid);
			msg.reply(usrMsgs.confirmUserSignUpChoice.format(msg.message.user.name,time));
		} else if (isCorrectTimeResult == -1) {
			msg.reply(usrMsgs.tooLateTimeForLunch.format(msg.message.user.name));
		} else {
			msg.reply(usrMsgs.invalidTimeForLunch.format(msg.message.user.name, isCorrectTimeResult));
		}
	});
};

//returns 1 if time is correct, 
//returns -1 if it is too late to sign up
//returns current time rounded to higher quater if it is not too late, but it is > 12:30
function isCorrectTimeForLunch(hours , minutes){
	var currentDate = new Date();
	var currentHours = currentDate.getHours();
	var currentMinutes = currentDate.getMinutes();
	var currentRoundedMinutes = (currentMinutes % 15 === 0) ? currentMinutes : currentMinutes + (15 - (currentMinutes % 15));
	if (currentRoundedMinutes == 60) {
		currentRoundedMinutes = 0;
		currentHours++;
	}
	var currentTimeInMinutes = currentHours * 60 + currentRoundedMinutes;
	var currentTimeString;
	if (currentTimeInMinutes < minTimeforLunch) { 
		currentTimeString = '12:30';
	} else if (currentTimeInMinutes > minTimeforLunch && currentTimeInMinutes <= maxTimeforLunch) {
		if (currentDate.getMinutes() < 10) {
			currentTimeString = currentHours + ':0' + currentRoundedMinutes;
		} else {
			currentTimeString = currentHours + ':' + currentRoundedMinutes;
		}
	} else {
		currentTimeString = -1;
	}
	if(Number(minutes) >= 60) {
		return currentTimeString;
	}
	// convert time to minutes and compare them 
	var requestedTimeForLunch = Number(hours) * 60 + Number(minutes);
	var minTimeforLunchTmp = (minTimeforLunch < currentTimeInMinutes) ? currentTimeInMinutes : minTimeforLunch;
	if(requestedTimeForLunch >= minTimeforLunchTmp && requestedTimeForLunch <= maxTimeforLunch) {
		return 1;
	}
	return currentTimeString;
};