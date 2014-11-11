//Description:
  //Cancels lunch requests

cancelLunch = require('./../lib/cancellunch').cancelLunch;
User = require('../model').User;

var usrMsgs = require('../MessagesEN');

module.exports = function(robot) {
  robot.respond(/cancel/i, function(msg) {
	  var _jid = msg.message.user.jid;
	  User.find({where: {jid: _jid}}).success(function(usr){
	  	if (usr && usr.rounded_time != null && usr.request_time != null) {
	  		cancelLunch(_jid);
	  		msg.reply(usrMsgs.confirmUserCancelChoice.format(msg.message.user.name));	
	  	} else {
	  		msg.reply(usrMsgs.invalidTimeForCancel.format(msg.message.user.name));	
	  	}
	  });
  });
}