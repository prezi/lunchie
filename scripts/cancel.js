//Description:
  //Cancels lunch requests

cancelLunch = require('./../lib/cancellunch').cancelLunch;
User = require('../model').User;

module.exports = function(robot) {
  robot.respond(/cancel/i, function(msg) {
	  var _jid = msg.message.user.jid;
	  User.find({where: {jid: _jid}}).success(function(usr){
	  	if (usr && usr.rounded_time != null && usr.request_time != null) {
	  		cancelLunch(_jid);	
	  		msg.reply("Okay, " + msg.message.user.name + "! I will cancel your lunch request.");
	  	} else {
	  		msg.reply("Hey, " + msg.message.user.name + "! You tried to trick me. Before canceling lunch request try to request it ;)");
	  	}
	  });
  });
}