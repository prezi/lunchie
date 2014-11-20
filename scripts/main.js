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
utilities = require('./../lib/utilities');

var usrMsgs = require('../MessagesEN');


module.exports = function(robot) {
	robot.respond(/\b([0-9]{2})\:([0-9]{2})\b/i, function(msg) {

		var checkCorrectTimeForLunch = utilities.checkLunchTime(msg.match[1]+":"+msg.match[2]);

		if(checkCorrectTimeForLunch === 1){
			var mention_name = msg.message.user.mention_name;
			var time = msg.match[1] + ":" + msg.match[2];
			var jid = msg.message.user.jid;
			collect(mention_name, time, jid);
			msg.reply(usrMsgs.confirmUserSignUpChoice.format(msg.message.user.name,time));
		} else if (checkCorrectTimeForLunch == 0) {
			msg.reply(usrMsgs.tooLateTimeForLunch.format(msg.message.user.name));
		} else {
			msg.reply(usrMsgs.invalidTimeForLunch.format(msg.message.user.name, checkCorrectTimeForLunch));
		}
	});
};

