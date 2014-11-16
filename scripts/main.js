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


function isCorrectTimeForLunch(hours , minutes){
	if(Number(minutes) >= 60) {
		return false;
	}
	// convert time to minutes and compare them 
	var minTimeforLunch = 12 * 60 + 30 ;
	var maxTimeforLunch = 14 * 60 + 59 ;
	var requestedTimeForLunch = Number(hours) * 60 + Number(minutes);
	if(requestedTimeForLunch >= minTimeforLunch && requestedTimeForLunch <= maxTimeforLunch) {
		return true;
	}
	return false;
}

module.exports = function(robot) {
	robot.respond(/\b([0-9]{2})\:([0-9]{2})\b/i, function(msg) {
		if(isCorrectTimeForLunch(msg.match[1],msg.match[2]) === true){
			var mention_name = msg.message.user.mention_name;
			var time = msg.match[1] + ":" + msg.match[2];
			var jid = msg.message.user.jid;
			collect(mention_name, time, jid);
			msg.reply(usrMsgs.confirmUserSignUpChoice.format(msg.message.user.name,time));
		} else {
			msg.reply(usrMsgs.invalidTimeForLunch.format(msg.message.user.name));
		}
	})
}