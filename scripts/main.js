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
store = require('./../lib/collect').store;
jid_store = require('./../lib/collect').jid_store;
var timeFormat = /([0-9]{2})\:([0-9]{2})/;

module.exports = function(robot) {
	robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg) {
		var mention_name = msg.message.user.mention_name;
		var time = msg.match[1] + ":" + msg.match[2];
		var jid = msg.message.user.jid;

		if ( time in robot.brain.data["_private"] ) {
			value = robot.brain.get(time);
			new_value = value.push({mention_name: mention_name, jid: jid});
			console.log("if");
			robot.brain.set("time", new_value);
		} else {
			robot.brain.set(time, [{mention_name: mention_name, jid: jid}])
			console.log("else");
		}
		collect(mention_name, time, jid);

		// [mention_name, jid].push;
		msg.reply("Okay, " + msg.message.user.name + "! I will sign you up for " + time + ".")
		// robot.brain.set(time, );
		// robot.brain.set("time", {mention_name: mention_name, jid: jid});
		// console.log("Brain: " + robot.brain.get("time")[1]);
		console.log("Brain key: " + JSON.stringify(robot.brain.data["_private"]));
		// console.log("Brain: " + JSON.stringify(robot.brain.get("time")));

	});
}