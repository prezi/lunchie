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
store = require('./../lib/collect').store;
jid_store = require('./../lib/collect').jid_store;
var timeFormat = /([0-9]{2})\:([0-9]{2})/;

module.exports = function(robot) {
	robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg) {
		var mention_name = msg.message.user.mention_name;
		var time = msg.match[1] + ":" + msg.match[2];
		var jid = msg.message.user.jid;

		console.log("message is " + msg);
		console.log("time is " + time);
		business_logic(mention_name, time, jid);
		console.log("store is: " + JSON.stringify(store));
		console.log("jid_store is: " + JSON.stringify(jid_store));
		msg.reply("Okay, " + msg.message.user.name + "! I will sign you up for " + time + ".");
	});
}