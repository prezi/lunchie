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


function isCorrectTimeForLunch(hours , minutes){
	if(Number(minutes) >= 60) {
		return false;
	}
	// convert time to minutes and compare them 
	var minTimeForLaunch = 12 * 60 + 30 ;
	var maxTimeForLanuch = 14 * 60 + 59 ;
	var requestedTimeForLanuch = Number(hours) * 60 + Number(minutes);
	if(requestedTimeForLanuch >= minTimeForLaunch && requestedTimeForLanuch <= maxTimeForLanuch) {
		return true;
	}
	return false;
}

module.exports = function(robot) {
	robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg) {
		if(isCorrectTimeForLunch(msg.match[1],msg.match[2]) === true){
			var mention_name = msg.message.user.mention_name;
			var time = msg.match[1] + ":" + msg.match[2];
			var jid = msg.message.user.jid;
			collect(mention_name, time, jid);
			msg.reply("Okay, "	 + msg.message.user.name + "! I will sign you up for " + time + ".");
		} else {
			msg.reply(msg.message.user.name + ", Your time interval is not correct. Please input a preferred lunch time between 12:30 and 14:59.");
		}
	})
}