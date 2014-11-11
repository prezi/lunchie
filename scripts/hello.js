//Description:
  //Responds to input that isn't a time or cancel

var usrMsgs = require('../MessagesEN');

module.exports = function(robot) {
  robot.respond(/hello|hi|info/i, function(msg) {
  var mention_name = msg.message.user.mention_name;
  	  msg.reply(usrMsgs.welcomeMsg.format(msg.message.user.name));
  });
}
