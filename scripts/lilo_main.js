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

var timeFormat = /^([0-9]{2})\:([0-9]{2})$/;

module.exports = function(robot) {
	robot.respond(/(?:\d|[01]\d|2[0-3]):[0-5]\d$/i, function(msg){
		var time = msg.match[1];
		msg.reply("Okay, " + msg.message.user.name + "! I will sign you up for " + time + ".");
	});

}