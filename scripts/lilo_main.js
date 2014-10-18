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


business_logic = require('./../lib/collect').business_logic;
var timeFormat = /([0-9]{2})\:([0-9]{2})/;

module.exports = function(robot) {
	robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg){
		var name = msg.message.user.name;
		var time = msg.match[1] + ":" + msg.match[2];


		// msg = JSON.stringify(msg);

		// console.log("message is " + msg);
		
		// console.log("time is " + time);
		
		// console.log();
		// console.log();
		// console.log();
		// console.log();
		// console.log();
		// console.log(time);
		// console.log(name);
		// business_logic(name, msg)
		msg.reply("Okay, " + msg.message.user.name + "! I will sign you up for " + time + ".");
	});

}