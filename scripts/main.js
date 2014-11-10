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

module.exports = function(robot) {
	robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg) {
		var mention_name = msg.message.user.mention_name;
		var time = msg.match[1] + ":" + msg.match[2];
		var jid = msg.message.user.jid;
		if ((msg.match[1] <= 14 && msg.match[1] >= 13 && msg.match[2] < 60 && msg.match[2] >= 0) || (msg.match[1] == 12 && msg.match[2] >=30 && msg.match[2] < 60)) {
			collect(mention_name, time, jid);
			msg.reply("Okay, "	 + msg.message.user.name + "! I will sign you up for " + time + ".");
		} else {
			msg.reply(msg.message.user.name + ", Your time interval is not correct. Please input a preferred lunch time between 12:30 and 14:59.");
		}
	})
}