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
var timeFormat = /([0-9]{2})\:([0-9]{2})/;

module.exports = function(robot) {
	robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg) {
		var mention_name = msg.message.user.mention_name;
		var time = msg.match[1] + ":" + msg.match[2];
		var jid = msg.message.user.jid;

		// collect('Zoe', '13:00', '12694_1283811@chat.hipchat.com');
		collect(mention_name, time, jid);
		msg.reply("Okay, " + msg.message.user.name + "! I will sign you up for " + time + ".")
	});
}